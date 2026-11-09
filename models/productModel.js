const db = require('../config/database'); // sesuaikan path file koneksi database-mu

const productModel = {
    // Read All
    getAllProducts: async () => {
        const result = await db.query('SELECT * FROM produk'); // pastikan nama tabel di pgAdmin benar ('produk' atau 'products')
        return result.rows;
    },

    // Read by ID
    getProductById: async (id) => {
        const result = await db.query('SELECT * FROM produk WHERE id = $1', [id]);
        return result.rows;
    },

    // Create
    createProduct: async (data) => {
        // Sesuaikan kolom tabel dengan data yang dikirim (contoh: nama, deskripsi, harga)
        const { nama, deskripsi, harga } = data;
        const query = 'INSERT INTO produk (nama, deskripsi, harga) VALUES ($1, $2, $3) RETURNING *';
        const values = [nama, deskripsi, harga];
        const result = await db.query(query, values);
        return result.rows[0]; // mengembalikan baris data yang baru dibuat
    },

    // Update
    updateProduct: async (id, data) => {
        const { nama, deskripsi, harga } = data;
        const query = 'UPDATE produk SET nama = $1, deskripsi = $2, harga = $3 WHERE id = $4 RETURNING *';
        const values = [nama, deskripsi, harga, id];
        const result = await db.query(query, values);
        return result;
    },

    // Delete
    deleteProduct: async (id) => {
        const result = await db.query('DELETE FROM produk WHERE id = $1', [id]);
        return result;
    }
};

module.exports = productModel;