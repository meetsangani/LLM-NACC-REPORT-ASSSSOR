import React from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
    const features = [
        {
            title: 'Upload Reports',
            description: 'Easily upload your Self-Study Reports (SSR) for AI-powered analysis.',
            link: '/upload-reports',
        },
        {
            title: 'AI Analysis',
            description: 'Get detailed insights and suggestions for improving your reports.',
            link: '/ai-analysis',
        },
        {
            title: 'Progress Tracking',
            description: 'Track your institution’s progress towards NAAC accreditation.',
            link: '/progress-tracking',
        },
        {
            title: 'Improvement Suggestions',
            description: 'Receive actionable suggestions to enhance your accreditation process.',
            link: '/improvement',
        },
    ];

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h5" component="h3" gutterBottom>
                Ready to improve your NAAC accreditation?
            </Typography>
            <Typography variant="body1" paragraph>
                Start by uploading your Self-Study Report (SSR) for AI-powered analysis.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/register"
                sx={{ mr: 2 }}
            >
                Register Now
            </Button>
            <Button variant="outlined" component={Link} to="/login" size="large">
                Login
            </Button>

            {/* New Feature Section */}
            <div style={{ marginTop: '50px' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Explore Our Features
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    {feature.description}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={feature.link}
                                >
                                    Learn More
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Home;