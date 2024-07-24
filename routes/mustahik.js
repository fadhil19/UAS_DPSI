const express = require('express');
const { Mustahik } = require('../models');
const router = express.Router();

// Create Mustahik
router.post('/', async (req, res) => {
  try {
    const mustahik = await Mustahik.create(req.body);
    res.status(201).json(mustahik);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Mustahiks
router.get('/', async (req, res) => {
  try {
    const mustahiks = await Mustahik.findAll();
    res.status(200).json(mustahiks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Mustahik by ID
router.get('/:id', async (req, res) => {
  try {
    const mustahik = await Mustahik.findByPk(req.params.id);
    if (mustahik) {
      res.status(200).json(mustahik);
    } else {
      res.status(404).json({ error: 'Mustahik not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Mustahik
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Mustahik.update(req.body, { where: { no_mustahik: req.params.id } });
    if (updated) {
      const updatedMustahik = await Mustahik.findByPk(req.params.id);
      res.status(200).json(updatedMustahik);
    } else {
      res.status(404).json({ error: 'Mustahik not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Mustahik
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Mustahik.destroy({ where: { no_mustahik: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Mustahik deleted' });
    } else {
      res.status(404).json({ error: 'Mustahik not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
