const connection =  require("../db/db")

module.exports = {
    getMk:(req, res) => {
        connection.query('SELECT * FROM matakuliah', (error, result) => {
            if (error) {
                console.log("error: ", error);
                res.status(500).send({
                    message: error.message || "Terjadi kesalahan saat mengambil data matakuliah"
                });
            } else {
                res.json(result);
            }
        });
    },

    getBykdMk:(req, res) => {
        const kdMk = req.params.kdMk;
        connection.query(`SELECT * FROM matakuliah WHERE kdMk = '${kdMk}'`, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengambil data matakuliah"
                });
            } else {
                res.send(data);
            }
        });
    },

    postMk:(req, res) => {
        const mataKuliah = req.body;
        connection.query("INSERT INTO matakuliah SET ?", mataKuliah, (err) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat menyimpan data matakuliah"
                });
            } else {
                res.send(mataKuliah);
            }
        });
    },

    updateMk:(req, res) => {
        const kdMk = req.params.kdMk;
        const mk = req.body;
        const qstring = `UPDATE matakuliah
                        SET matakuliah = '${mk.matakuliah}', sks = '${mk.sks}', semester = '${mk.semester}'
                        WHERE kdMk = '${kdMk}'`;
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error update matakuliah with kdMk" + kdMk
                });
            } else if (data.affectedRows === 0) {
                res.status(404).send({
                    message: `matakuliah dengan kdMk ${kdMk} tidak ditemukan.`
                });
            } else {
                console.log("Update matakuliah: ", { kdMk: kdMk, ...mk });
                res.send({ kdMk: kdMk, ...mk });
            }
        });
    },

    deleteMk:(req, res) => {
        const kdMk = req.params.kdMk;
        const qstring = `DELETE FROM matakuliah WHERE kdMk = '${kdMk}'`;
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting matakuliah with kdMk: " + kdMk
                });
            } else if (data.affectedRows === 0) {
                res.status(404).send({
                    message: `matakuliah dengan kdMk ${kdMk} tidak ditemukan.`
                });
            } else {
                res.send(`matakuliah dengan kdMk ${kdMk} telah terhapus`);
            }
        });
    },
}