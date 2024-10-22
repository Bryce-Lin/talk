import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import VotingPage from './components/VotingPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/vote/:id" element={<VotingPage />} />
          <Route path="/" element={<h1>Welcome to Standup Voting System</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;