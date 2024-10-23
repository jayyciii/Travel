import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlaceToVisit = ({ trip }) => {
    const itinerary = trip.tripData?.itinerary;

    if (!itinerary) {
        return <div>No itinerary available.</div>;
    }

    // Định nghĩa thứ tự thời gian
    const timeOrder = ['morning', 'afternoon', 'evening'];

    return (
        <div>
            <h2 className='font-bold text-lg'>Places To Visit</h2>
            <div>
                {/* Sắp xếp dayKey theo thứ tự số học */}
                {Object.keys(itinerary)
                    .sort((a, b) => parseInt(a.replace('day', '')) - parseInt(b.replace('day', ''))) // Sắp xếp theo thứ tự day1, day2,...
                    .map((dayKey, index) => (
                        <div key={index} className='mt-5'>
                            <h2 className='font-medium text-lg'>{dayKey}</h2>
                            <div className='grid md:grid-cols-2 gap-5 '>
                                {/* Sắp xếp thứ tự thời gian */}
                                {Object.keys(itinerary[dayKey])
                                    .sort((a, b) => timeOrder.indexOf(a) - timeOrder.indexOf(b)) // Sắp xếp theo thứ tự morning -> afternoon -> evening
                                    .map((timeKey, idx) => {
                                        const place = itinerary[dayKey][timeKey];
                                        return (
                                            <div key={idx}>
                                                <h3 className='font-medium text-sm text-orange-600'>{timeKey}</h3>
                                                <PlaceCardItem place={place} />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PlaceToVisit;
