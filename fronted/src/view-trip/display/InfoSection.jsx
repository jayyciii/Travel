import React, { useEffect, useState } from 'react';
import placeholder from "../../assets/placeholder.png"; // Ảnh thay thế nếu không có ảnh nào
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '../../service/GlobalApi';

const InfoSection = ({ trip }) => {
    const [photos, setPhotos] = useState([]); // State để lưu ảnh

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const query = trip?.userSelection?.query;
        if (query) {
            try {
                const photoResults = await GetPlaceDetails(query);
                setPhotos(photoResults);  // Lưu ảnh vào state
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        }
    };

    return (
        <div>
            {/* Hiển thị ảnh nếu có */}
            <img
                src={photos.length > 0 ? photos[0].url : placeholder}
                className='h-[340px] w-full object-cover rounded-xl'
                alt={photos.length > 0 ? photos[0].description : 'Placeholder'}
            />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.query}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>🗓️ {trip.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>🧑‍🤝‍🧑 Number Of Travelers: {trip.userSelection?.traveler}</h2>
                    </div>
                </div>
                <button>
                    <IoIosSend className='bg-black text-white text-3xl rounded-lg' />
                </button>
            </div>
        </div>
    );
};

export default InfoSection;
