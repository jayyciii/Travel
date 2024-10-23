import React, { useEffect, useState } from 'react';
import x from "../../assets/placeholder.png"; 
import { FaMapLocationDot } from "react-icons/fa6";
import { GetPlaceDetails } from '../../service/GlobalApi'; // Import hàm lấy chi tiết địa điểm
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
    const [imageUrl, setImageUrl] = useState(x); // Khởi tạo state cho hình ảnh

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const photos = await GetPlaceDetails(place.location); // Gọi hàm để lấy hình ảnh
                if (photos.length > 0) {
                    setImageUrl(photos[0]?.url || x); // Lưu URL của hình ảnh đầu tiên vào state
                } else {
                    setImageUrl(x); // Sử dụng hình ảnh placeholder nếu không có hình nào
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setImageUrl(x); // Sử dụng hình ảnh placeholder nếu có lỗi
            }
        };

        fetchImage(); // Gọi hàm fetchImage
    }, [place.location]); // Chạy lại khi place.location thay đổi

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.location} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={imageUrl} className='w-[130px] h-[130px] rounded-xl object-cover' alt={place.location} /> {/* Hiển thị hình ảnh */}
                <div>
                    <h2 className='font-bold text-lg'>{place.location}</h2>
                    <p className='text-sm text-gray-400'>{place.details}</p>
                    <h2 className='mt-2'>⏰ {place.travel_time}</h2>
                    {/* <button><FaMapLocationDot /></button> */}
                </div>
            </div>
        </Link>
    );
};

export default PlaceCardItem;
