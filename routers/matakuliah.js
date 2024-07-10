const express = require('express');
const routerMk = express.Router();
const ctrMk = require("../controllers/matakuliah")

routerMk.post('/matakuliah',ctrMk.postMk );
routerMk.get('/matakuliah', ctrMk.getMk);
routerMk.get('/matakuliah/:kdMk', ctrMk.getBykdMk);
routerMk.put('/matakuliah/:kdMk', ctrMk.updateMk);
routerMk.delete('/matakuliah/:kdMk', ctrMk.deleteMk);

module.exports = routerMk