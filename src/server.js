const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');

require('dotenv').config();

const app = express();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/write-diary', require('./routes/writeDiary'));
app.use('/replys', require('./routes/replys'));
app.use('/uprodes', require('./routes/uprodes'));
app.use('/api/auth', authRouter);
app.use('/reactions', require('./routes/reactions'));
app.use('/assets', express.static(path.join(__dirname, './src/assets')));
app.use('/event', require('./routes/eventLog'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`http://localhost:${PORT} 에서 서버 실행 중`);
});

app.get("/", (req, res) => {
    res.send('Hello Node.js');
})

module.exports = pool.promise();