import React, { useState } from 'react';
import { 
  Container, Typography, Grid, Paper, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Tabs, Tab
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import ScoreIcon from '@mui/icons-material/Score';

// Mock data for demonstration
const mockReports = [
  { id: 1, title: 'Annual NAAC Report 2023', date: '2023-10-12', status: 'Analyzed', score: 3.45 },
  { id: 2, title: 'Mid-term Assessment 2023', date: '2023-06-23', status: 'Analyzed', score: 3.21 },
  { id: 3, title: 'Draft SSR Report', date: '2023-11-05', status: 'Pending', score: null },
];

const mockCriteriaScores = {
  'Curricular Aspects': 3.2,
  'Teaching-Learning & Evaluation': 3.5,
  'Research, Innovations & Extension': 3.0,
  'Infrastructure & Learning Resources': 3.8,
  'Student Support & Progression': 3.1,
  'Governance, Leadership & Management': 3.7,
  'Institutional Values & Best Practices': 3.9
};

const DashboardPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderScoreCard = (title, value, icon) => (
    <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" component="div" color="primary.main" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );

  const renderCriteriaChart = () => (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Criterion</strong></TableCell>
            <TableCell><strong>Score</strong></TableCell>
            <TableCell><strong>Visual</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(mockCriteriaScores).map(([criterion, score], index) => (
            <TableRow key={index}>
              <TableCell>{criterion}</TableCell>
              <TableCell>{score.toFixed(2)}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: `${(score/4)*100}%`,
                      bgcolor: score >= 3.5 ? 'success.main' : score >= 3.0 ? 'warning.main' : 'error.main',
                      height: 10,
                      borderRadius: 5
                    }}
                  />
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {((score/4)*100).toFixed(1)}%
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        NAAC Assessment Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          {renderScoreCard('Overall CGPA', '3.45', <ScoreIcon color="primary" sx={{ fontSize: 40 }} />)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderScoreCard('Reports', '3', <InsertDriveFileIcon color="primary" sx={{ fontSize: 40 }} />)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderScoreCard('Highest Score', '3.9', <BarChartIcon color="primary" sx={{ fontSize: 40 }} />)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderScoreCard('Progress', '76%', <TimelineIcon color="primary" sx={{ fontSize: 40 }} />)}
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Criteria Scores" />
          <Tab label="Reports" />
          <Tab label="Recommendations" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mb: 4 }}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              NAAC Criteria Performance
            </Typography>
            {renderCriteriaChart()}
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Uploaded Reports
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            bgcolor: report.status === 'Analyzed' ? 'success.light' : 'warning.light',
                            color: report.status === 'Analyzed' ? 'success.dark' : 'warning.dark',
                            p: 0.5,
                            px: 1,
                            borderRadius: 1,
                            display: 'inline-block'
                          }}
                        >
                          {report.status}
                        </Box>
                      </TableCell>
                      <TableCell>{report.score ? report.score.toFixed(2) : 'N/A'}</TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        
        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Improvement Recommendations
            </Typography>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Key Areas for Improvement
              </Typography>
              <Typography variant="body1" paragraph>
                Based on our analysis of your reports, here are the top areas where you can improve:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Research Output:</strong> Increase faculty research publications in high-impact journals
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Student Progression:</strong> Improve tracking of student outcomes post-graduation
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Infrastructure:</strong> Enhance ICT facilities in classrooms
                  </Typography>
                </li>
              </ul>
              <Button variant="contained" sx={{ mt: 2 }}>
                View Full Analysis Report
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DashboardPage;