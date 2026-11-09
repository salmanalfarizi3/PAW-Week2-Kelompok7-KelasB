const productModel = require('../models/productModel');

const mainController = {
    // 1. Halaman Utama (Home)
    getHome: async (req, res) => {
        try {
            const products = await productModel.getAllProducts();
            res.render('index', { title: 'TanyaBali - Beranda', products });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    // 2. Halaman Referensi / Landing Page
    getLandingPage: (req, res) => {
        res.render('referensi', { title: 'Bedah Jurnal - TanyaBali' });
    },

    // 3. API Status
    getStatusAPI: (req, res) => {
        res.json({ status: 'success', message: 'API TanyaBali aktif' });
    },

    // 4. API Get All Products
    getProductsAPI: async (req, res) => {
        try {
            const products = await productModel.getAllProducts();
            res.json({ status: 'success', data: products });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 5. API Get Product by ID
    getProductByIdAPI: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await productModel.getProductById(id);
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
            }
            res.json({ status: 'success', data: product });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 6. API Create Product (POST)
    createProductAPI: async (req, res) => {
        try {
            const newProduct = req.body;
            const result = await productModel.createProduct(newProduct);
            res.status(201).json({
                status: 'success',
                message: 'Produk berhasil ditambahkan',
                data: result
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 7. API Update Product (PUT)
    updateProductAPI: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const result = await productModel.updateProduct(id, updatedData);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan untuk diupdate' });
            }
            res.json({
                status: 'success',
                message: 'Produk berhasil diperbarui',
                data: result
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },
    // Render Halaman Form Informasi Tiket Wisata
    getInfoTiket: async (req, res) => {
        try {
            const products = await productModel.getAllProducts();
            res.render('tiket-info', { title: 'Informasi Tiket Wisata - TanyaBali', products });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    // 8. API Delete Product (DELETE)
    deleteProductAPI: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await productModel.deleteProduct(id);
            if (!result) {
                return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan untuk dihapus' });
            }
            res.json({
                status: 'success',
                message: 'Produk berhasil dihapus',
                data: result
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
};

module.exports = mainController;