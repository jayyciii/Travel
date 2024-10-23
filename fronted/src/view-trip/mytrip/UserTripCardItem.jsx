import x from "../../assets/placeholder.png";
import React, { useEffect, useState } from 'react';
import placeholder from "../../assets/placeholder.png"; // Ảnh thay thế nếu không có ảnh nào
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '../../service/GlobalApi';
import { Link } from "react-router-dom";

const UserTripCardItem = ({trip}) => {
    const [photos, setPhotos] = useState([]);
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
                setPhotos(photoResults);  
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        }
    };
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className="hover:scale-105 transition-all ">
       <img
                src={photos.length > 0 ? photos[0].url : placeholder}
                className='h-[340px] w-full object-cover rounded-xl'
                alt={photos.length > 0 ? photos[0].description : 'Placeholder'}
            />
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.query}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays} days trip with {trip?.userSelection?.budget} budget </h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem