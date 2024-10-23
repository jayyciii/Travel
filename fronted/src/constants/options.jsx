export const SelectTravelerList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration ',
        people: '1',
        icon: '✈️'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem ',
        people: '2',
        icon:'🥂'
    },
    {
        id: 3,
        title: 'A Family',
        desc: 'A group of fun loving adv ',
        people: '3 to 5 people',
        icon:'🏠'
    },
    {
        id:4,
        title: 'Friends',
        desc : 'A bunch of thrill-seekers ',
        people: '5 to 10 people',
        icon:'🎉'
    }
]

export const SelectBudgetOptions = [
    {

        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs ',
        icon:'💵'

    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id:3,
        title: 'Luxury',
        desc : 'Do not worry about cost',
        icon: '💸'
    }
]
 export const AI_PROMPT='Generate Travel Plan for Location : {location} , for {totalDays} Days for {traveler} with a {budget} budget , give me Hotels options list with HotelName , Hotel address , Price , hotel image url , geo coordinates , rating , descriptions and suggest itinerary with place name , place details , place image url , geo coordinates , ticket pricing ,time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format '