let {
    controllerAddAct,
    controllerDeleteAct,
    controllerUpdateAct,
    controllerGetAct
    // controllerGetActById
} = require("./todo.control")
let route = require('express').Router();

route.post("/tambah", controllerAddAct);
route.get("/ambil", controllerGetAct);
// route.get("/:id", controllerGetActById);
route.patch("/edit", controllerUpdateAct);
route.delete("/hapus/:id_kegiatan", controllerDeleteAct);

module.exports = route;