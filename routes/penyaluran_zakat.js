const express = require('express');
const { PenyaluranZakat } = require('../models');
const router = express.Router();

// Create PenyaluranZakat
router.post('/', async (req, res) => {
  try {
    const penyaluranZakat = await PenyaluranZakat.create(req.body);
    res.status(201).json(penyaluranZakat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all PenyaluranZakat
router.get('/', async (req, res) => {
  try {
    const penyaluranZakats = await PenyaluranZakat.findAll();
    res.status(200).json(penyaluranZakats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get PenyaluranZakat by ID
router.get('/:id', async (req, res) => {
  try {
    const penyaluranZakat = await PenyaluranZakat.findByPk(req.params.id);
    if (penyaluranZakat) {
      res.status(200).json(penyaluranZakat);
    } else {
      res.status(404).json({ error: 'Penyaluran Zakat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update PenyaluranZakat
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await PenyaluranZakat.update(req.body, { where: { no_transaksi: req.params.id } });
    if (updated) {
      const updatedPenyaluranZakat = await PenyaluranZakat.findByPk(req.params.id);
      res.status(200).json(updatedPenyaluranZakat);
    } else {
      res.status(404).json({ error: 'Penyaluran Zakat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete PenyaluranZakat
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PenyaluranZakat.destroy({ where: { no_transaksi: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Penyaluran Zakat deleted' });
    } else {
      res.status(404).json({ error: 'Penyaluran Zakat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
