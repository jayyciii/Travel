import React, { useEffect, useState } from 'react'; // Thêm useState
import { useNavigation } from 'react-router-dom';
import { db } from '../../service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserTripCardItem from './UserTripCardItem';

const MyTrip = () => {
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]); // Khai báo state để lưu các chuyến đi

    useEffect(() => {
        GetUserTrips(); // Gọi hàm lấy chuyến đi khi component được mount
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // Parse user từ localStorage
        if (!user) {
            navigation('/'); // Nếu không có user, điều hướng về trang chủ
            return;
        }
        setUserTrips([]); // Clear danh sách chuyến đi cũ trước khi lấy mới
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            trips.push(doc.data()); // Lưu dữ liệu chuyến đi vào mảng tạm thời
        });
        setUserTrips(trips); // Cập nhật state với dữ liệu chuyến đi
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 '>
            <h2 className='font-bold text-3xl '>My Trips</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-7'>
                {userTrips?.length>0?userTrips.map((trip, index) => (
                    <UserTripCardItem key={index} trip={trip} /> 
                ))
            :[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
            ))}
            </div>
        </div>
    );
};

export default MyTrip;
