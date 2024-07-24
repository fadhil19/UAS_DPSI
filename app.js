const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authMiddleware = require('./middleware/auth');  // Import middleware

const muzakkiRoutes = require('./routes/muzakki');
const mustahikRoutes = require('./routes/mustahik');
const mitraRoutes = require('./routes/mitra');
const kategoriRoutes = require('./routes/kategori');
const penerimaanZakatRoutes = require('./routes/penerimaan_zakat');
const penyaluranZakatRoutes = require('./routes/penyaluran_zakat');
const pengajuanPenyaluranRoutes = require('./routes/pengajuan_penyaluran');
const penyaluranMitraRoutes = require('./routes/penyaluran_mitra');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.json());

// Public routes
app.use('/user', userRoutes);

// Protected routes
app.use('/muzakki', authMiddleware, muzakkiRoutes);
app.use('/mustahik', authMiddleware, mustahikRoutes);
app.use('/mitra', authMiddleware, mitraRoutes);
app.use('/kategori', authMiddleware, kategoriRoutes);
app.use('/penerimaan_zakat', authMiddleware, penerimaanZakatRoutes);
app.use('/penyaluran_zakat', authMiddleware, penyaluranZakatRoutes);
app.use('/pengajuan_penyaluran', authMiddleware, pengajuanPenyaluranRoutes);
app.use('/penyaluran_mitra', authMiddleware, penyaluranMitraRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

require('dotenv').config();

module.exports = app;