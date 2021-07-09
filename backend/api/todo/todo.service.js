let db = require('../../config/connectdb');

module.exports = {
    serviceAddAct: (add_data, callBack) => {
        db.query(
            `insert into kegiatan(aktivitas, waktu, hari)
          values (?,?,?)`,
            [
                add_data.aktivitas,
                add_data.waktu,
                add_data.hari,
            ],
            (error, result, res) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    serviceGetAct: callBack => {
        db.query(`select * from kegiatan`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    // serviceGetActById: (id_kegiatan, callBack) => {
    //     db.query(
    //         `select * from kegiatan where id_kegiatan = ?`,
    //         [id_kegiatan],
    //         (err, resuls, fields) => {
    //             if (err) {
    //                 return callBack(err);
    //             } else {
    //                 return callBack(null, resuls[0]);
    //             }
    //         }
    //     );
    // },
    serviceUpdateAct: (update_data, callBack) => {
        db.query(
            `update kegiatan set aktivitas=?, waktu=?, hari=? where id_kegiatan=?`,
            [

                update_data.aktivitas,
                update_data.waktu,
                update_data.hari,
                update_data.id_kegiatan


            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    serviceDeleteAct: (id_kegiatan, callBack) => {
        db.query(`select * from kegiatan where id_kegiatan=?`,
            [id_kegiatan],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from kegiatan where id_kegiatan=?`,
                        [id_kegiatan])
                    return callBack(null, result[0])
                }
            })
    },
};