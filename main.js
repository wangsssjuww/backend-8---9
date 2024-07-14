const express = require('express');
const app = express();
const session = require('express-session');
const port = 5000;
const mysql = require('mysql2')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'server'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

const authenticate = (req, res, next) => {
    if (req?.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send('Tidak Terautentikasi'); 
    }
}

app.post('/register', (req,res) => {
    const {username, password } = req.body;
    connection.query(`INSERT INTO user VALUES ('${username}', PASSWORD('${password}'))`,
        (error, results ) => {
            if (error) throw error;
            res.json({ message: 'Data berhasil ditambahkan', id:results.insertId});
        });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    connection.promise().query(`SELECT * FROM user WHERE username = '${username}' AND password = PASSWORD('${password}')`)
    
    .then((results) => {
        if (results.length > 0) {
            req.session.isAuthenticated = true;
            res.json({ message: 'Berhasil login' });
        } else {
            res.status(401).send('Username atau password salah')
        }
    })
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => { 
        if (err) {
            console.log(err);
            res.status(500).send('Logout gagal');
        } else {
            res.send('Logout sukses');
        }
    });
});

app.get('/open', (req, res) => {
    res.send('Anda masuk pda route tidak terproteksi')
});

app.get('/protected', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (GET)');
});

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.post('/protected', authenticate, (req, res) => {
    res.send('Route terproteksi (POST)');
});

app.put('/protected', authenticate, (req, res) => {
    res.send('Route terproteksi (PUT)')
})

app.delete('/protected', authenticate, (req, res) => {
    res.send('Route terproteksi (DELETE)')
})

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});