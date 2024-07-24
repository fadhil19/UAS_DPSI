const express = require('express');
const { PenerimaanZakat } = require('../models');
const router = express.Router();

// Create PenerimaanZakat
router.post('/', async (req, res) => {
  try {
    const penerimaanZakat = await PenerimaanZakat.create(req.body);
    res.status(201).json(penerimaanZakat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all PenerimaanZakat
router.get('/', async (req, res) => {
  try {
    const penerimaanZakats = await PenerimaanZakat.findAll();
    res.status(200).json(penerimaanZakats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get PenerimaanZakat by ID
router.get('/:id', async (req, res) => {
  try {
    const penerimaanZakat = await PenerimaanZakat.findByPk(req.params.id);
    if (penerimaanZakat) {
      res.status(200).json(penerimaanZakat);
    } else {
      res.status(404).json({ error: 'Penerimaan Zakat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update PenerimaanZakat
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await PenerimaanZakat.update(req.body, { where: { no_transaksi: req.params.id } });
    if (updated) {
      const updatedPenerimaanZakat = await PenerimaanZakat.findByPk(req.params.id);
      res.status(200).json(updatedPenerimaanZakat);
    } else {
      res.status(404).json({ error: 'Penerimaan Zakat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete PenerimaanZakat
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PenerimaanZakat.destroy({ where: { no_transaksi: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Penerimaan Zakat deleted' });
    } else {
      res.status(404).json({ error: 'Penerimaan Zakat not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
