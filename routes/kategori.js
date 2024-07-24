const express = require('express');
const { Kategori } = require('../models');
const router = express.Router();

// Create Kategori
router.post('/', async (req, res) => {
  try {
    const kategori = await Kategori.create(req.body);
    res.status(201).json(kategori);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Kategori
router.get('/', async (req, res) => {
  try {
    const kategoris = await Kategori.findAll();
    res.status(200).json(kategoris);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Kategori by ID
router.get('/:id', async (req, res) => {
  try {
    const kategori = await Kategori.findByPk(req.params.id);
    if (kategori) {
      res.status(200).json(kategori);
    } else {
      res.status(404).json({ error: 'Kategori not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Kategori
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Kategori.update(req.body, { where: { kategori: req.params.id } });
    if (updated) {
      const updatedKategori = await Kategori.findByPk(req.params.id);
      res.status(200).json(updatedKategori);
    } else {
      res.status(404).json({ error: 'Kategori not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Kategori
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Kategori.destroy({ where: { kategori: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Kategori deleted' });
    } else {
      res.status(404).json({ error: 'Kategori not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
