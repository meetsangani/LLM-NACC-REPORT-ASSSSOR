import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, Alert, LinearProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'; // Import axios for API calls

function UploadReports() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setUploadStatus({ 
          type: 'error', 
          message: 'Please select a PDF file only.' 
        });
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setUploadStatus({ 
          type: 'error', 
          message: 'File size exceeds 10MB limit. Please select a smaller file.' 
        });
        return;
      }
      
      setSelectedFile(file);
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Please select a file first.' });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('fileName', selectedFile.name);
    
    try {
      // Make API call to upload the file
      const response = await axios.post('/api/v1/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      setUploading(false);
      setUploadStatus({ 
        type: 'success', 
        message: 'Report uploaded successfully! Your analysis will begin shortly.',
        reportId: response.data.id // Store the report ID for later use
      });
      setSelectedFile(null);
    } catch (error) {
      setUploading(false);
      setUploadStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Error uploading file. Please try again.'
      });
    }
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
            {selectedFile ? `Selected: ${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)` : 'No file selected'}
          </Typography>
          
          {uploading && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Uploading: {uploadProgress}%
              </Typography>
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