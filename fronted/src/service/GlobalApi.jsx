import axios from 'axios';

const BASE_URL = 'https://commons.wikimedia.org/w/api.php';

// Hàm để lấy chi tiết địa điểm
export const GetPlaceDetails = async (query) => {
    const url = `${BASE_URL}?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*`;

    try {
        const response = await axios.get(url);
        const result = response.data;

        const photos = result.query.search.map(photo => ({
            id: photo.pageid,
            url: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(photo.title.replace('File:', ''))}`,
            description: photo.title
        }));

        return photos; // Trả về danh sách hình ảnh
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};

// Hàm để lấy chi tiết khách sạn
export const GetHotelDetails = async (hotelName) => {
    const url = `${BASE_URL}?action=query&list=search&srsearch=${encodeURIComponent(hotelName)}&srnamespace=6&prop=imageinfo&iiprop=url&format=json&origin=*`;

    try {
        const response = await axios.get(url);
        const result = response.data;

        const photos = result.query.search.map(photo => ({
            id: photo.pageid,
            url: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(photo.title.replace('File:', ''))}`,
            description: photo.title
        }));

        return photos; // Trả về danh sách hình ảnh
    } catch (error) {
        console.error('Error fetching hotel photos:', error);
        throw error;
    }
};


