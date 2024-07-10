const express = require('express');
const routerMhs = require('./routers/mahasiswa')
const routerMk = require('./routers/matakuliah')
const routerNilai = require('./routers/nilai')
const app = express();
const port = 5000;

// Untuk menerima req.body
app.use(express.json());
app.use(routerMhs)
app.use(routerMk)
app.use(routerNilai)
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});