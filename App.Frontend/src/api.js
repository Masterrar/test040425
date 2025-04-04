import axios from 'axios';

const apiUrl = 'http://localhost:5201/api/data';

export const fetchData = async (page, pageSize, { signal }) => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                pageNumber: page + 1,
                pageSize,
                sortBy: 'code',
                sortOrder: 'asc',
            },
            signal,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const uploadData = async (data) => {
  await axios.post(apiUrl, data);
};