import { fetchData } from '../api'; // Импортируйте fetchData

export const loadData = async (dispatch, setRows, controller, page, pageSize) => {
    try {
        const data = await fetchData(page, pageSize, { signal: controller.signal });
        setRows(data.data); // Предполагаем, что данные находятся в поле 'data'
        return data.totalRecords;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Запрос отменен');
        } else {
            dispatch(setAlert({ message: "Ошибка при получении данных", severity: "error" }));
        }
    }
};