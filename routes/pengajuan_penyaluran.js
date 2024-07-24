const express = require('express');
const { PengajuanPenyaluran } = require('../models');
const router = express.Router();

// Create PengajuanPenyaluran
router.post('/', async (req, res) => {
  try {
    const pengajuanPenyaluran = await PengajuanPenyaluran.create(req.body);
    res.status(201).json(pengajuanPenyaluran);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all PengajuanPenyaluran
router.get('/', async (req, res) => {
  try {
    const pengajuanPenyalurans = await PengajuanPenyaluran.findAll();
    res.status(200).json(pengajuanPenyalurans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get PengajuanPenyaluran by ID
router.get('/:id', async (req, res) => {
  try {
    const pengajuanPenyaluran = await PengajuanPenyaluran.findByPk(req.params.id);
    if (pengajuanPenyaluran) {
      res.status(200).json(pengajuanPenyaluran);
    } else {
      res.status(404).json({ error: 'Pengajuan Penyaluran not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update PengajuanPenyaluran
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await PengajuanPenyaluran.update(req.body, { where: { no_pengajuan: req.params.id } });
    if (updated) {
      const updatedPengajuanPenyaluran = await PengajuanPenyaluran.findByPk(req.params.id);
      res.status(200).json(updatedPengajuanPenyaluran);
    } else {
      res.status(404).json({ error: 'Pengajuan Penyaluran not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete PengajuanPenyaluran
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PengajuanPenyaluran.destroy({ where: { no_pengajuan: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Pengajuan Penyaluran deleted' });
    } else {
      res.status(404).json({ error: 'Pengajuan Penyaluran not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
