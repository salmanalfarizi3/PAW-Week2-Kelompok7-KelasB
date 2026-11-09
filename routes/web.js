const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Halaman Web Utama & Referensi
router.get('/', mainController.getHome);
router.get('/referensi', mainController.getLandingPage);

// API Status & Read All
router.get('/api/status', mainController.getStatusAPI);
router.get('/api/produk', mainController.getProductsAPI);

// --- TAMBAHAN ENDPOINT CRUD LENGKAP ---
router.get('/api/produk/:id', mainController.getProductByIdAPI);    // Read by ID
router.post('/api/produk', mainController.createProductAPI);        // Create
router.put('/api/produk/:id', mainController.updateProductAPI);     // Update
router.delete('/api/produk/:id', mainController.deleteProductAPI);  // Delete
// Halaman Form Informasi Tiket Wisata
router.get('/info-tiket', mainController.getInfoTiket);

module.exports = router;