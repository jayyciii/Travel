import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../service/firebaseConfig';
import InfoSection from '../display/InfoSection';
import Hotels from '../display/Hotels';
import PlaceToVisit from '../display/PlaceToVisit';


const Viewtrip = () => {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])


/** Used to get Trip Information from firebase */
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap= await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
            alert('No trip found!')
        }

    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/*Information Section */}
        <InfoSection trip={trip}/>
        {/*Recommended Hotels */}
        <Hotels trip={trip} />

        {/*Daily Plan*/}
        <PlaceToVisit trip={trip}/>

        {/*Footer */}
    </div>
  )
}

export default Viewtrip