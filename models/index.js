const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  dialectModule: require('mysql2')
});

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: Sequelize.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  }
}, { timestamps: false });


const Muzakki = sequelize.define('Muzakki', {
  no_muzakki: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nama: { type: Sequelize.STRING, allowNull: false },
  alamat: { type: Sequelize.STRING, allowNull: false }
}, { timestamps: false });

const Mustahik = sequelize.define('Mustahik', {
  no_mustahik: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nama: { type: Sequelize.STRING, allowNull: false },
  alamat: { type: Sequelize.STRING, allowNull: false }
}, { timestamps: false });

const Mitra = sequelize.define('Mitra', {
  no_mitra: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nama: { type: Sequelize.STRING, allowNull: false },
  alamat: { type: Sequelize.STRING, allowNull: false }
}, { timestamps: false });

const Kategori = sequelize.define('Kategori', {
  kategori: { type: Sequelize.STRING, primaryKey: true },
  nama_zakat: { type: Sequelize.STRING, allowNull: false }
}, { timestamps: false });

const PenerimaanZakat = sequelize.define('PenerimaanZakat', {
  no_transaksi: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tanggal: { type: Sequelize.DATE, allowNull: false },
  jumlah: { type: Sequelize.FLOAT, allowNull: false },
  no_muzakki: { type: Sequelize.INTEGER, references: { model: Muzakki, key: 'no_muzakki' }, allowNull: false },
  kategori: { type: Sequelize.STRING, references: { model: Kategori, key: 'kategori' }, allowNull: false }
}, { timestamps: false });

const PenyaluranZakat = sequelize.define('PenyaluranZakat', {
  no_transaksi: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tanggal: { type: Sequelize.DATE, allowNull: false },
  jumlah: { type: Sequelize.FLOAT, allowNull: false },
  no_mustahik: { type: Sequelize.INTEGER, references: { model: Mustahik, key: 'no_mustahik' }, allowNull: false },
  kategori: { type: Sequelize.STRING, references: { model: Kategori, key: 'kategori' }, allowNull: false }
}, { timestamps: false });

const PengajuanPenyaluran = sequelize.define('PengajuanPenyaluran', {
  no_pengajuan: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tanggal: { type: Sequelize.DATE, allowNull: false },
  no_mitra: { type: Sequelize.INTEGER, references: { model: Mitra, key: 'no_mitra' }, allowNull: false }
}, { timestamps: false });

const PenyaluranMitra = sequelize.define('PenyaluranMitra', {
  no_transaksi: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tanggal: { type: Sequelize.DATE, allowNull: false },
  jumlah: { type: Sequelize.FLOAT, allowNull: false },
  no_mitra: { type: Sequelize.INTEGER, references: { model: Mitra, key: 'no_mitra' }, allowNull: false },
  no_pengajuan: { type: Sequelize.INTEGER, references: { model: PengajuanPenyaluran, key: 'no_pengajuan' }, allowNull: false },
  kategori: { type: Sequelize.STRING, references: { model: Kategori, key: 'kategori' }, allowNull: false }
}, { timestamps: false });


module.exports = {
  sequelize,
  Muzakki,
  Mustahik,
  Mitra,
  Kategori,
  PenerimaanZakat,
  PenyaluranZakat,
  PengajuanPenyaluran,
  PenyaluranMitra,
  User,
};
