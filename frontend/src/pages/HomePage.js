import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleCriterionClick = (path) => {
    navigate(path);
  };

  // New function to handle navigation to feature pages
  const handleFeatureClick = (featurePath) => {
    navigate(featurePath);
  };

  const features = [
    {
      icon: <UploadFileIcon fontSize="large" color="primary" />,
      title: 'Upload Reports',
      description: 'Easily upload your NAAC SSR reports in PDF format for instant analysis.',
      path: '/upload-reports'
    },
    {
      icon: <AnalyticsIcon fontSize="large" color="primary" />,
      title: 'AI-Powered Analysis',
      description: 'Our LLM technology analyzes your reports and provides valuable insights.',
      path: '/ai-analysis'
    },
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: 'Improve Accreditation',
      description: 'Get actionable recommendations to improve your NAAC accreditation score.',
      path: '/improvement'
    },
    {
      icon: <HowToRegIcon fontSize="large" color="primary" />,
      title: 'Track Progress',
      description: "Monitor your institution's progress across all key NAAC criteria.",
      path: '/progress-tracking'
    },
  ];

  const criteria = [
    { path: '/criterion-1', title: 'Criterion 1: Curricular Aspects' },
    { path: '/criterion-2', title: 'Criterion 2: Teaching-Learning & Evaluation' },
    { path: '/criterion-3', title: 'Criterion 3: Research, Innovations & Extension' },
    { path: '/criterion-4', title: 'Criterion 4: Infrastructure & Learning Resources' },
    { path: '/criterion-5', title: 'Criterion 5: Student Support & Progression' },
    { path: '/criterion-6', title: 'Criterion 6: Governance, Leadership & Management' },
    { path: '/criterion-7', title: 'Criterion 7: Institutional Values & Best Practices' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          p: 6,
          mb: 6,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          NAAC Report Assessor
        </Typography>
        <Typography variant="h5" paragraph sx={{ mb: 4 }}>
          Leverage AI to analyze and improve your institution's NAAC Self-Study Reports
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleUploadClick}
            sx={{ fontWeight: 'bold', px: 4 }}
          >
            Upload Report
          </Button>
          <Button
            variant="outlined"
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'white',
              },
              fontWeight: 'bold',
              px: 4,
            }}
            size="large"
            onClick={handleDashboardClick}
          >
            View Dashboard
          </Button>
        </Box>
      </Box>

      {/* Our Key Features Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
          Our Key Features
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Take advantage of these powerful tools to enhance your NAAC accreditation process
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    cursor: 'pointer'
                  },
                }}
                onClick={() => handleFeatureClick(feature.path)}
              >
                <Box sx={{ p: 1, mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ mt: 'auto' }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* NAAC Criteria Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
          NAAC Assessment Criteria
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Our system evaluates your institution across all seven key NAAC criteria. Click on a criterion to explore more.
        </Typography>
        <Grid container spacing={4}>
          {criteria.map((criterion, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Criterion {index + 1}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {criterion.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleCriterionClick(criterion.path)}
                >
                  Explore
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;