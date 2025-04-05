import React, { useState } from 'react';
import {
  Container, Typography, Grid, Paper, Box,
  Button, TextField, MenuItem, Select, FormControl,
  InputLabel, FormHelperText, Stepper, Step, StepLabel,
  Alert, CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, Link } from 'react-router-dom'; // Import both useNavigate and Link

const CRITERIA_OPTIONS = [
  "All Criteria",
  "Criterion 1: Curricular Aspects",
  "Criterion 2: Teaching-Learning & Evaluation",
  "Criterion 3: Research, Innovations & Extension",
  "Criterion 4: Infrastructure & Learning Resources",
  "Criterion 5: Student Support & Progression",
  "Criterion 6: Governance, Leadership & Management",
  "Criterion 7: Institutional Values & Best Practices"
];

const UploadPage = () => {
  // This is the correct placement for useNavigate
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [reportTitle, setReportTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [reportType, setReportType] = useState('');
  const [criteria, setCriteria] = useState('All Criteria');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Rest of your code remains the same...
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Please upload a valid PDF file');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    setError(null);

    // Mock API call
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setActiveStep(3); // Move to completion step
    }, 2000);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const steps = ['Upload Details', 'Select PDF', 'Review', 'Complete'];

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !reportTitle || !institution || !reportType;
      case 1:
        return !file;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="reportTitle"
                  label="Report Title"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="institution"
                  label="Institution Name"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <MenuItem value="SSR">Self-Study Report (SSR)</MenuItem>
                    <MenuItem value="AQAR">Annual Quality Assurance Report (AQAR)</MenuItem>
                    <MenuItem value="IIQA">Institutional Information for Quality Assessment (IIQA)</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Criteria to Analyze</InputLabel>
                  <Select
                    value={criteria}
                    label="Criteria to Analyze"
                    onChange={(e) => setCriteria(e.target.value)}
                  >
                    {CRITERIA_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="upload-pdf-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-pdf-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ py: 2, px: 4, mb: 2 }}
              >
                Select PDF File
              </Button>
            </label>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {file && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="success" icon={<CheckCircleIcon />}>
                  File selected: {file.name}
                </Alert>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Box>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
              Please upload a PDF file of your NAAC report (max size: 10MB)
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Submission
            </Typography>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Report Title:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{reportTitle}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2">Institution:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{institution}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2">Report Type:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{reportType}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2">Criteria:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{criteria}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2">File:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{file?.name}</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Typography variant="body2" color="text.secondary">
              Please review the information above before submitting your report for analysis.
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            {isUploading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress size={60} sx={{ mb: 3 }} />
                <Typography variant="h6">Uploading your report...</Typography>
                <Typography variant="body2" color="text.secondary">
                  This may take a few moments
                </Typography>
              </Box>
            ) : uploadSuccess ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 3 }} />
                <Typography variant="h6">Upload Successful!</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Your report has been uploaded and is now being processed.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    color="primary"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Analysis Results
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload NAAC Report
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: 4 }}>
        {renderStepContent()}

        {activeStep !== steps.length - 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>

            {activeStep === steps.length - 2 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isNextDisabled()}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isNextDisabled()}
              >
                Next
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default UploadPage;