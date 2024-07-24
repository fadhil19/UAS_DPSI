const express = require('express');
const { Muzakki } = require('../models');
const router = express.Router();

// Create Muzakki
router.post('/', async (req, res) => {
  try {
    const muzakki = await Muzakki.create(req.body);
    res.status(201).json(muzakki);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Muzakkis
router.get('/', async (req, res) => {
  try {
    const muzakkis = await Muzakki.findAll();
    res.status(200).json(muzakkis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Muzakki by ID
router.get('/:id', async (req, res) => {
  try {
    const muzakki = await Muzakki.findByPk(req.params.id);
    if (muzakki) {
      res.status(200).json(muzakki);
    } else {
      res.status(404).json({ error: 'Muzakki not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Muzakki
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Muzakki.update(req.body, { where: { no_muzakki: req.params.id } });
    if (updated) {
      const updatedMuzakki = await Muzakki.findByPk(req.params.id);
      res.status(200).json(updatedMuzakki);
    } else {
      res.status(404).json({ error: 'Muzakki not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Muzakki
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Muzakki.destroy({ where: { no_muzakki: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Muzakki deleted' });
    } else {
      res.status(404).json({ error: 'Muzakki not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
