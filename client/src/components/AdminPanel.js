import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions, Alert } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AdminPanel() {
  const [contestants, setContestants] = useState([]);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);

  const fetchContestants = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/contestants`);
      setContestants(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contestants:', err.message);
      setError('Failed to fetch contestants. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchContestants();
  }, [fetchContestants]);

  const addContestant = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/contestants`, { name, avatar });
      setContestants(prevContestants => [...prevContestants, res.data.contestant]);
      setName('');
      setAvatar('');
      setError(null);
    } catch (err) {
      console.error('Error adding contestant:', err.message);
      setError('Failed to add contestant. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        脱口秀投票系统管理面板
      </Typography>
      {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
      <form onSubmit={addContestant}>
        {/* ... (rest of the component remains unchanged) ... */}
      </form>
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        {/* ... (rest of the component remains unchanged) ... */}
      </Grid>
    </Container>
  );
}

export default AdminPanel;