const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // Vote for a contestant
  router.post('/:id', async (req, res) => {
    try {
      const [result] = await pool.query('UPDATE contestants SET votes = votes + 1 WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Contestant not found' });
      }
      const [rows] = await pool.query('SELECT * FROM contestants WHERE id = ?', [req.params.id]);
      res.json(rows[0]);
    } catch (err) {
      console.error('Error voting for contestant:', err);
      res.status(500).json({ message: 'Error voting for contestant', error: err.message });
    }
  });

  return router;
};