import React from 'react';
import { Container, Typography, Paper, Box, Grid, Card, CardContent, Divider, Chip, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function Improvement() {
  // Sample improvement recommendations
  const recommendations = [
    {
      criterion: 'Criterion 1',
      title: 'Curriculum Enhancement',
      priority: 'High',
      description: 'Strengthen the curriculum feedback system by including more industry experts in the curriculum development process.',
      impact: 'Will enhance curriculum relevance and industry alignment.'
    },
    {
      criterion: 'Criterion 3',
      title: 'Research Output',
      priority: 'High',
      description: 'Establish a research incentive program to encourage faculty to publish in high-impact journals.',
      impact: 'Will increase research visibility and citation metrics.'
    },
    {
      criterion: 'Criterion 4',
      title: 'Infrastructure',
      priority: 'Medium',
      description: 'Enhance laboratory facilities with modern equipment for advanced research.',
      impact: 'Will support better research outcomes and practical learning.'
    },
    {
      criterion: 'Criterion 5',
      title: 'Student Progression',
      priority: 'High',
      description: 'Implement a comprehensive career counseling and placement preparation program.',
      impact: 'Will improve placement rates and student career outcomes.'
    },
    {
      criterion: 'Criterion 6',
      title: 'Governance',
      priority: 'Medium',
      description: 'Develop a more transparent resource allocation mechanism with clear documentation.',
      impact: 'Will enhance institutional efficiency and resource utilization.'
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <TrendingUpIcon fontSize="large" color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Accreditation Improvement
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Strategic recommendations to enhance your institution's NAAC accreditation score
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AssignmentTurnedInIcon sx={{ mr: 1 }} /> Key Recommendations
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {recommendations.map((recommendation, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {recommendation.criterion}
                    </Typography>
                    <Typography variant="h6">
                      {recommendation.title}
                    </Typography>
                  </Box>
                  <Chip 
                    label={recommendation.priority} 
                    color={recommendation.priority === "High" ? "error" : "warning"} 
                    size="small"
                    icon={recommendation.priority === "High" ? <PriorityHighIcon /> : undefined}
                  />
                </Box>
                
                <Typography variant="body1" paragraph>
                  {recommendation.description}
                </Typography>
                
                <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <BookmarkIcon fontSize="small" sx={{ mr: 1 }} />
                    <strong>Expected Impact:</strong> {recommendation.impact}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <GroupIcon sx={{ mr: 1 }} /> Implementation Strategy
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Short-Term Actions (0-6 months)
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Create dedicated improvement teams for each criterion
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Develop detailed implementation plans with timelines
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Begin documentation improvement process
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Conduct training for faculty and staff on NAAC requirements
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Medium-Term Actions (6-12 months)
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Implement recommended policy changes
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Enhance infrastructure as per recommendations
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Develop research initiatives and collaborations
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Strengthen student support systems
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Long-Term Actions (1-2 years)
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Ensure sustainability of implemented changes
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Conduct periodic internal assessments
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Measure impact of improvements on key metrics
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Fine-tune strategies based on ongoing feedback
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            startIcon={<SchoolIcon />}
          >
            Generate Comprehensive Improvement Plan
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Improvement;