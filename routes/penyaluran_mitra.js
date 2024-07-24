const express = require('express');
const { PenyaluranMitra } = require('../models');
const router = express.Router();

// Create PenyaluranMitra
router.post('/', async (req, res) => {
  try {
    const penyaluranMitra = await PenyaluranMitra.create(req.body);
    res.status(201).json(penyaluranMitra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all PenyaluranMitra
router.get('/', async (req, res) => {
  try {
    const penyaluranMitras = await PenyaluranMitra.findAll();
    res.status(200).json(penyaluranMitras);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get PenyaluranMitra by ID
router.get('/:id', async (req, res) => {
  try {
    const penyaluranMitra = await PenyaluranMitra.findByPk(req.params.id);
    if (penyaluranMitra) {
      res.status(200).json(penyaluranMitra);
    } else {
      res.status(404).json({ error: 'Penyaluran Mitra not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update PenyaluranMitra
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await PenyaluranMitra.update(req.body, { where: { no_transaksi: req.params.id } });
    if (updated) {
      const updatedPenyaluranMitra = await PenyaluranMitra.findByPk(req.params.id);
      res.status(200).json(updatedPenyaluranMitra);
    } else {
      res.status(404).json({ error: 'Penyaluran Mitra not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete PenyaluranMitra
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PenyaluranMitra.destroy({ where: { no_transaksi: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Penyaluran Mitra deleted' });
    } else {
      res.status(404).json({ error: 'Penyaluran Mitra not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
