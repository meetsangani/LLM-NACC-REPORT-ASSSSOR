import React, { useState } from 'react';
import { 
  Container, Typography, Paper, Box, Grid, Card, CardContent, 
  Divider, LinearProgress, Tabs, Tab, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, Button
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TimelineIcon from '@mui/icons-material/Timeline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import GetAppIcon from '@mui/icons-material/GetApp';

function ProgressTracking() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Sample progress data
  const progressData = {
    overall: {
      previous: 62,
      current: 78,
      target: 85
    },
    criteria: [
      { id: 1, name: 'Curricular Aspects', previous: 65, current: 82, target: 90, status: 'In Progress' },
      { id: 2, name: 'Teaching-Learning & Evaluation', previous: 72, current: 80, target: 85, status: 'In Progress' },
      { id: 3, name: 'Research, Innovations & Extension', previous: 58, current: 70, target: 80, status: 'In Progress' },
      { id: 4, name: 'Infrastructure & Learning Resources', previous: 60, current: 85, target: 85, status: 'Completed' },
      { id: 5, name: 'Student Support & Progression', previous: 55, current: 72, target: 85, status: 'In Progress' },
      { id: 6, name: 'Governance, Leadership & Management', previous: 68, current: 78, target: 85, status: 'In Progress' },
      { id: 7, name: 'Institutional Values & Best Practices', previous: 59, current: 75, target: 80, status: 'In Progress' }
    ],
    recentActivities: [
      { date: '2025-03-15', action: 'Updated faculty research publication database', criterion: 3 },
      { date: '2025-03-10', action: 'Implemented new student feedback system', criterion: 2 },
      { date: '2025-03-05', action: 'Upgraded laboratory facilities', criterion: 4 },
      { date: '2025-02-28', action: 'Enhanced documentation of extension activities', criterion: 3 },
      { date: '2025-02-20', action: 'Established new industry partnerships', criterion: 1 },
    ],
    pendingTasks: [
      { deadline: '2025-04-15', task: 'Complete digital library integration', criterion: 4, priority: 'High' },
      { deadline: '2025-04-10', task: 'Finalize governance documentation', criterion: 6, priority: 'Medium' },
      { deadline: '2025-04-05', task: 'Implement green campus initiatives', criterion: 7, priority: 'Medium' },
      { deadline: '2025-03-30', task: 'Update alumni engagement records', criterion: 5, priority: 'High' },
    ]
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Completed':
        return <Chip icon={<CheckCircleIcon />} label={status} color="success" size="small" />;
      case 'In Progress':
        return <Chip icon={<HourglassEmptyIcon />} label={status} color="warning" size="small" />;
      case 'Not Started':
        return <Chip icon={<ErrorOutlineIcon />} label={status} color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <TimelineIcon fontSize="large" color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Progress Tracking
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Monitor your institution's progress toward NAAC accreditation goals
          </Typography>
        </Box>
        
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>
            Overall Progress
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Previous Assessment: {progressData.overall.previous}%</Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    Current: {progressData.overall.current}%
                  </Typography>
                  <Typography variant="body2">Target: {progressData.overall.target}%</Typography>
                </Box>
                <LinearProgress 
                  variant="buffer" 
                  value={progressData.overall.current} 
                  valueBuffer={progressData.overall.target} 
                  sx={{ height: 10, borderRadius: 5 }} 
                />
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  {progressData.overall.current - progressData.overall.previous}% Improvement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {progressData.overall.target - progressData.overall.current}% remaining to reach target
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ mb: 5 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 3 }}
          >
            <Tab icon={<HowToRegIcon />} label="Criteria Progress" />
            <Tab icon={<DateRangeIcon />} label="Activity Timeline" />
          </Tabs>
          
          {tabValue === 0 && (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead sx={{ bgcolor: 'primary.light' }}>
                  <TableRow>
                    <TableCell>Criterion</TableCell>
                    <TableCell>Previous</TableCell>
                    <TableCell>Current</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {progressData.criteria.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {row.id}. {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.previous}%</TableCell>
                      <TableCell>{row.current}%</TableCell>
                      <TableCell>{row.target}%</TableCell>
                      <TableCell>
                        <Box sx={{ width: '100%' }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={(row.current / row.target) * 100} 
                            sx={{ height: 8, borderRadius: 5 }} 
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(row.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          {tabValue === 1 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Recent Activities
                    </Typography>
                    <Box>
                      {progressData.recentActivities.map((activity, index) => (
                        <Box key={index} sx={{ 
                          p: 2, 
                          borderBottom: index < progressData.recentActivities.length - 1 ? '1px solid #eee' : 'none',
                          display: 'flex',
                          alignItems: 'flex-start'
                        }}>
                          <Box sx={{ 
                            minWidth: '80px', 
                            textAlign: 'center',
                            bgcolor: 'primary.light', 
                            p: 1, 
                            borderRadius: 1,
                            mr: 2
                          }}>
                            <Typography variant="body2">
                              {new Date(activity.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body1">
                              {activity.action}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Criterion {activity.criterion}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Pending Tasks
                    </Typography>
                    <Box>
                      {progressData.pendingTasks.map((task, index) => (
                        <Box key={index} sx={{ 
                          p: 2, 
                          borderBottom: index < progressData.pendingTasks.length - 1 ? '1px solid #eee' : 'none',
                          display: 'flex',
                          alignItems: 'flex-start'
                        }}>
                          <Box sx={{ 
                            minWidth: '80px', 
                            textAlign: 'center',
                            bgcolor: new Date(task.deadline) < new Date() ? 'error.light' : 'warning.light', 
                            p: 1, 
                            borderRadius: 1,
                            mr: 2
                          }}>
                            <Typography variant="body2">
                              {new Date(task.deadline).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body1">
                                {task.task}
                              </Typography>
                              <Chip 
                                label={task.priority} 
                                color={task.priority === 'High' ? 'error' : 'warning'} 
                                size="small" 
                              />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Criterion {task.criterion}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            startIcon={<GetAppIcon />}
          >
            Download Progress Report
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProgressTracking;