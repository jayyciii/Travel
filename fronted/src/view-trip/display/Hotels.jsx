import React, { useEffect, useState } from 'react';
import placeholder from "../../assets/placeholder.png"; // Ảnh thay thế nếu không có ảnh nào
import { GetPlaceDetails } from '../../service/GlobalApi'; // Sử dụng GetPlaceDetails
import { Link } from 'react-router-dom';

const Hotels = ({ trip }) => {
  const [hotelPhotos, setHotelPhotos] = useState({}); // State để lưu ảnh khách sạn

  useEffect(() => {
    if (trip) {
      GetHotelPhotos();
    }
  }, [trip]);

  const GetHotelPhotos = async () => {
    const hotelOptions = trip?.tripData?.hotel_options;
    if (hotelOptions) {
      const photos = {};
      await Promise.all(hotelOptions.map(async (hotel) => {
        const query = hotel?.name; // Lấy tên khách sạn để truy vấn
        if (query) {
          try {
            const photoResults = await GetPlaceDetails(query); // Sử dụng GetPlaceDetails để lấy ảnh
            photos[hotel.name] = photoResults[0]?.url || placeholder; // Lưu hình ảnh vào object
          } catch (error) {
            console.error(`Error fetching photo for ${hotel.name}:`, error);
            photos[hotel.name] = placeholder; // Sử dụng ảnh placeholder nếu có lỗi
          }
        }
      }));
      setHotelPhotos(photos); // Lưu ảnh vào state
    }
  };

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotel_options?.map((hotel, index) => {
          // Kiểm tra giá trị hotel.name và hotel.address trước khi tạo link
          const hotelName = hotel?.name;
          const hotelAddress = hotel?.address;

          // Kiểm tra nếu hotelName và hotelAddress đều có giá trị
          const hotelLink = hotelName && hotelAddress
            ? `https://www.google.com/maps/search/?api=1&query=${hotelName}, ${hotelAddress}`
            : '#'; // Sử dụng '#' nếu không có link hợp lệ

          return (
            <Link 
              key={index} 
              to={hotelLink} 
              target='_blank'
              rel='noopener noreferrer' // Thêm rel để bảo mật
            >
              <div className='hover:scale-110 transition-all cursor-pointer'>
                <img 
                  src={hotelPhotos[hotelName] || placeholder} // Sử dụng hình ảnh từ state
                  className='rounded-xl h-[180px] w-full object-cover' 
                  alt={hotelName || 'Placeholder'}
                />
                <div className='my-2'> 
                  <h2 className='font-medium'>{hotelName}</h2>
                  <h2 className='text-xs text-gray-500'>📍 {hotelAddress}</h2>
                  <h2 className='text-sm'>💎 {hotel?.price}</h2>
                  <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
                </div>    
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
