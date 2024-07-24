const express = require('express');
const { Mitra } = require('../models');
const router = express.Router();

// Create Mitra
router.post('/', async (req, res) => {
  try {
    const mitra = await Mitra.create(req.body);
    res.status(201).json(mitra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Mitras
router.get('/', async (req, res) => {
  try {
    const mitras = await Mitra.findAll();
    res.status(200).json(mitras);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Mitra by ID
router.get('/:id', async (req, res) => {
  try {
    const mitra = await Mitra.findByPk(req.params.id);
    if (mitra) {
      res.status(200).json(mitra);
    } else {
      res.status(404).json({ error: 'Mitra not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Mitra
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Mitra.update(req.body, { where: { no_mitra: req.params.id } });
    if (updated) {
      const updatedMitra = await Mitra.findByPk(req.params.id);
      res.status(200).json(updatedMitra);
    } else {
      res.status(404).json({ error: 'Mitra not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Mitra
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Mitra.destroy({ where: { no_mitra: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Mitra deleted' });
    } else {
      res.status(404).json({ error: 'Mitra not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
