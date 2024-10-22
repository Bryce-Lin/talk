import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// ... (previous styled components remain unchanged)

function VotingPage() {
  const { id } = useParams();
  const [contestant, setContestant] = useState(null);
  const [voted, setVoted] = useState(false);

  const fetchContestant = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/contestants/${id}`);
      setContestant(res.data);
    } catch (error) {
      console.error('Error fetching contestant:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchContestant();
  }, [fetchContestant]);

  const vote = async () => {
    if (!voted) {
      try {
        await axios.post(`${API_URL}/api/votes/${id}`);
        setVoted(true);
        fetchContestant();
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  };

  // ... rest of the component remains unchanged
}

export default VotingPage;