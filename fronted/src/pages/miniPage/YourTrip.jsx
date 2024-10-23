import React, { useEffect, useState } from 'react';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelerList } from '../../constants/options';
import { chatSession } from '../../service/AIModel';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; // Import phương thức từ Firestore

const YourTrip = () => {
    const [query, setQuery] = useState('');
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const searchLocations = async (query) => {
        const apiKey = '2c6d25ea999b484991728c01f9bcadad';
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${apiKey}`;

        const response = await fetch(url);
        const result = await response.json();
        setLocations(result.features);
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'query') {
            setQuery(value);

            if (value.length > 2) {
                searchLocations(value);
            } else {
                setLocations([]);
            }
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setQuery(location.properties.formatted || location.properties.name);
        setLocations([]);
    };

    const OnGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        
        if (!user) {
            setOpenDialog(true);
            return;
        }
    
        if (
            !formData?.noOfDays ||
            formData.noOfDays < 1 ||
            !selectedLocation ||
            !formData?.budget ||
            !formData?.traveler
        ) {
            alert("Please fill enough details");
            return;
        }
    
        setLoading(true); // Bắt đầu hiển thị loading
    
        const locationName = selectedLocation.properties.formatted || selectedLocation.properties.name;
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', locationName)
            .replace('{totalDays}', formData.noOfDays)
            .replace('{traveler}', formData.traveler)
            .replace('{budget}', formData.budget);
    
        console.log(FINAL_PROMPT);
    
        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log(result?.response?.text());
            
            // Lưu chuyến đi vào Firestore sau khi có kết quả từ AI
            SaveAiTrip(result?.response?.text());
        } catch (error) {
            console.error('Error generating trip:', error);
        } finally {
            setLoading(false); // Ẩn loading khi yêu cầu kết thúc
        }
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();

        try {
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: JSON.parse(TripData),
                userEmail: user?.email,
                id: docId,
            });
            console.log('Trip saved successfully!');
        } catch (error) {
            console.error('Error saving trip:', error);
        } finally {
            setLoading(false);
            navigate('/view-trip/' + docId);
        }
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🌊⛵</h2>
            <p className='mt-3 text-gray-500 text-2xl'>
                Just provide some basic information and our trip planner will generate a customized trip based on your preferences
            </p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleInputChange('query', e.target.value)}
                        placeholder="Search for a location"
                        className='border p-2 rounded-md w-full'
                    />

                    {locations.length > 0 && (
                        <ul className='mt-3'>
                            {locations.map((location, index) => (
                                <li
                                    key={index}
                                    className='p-2 bg-gray-100 border-b cursor-pointer'
                                    onClick={() => handleLocationSelect(location)}
                                >
                                    {location.properties.formatted || location.properties.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <input
                        className='border p-2 rounded-md w-full'
                        placeholder={'Ex. 3'}
                        type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title ? 'shadow-lg border-black' : ''}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelerList.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.traveler === item.people ? 'shadow-lg border-black' : ''}`}>
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='my-10 justify-end text-bgPrimary rounded-sm flex'>
                <button 
                    disabled={loading}
                    onClick={OnGenerateTrip} 
                    className="text-white bg-black px-4 py-2 rounded"
                >
                    {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
                </button>
            </div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You must be logged in to generate a trip. Please log in and try again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default YourTrip;
