let {
    serviceAddAct,
    serviceGetAct,
    // serviceGetActById,
    serviceUpdateAct,
    serviceDeleteAct
} = require("./todo.service");

module.exports = {
    controllerAddAct: (req, res) => {
        let add_data = {
            aktivitas: req.body.aktivitas,
            waktu: req.body.waktu,
            hari: req.body.hari
        };
        serviceAddAct(add_data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    succes: 0,
                    message: "database connection error"
                });
            }
            return res.json({
                results: results
            })

        });
    },
    // controllerGetActById: (req, res) => {
    //     let id_kegiatan = req.params.id;
    //     serviceGetActById(id_kegiatan, (err, results) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         if (!results) {
    //             return res.json({
    //                 succes: 0,
    //                 message: "Record not found"
    //             });
    //         }
    //         return res.json({
    //             succes: 1,
    //             data: results
    //         });
    //     });
    // },
    controllerGetAct: (req, res) => {
        serviceGetAct((err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            return res.send(results)
        });
    },
    controllerUpdateAct: (req, res) => {
        let update_data = {

            aktivitas: req.body.aktivitas,
            waktu: req.body.waktu,
            hari: req.body.hari,
            id_kegiatan: req.body.id_kegiatan


        }
        serviceUpdateAct(update_data, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "update failed"
                });
            } else {
                return res.json({
                    succes: 1,
                    message: "update kegiatan"
                });
            }
        });
    },
    controllerDeleteAct: (req, res) => {
        let data = req.params.id_kegiatan
        serviceDeleteAct(data, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "data tidak di temukan"
                });
            }
            return res.json({
                succes: 1,
                message: "kegiatan telah di hapus"
            });
        });
    }
};