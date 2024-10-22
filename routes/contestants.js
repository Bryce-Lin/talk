const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

module.exports = (pool) => {
  // Get all contestants
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM contestants');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching contestants:', err);
      res.status(500).json({ message: 'Error fetching contestants', error: err.message });
    }
  });

  // Get a single contestant
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM contestants WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Contestant not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Error fetching contestant:', err);
      res.status(500).json({ message: 'Error fetching contestant', error: err.message });
    }
  });

  // Add a new contestant
  router.post('/', async (req, res) => {
    try {
      const { name, avatar } = req.body;
      if (!name || !avatar) {
        return res.status(400).json({ message: 'Name and avatar are required' });
      }
      
      const [result] = await pool.query('INSERT INTO contestants (name, avatar) VALUES (?, ?)', [name, avatar]);
      const newContestant = { id: result.insertId, name, avatar, votes: 0 };
      
      const qrCode = await QRCode.toDataURL(`${process.env.FRONTEND_URL}/vote/${newContestant.id}`);
      res.status(201).json({ contestant: newContestant, qrCode });
    } catch (err) {
      console.error('Error adding contestant:', err);
      res.status(400).json({ message: 'Error adding contestant', error: err.message });
    }
  });

  return router;
};