const express = require('express');
const path = require('path');
const logger = require('./middlewares/loggerMiddleware');
const webRoutes = require('./routes/web');
const db = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);

app.use('/', webRoutes);

app.listen(PORT, () => {
    console.log(`Server berhasil dijalankan di http://localhost:${PORT}`);
});