import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, Alert, LinearProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadReports() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileSelect = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Please select a file first.' });
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadStatus({ 
        type: 'success', 
        message: 'Report uploaded successfully! Your analysis will begin shortly.' 
      });
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <UploadFileIcon fontSize="large" color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Upload NAAC Reports
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Upload your institution's Self-Study Report (SSR) for comprehensive AI-powered analysis
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Supported File Types
        </Typography>
        <Typography variant="body1" paragraph>
          We currently accept PDF documents (.pdf) of your NAAC Self-Study Reports. 
          For optimal analysis, please ensure your documents are properly formatted and text-searchable.
        </Typography>
        
        <Box sx={{ 
          border: '2px dashed #ccc', 
          borderRadius: 2, 
          p: 4, 
          textAlign: 'center',
          mb: 4,
          backgroundColor: '#f9f9f9'
        }}>
          <input
            type="file"
            accept=".pdf"
            id="report-upload"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <label htmlFor="report-upload">
            <Button
              component="span"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Select File
            </Button>
          </label>
          
          <Typography variant="body2" sx={{ mt: 1 }}>
            {selectedFile ? `Selected: ${selectedFile.name}` : 'No file selected'}
          </Typography>
          
          {uploading && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress />
            </Box>
          )}
          
          {uploadStatus && (
            <Alert severity={uploadStatus.type} sx={{ mt: 2 }}>
              {uploadStatus.message}
            </Alert>
          )}
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            startIcon={<CloudUploadIcon />}
            disabled={!selectedFile || uploading}
            onClick={handleUpload}
          >
            Upload Report
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UploadReports;