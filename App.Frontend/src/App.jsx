import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, clearAlert } from './store/alertSlice';
import { uploadData } from './api';
import { loadData } from './utils/loadData';
import UploadDialog from './components/UploadDialog';
import AppGrid from './components/AppGrid';
import { Box, Snackbar, Alert, AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function App() {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);
    const [rows, setRows] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [jsonInput, setJsonInput] = useState(`[{"1": "value1"},{"5":"value2"}]`);
    const [paginationModel, setPaginationModel] = React.useState({
      pageSize: 25,
      page: 0,
    });
    const [totalRecords, setTotalRecords] = useState(0);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setJsonInput(`[{"1": "value1"},{"5":"value2"}]`); // Сбрасываем текст
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Загрузка данных
    useEffect(() => {
        const controller = new AbortController(); // Создаем AbortController

        const fetchDataAsync = async () => {
          const total = await loadData(dispatch, setRows, controller, paginationModel.page, paginationModel.pageSize);
          setTotalRecords(total); // Сохраняем общее количество записей
      };

        fetchDataAsync();

        return () => {
            controller.abort(); // Отменяем запрос при размонтировании
        };
    }, [dispatch, paginationModel]); // Добавляем page и pageSize в зависимости

    const handleUpload = async () => {
        try {
            const parsed = JSON.parse(jsonInput);
            await uploadData(parsed);
            dispatch(setAlert({ message: "Данные успешно загружены!", severity: "success" }));
            loadData(dispatch, setRows); // Обновляем данные после загрузки
            handleCloseDialog();
        } catch (error) {
            dispatch(setAlert({ message: "Ошибка при получении данных", severity: "error" }));
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Шапка приложения */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Data Viewer
                    </Typography>
                    <Button color="inherit" onClick={handleOpenDialog}>
                        Upload JSON
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Основная часть экрана: таблица на весь остаток */}
            <Box sx={{ flex: 1, p: 2 }}>
                <AppGrid
                    rows={rows}
                    
                    
                    setPaginationModel={setPaginationModel}
                    paginationModel={paginationModel}
                    totalRecords={totalRecords}
                />
            </Box>

            <UploadDialog
                open={openDialog}
                onClose={handleCloseDialog}
                jsonInput={jsonInput}
                setJsonInput={setJsonInput}
                handleUpload={handleUpload}
            />

            {alert.message && (
                <Snackbar
                    open={Boolean(alert.message)}
                    autoHideDuration={6000}
                    onClose={() => dispatch(clearAlert())}
                >
                    <Alert severity={alert.severity} onClose={() => dispatch(clearAlert())}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
}