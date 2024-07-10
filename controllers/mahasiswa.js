const connection =  require("../db/db")

module.exports = {
    getMhs:(req, res) => {
        connection.query("SELECT * FROM mahasiswa", (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengambil data mahasiswa"
                });
            } else {
                res.send(data);
            }
        });
    },

    getBynim:(req, res) => {
        const nim = req.params.nim;
        connection.query(`SELECT * FROM mahasiswa WHERE nim = '${nim}'`, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengambil data mahasiswa"
                });
            } else {
                res.send(data);
            }
        });
    },

    postMhs:(req, res) => {
        const mahasiswaBaru = req.body;
        connection.query("INSERT INTO mahasiswa SET ?", mahasiswaBaru, (err) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat menyimpan data mahasiswa"
                });
            } else {
                res.send(mahasiswaBaru);
            }
        });
    },

    updateMhs:(req, res) => {
        const nim = req.params.nim;
        const mhs = req.body;
        const qstring = `UPDATE mahasiswa
                        SET nama = '${mhs.nama}', angkatan = '${mhs.angkatan}', prodi = '${mhs.prodi}'
                        WHERE nim = '${nim}'`;
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error update mahasiswa with NIM" + nim
                });
            } else if (data.affectedRows === 0) {
                res.status(404).send({
                    message: `Mahasiswa dengan NIM ${nim} tidak ditemukan.`
                });
            } else {
                console.log("Update mahasiswa: ", { nim: nim, ...mhs });
                res.send({ nim: nim, ...mhs });
            }
        });
    },

    deleteMhs:(req, res) => {
        const nim = req.params.nim;
        const qstring = `DELETE FROM mahasiswa WHERE nim = '${nim}'`;
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting mahasiswa with NIM: " + nim
                });
            } else if (data.affectedRows === 0) {
                res.status(404).send({
                    message: `Mahasiswa dengan NIM ${nim} tidak ditemukan.`
                });
            } else {
                res.send(`Mahasiswa dengan NIM ${nim} telah terhapus`);
            }
        });
    },
}