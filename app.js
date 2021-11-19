/* import methodOverride from "method-override";
import cors from "cors";
import express from "express"; */
const methodOverride = require("method-override");
const cors = require("cors");
const express = require("express");
//
const app = express();

let port = process.env.PORT || 3000;

let users = ["bart", "lisa", "homero", "marge"];

app.use(cors()); // permite conectar con servidores distintas
app.use(methodOverride());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/users", (req, res) => {
   res.send(users);
});

app.post("/user/create/", (req, res) => {
   users.push(req.body.nombre);
   res.send("usuario creado");
});

app.delete("/user/delete/:nombre", (req, res) => {
   users.filter(el => el != req.params.nombre)
   res.send("usuario borrado");
});
app.put("/user/modify/:nombre/:nombre2", (req, res) => {
   users = users.map(el => (req.params.nombre === el) ? req.params.nombre2 : el)
   res.send("usuario ha sido modificado");
})

app.listen(port, () => {
   log("start server");
});

