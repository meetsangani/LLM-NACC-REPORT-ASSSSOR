import React from 'react';
import { Container, Typography, Paper, Box, Grid, Card, CardContent, Divider } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsightsIcon from '@mui/icons-material/Insights';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function AIAnalysis() {
  // Sample analysis data
  const analysisResults = {
    criteriaScores: [
      { name: 'Criterion 1', score: 85, max: 100 },
      { name: 'Criterion 2', score: 78, max: 100 },
      { name: 'Criterion 3', score: 62, max: 100 },
      { name: 'Criterion 4', score: 91, max: 100 },
      { name: 'Criterion 5', score: 73, max: 100 },
      { name: 'Criterion 6', score: 81, max: 100 },
      { name: 'Criterion 7', score: 76, max: 100 },
    ],
    strengths: [
      'Strong faculty qualification profile',
      'Innovative teaching methodologies',
      'Well-established research centers',
      'Excellent student support services'
    ],
    improvements: [
      'Enhance industry collaboration',
      'Strengthen documentation of extension activities',
      'Increase research publications in high-impact journals',
      'Improve feedback collection mechanisms'
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <AnalyticsIcon fontSize="large" color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            AI-Powered Analysis
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Our advanced AI analyzes your NAAC reports to provide comprehensive insights and recommendations
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AssessmentIcon sx={{ mr: 1 }} /> Analysis Overview
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={4}>
            {analysisResults.criteriaScores.map((criterion, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: '-20px',
                      right: '20px',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: criterion.score > 80 ? 'success.main' : criterion.score > 70 ? 'warning.main' : 'error.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      border: '3px solid white'
                    }}
                  >
                    {criterion.score}%
                  </Box>
                  <CardContent sx={{ pt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {criterion.name}
                    </Typography>
                    <Box 
                      sx={{ 
                        height: '8px', 
                        backgroundColor: '#e0e0e0',
                        borderRadius: 5,
                        mt: 2
                      }}
                    >
                      <Box 
                        sx={{ 
                          height: '100%', 
                          width: `${criterion.score}%`,
                          backgroundColor: criterion.score > 80 ? 'success.main' : criterion.score > 70 ? 'warning.main' : 'error.main',
                          borderRadius: 5
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <InsightsIcon sx={{ mr: 1 }} /> Key Insights
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                    <CheckCircleIcon sx={{ mr: 1 }} /> Strengths
                  </Typography>
                  <Box component="ul">
                    {analysisResults.strengths.map((strength, index) => (
                      <Typography component="li" key={index} sx={{ mb: 1 }}>
                        {strength}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'warning.main' }}>
                    <ErrorIcon sx={{ mr: 1 }} /> Areas for Improvement
                  </Typography>
                  <Box component="ul">
                    {analysisResults.improvements.map((improvement, index) => (
                      <Typography component="li" key={index} sx={{ mb: 1 }}>
                        {improvement}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <BarChartIcon sx={{ mr: 1 }} /> Detailed Reports
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" paragraph>
            For a comprehensive breakdown of your institution's performance, explore our detailed 
            criterion-specific analysis reports. Each report provides in-depth insights, specific recommendations, 
            and actionable strategies to improve your NAAC accreditation score.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default AIAnalysis;