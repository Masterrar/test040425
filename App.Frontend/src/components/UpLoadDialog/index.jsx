import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
const UploadDialog = ({ open, onClose, jsonInput, setJsonInput, handleUpload }) => {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Загрузка JSON</DialogTitle>
        <DialogContent>
          <TextField
            label="Вставьте JSON"
            fullWidth
            multiline
            rows={6}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="contained" onClick={handleUpload}>
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default UploadDialog;