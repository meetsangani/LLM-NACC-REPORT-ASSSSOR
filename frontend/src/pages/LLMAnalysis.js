import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Box, Paper, Alert } from '@mui/material';
// import api from '../services/api';

const LLMAnalysis = () => {
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!inputText.trim()) {
            setError('Please enter text for analysis.');
            return;
        }

        setLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            // Fix this line in the handleAnalyze function
            const response = await api.post('/analysis/llm', { text: inputText });
            setAnalysisResult(response.data.result); // Changed from response.result to response.data.result
        } catch (err) {
            setError(err.message || 'Failed to analyze the text. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                LLM NAAC Report Analysis
            </Typography>
            <Typography variant="body1" paragraph>
                Enter the text or content of your NAAC report below to get insights and analysis powered by LLM.
            </Typography>

            <TextField
                label="Enter Report Text"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{ mb: 3 }}
            />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handleAnalyze}
                disabled={loading}
                sx={{ mb: 3 }}
            >
                {loading ? 'Analyzing...' : 'Analyze'}
            </Button>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {analysisResult && (
                <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Analysis Result
                    </Typography>
                    <Typography variant="body1">{analysisResult}</Typography>
                </Paper>
            )}
        </Container>
    );
};

export default LLMAnalysis;