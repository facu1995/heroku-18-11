import express from 'express';
import methodOverride from "method-override";
import cors from "cors";
import axios from "axios";

const server = express();
const port = 3001;
const log = console.log;

server.use(cors()); // permite conectar con servidores distintas
server.use(methodOverride());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

let users = [

    { "email": "foo@foo.com", "name": "foo", "pass": "foo123" },
    { "email": "bar@bar.com", "name": "bar", "pass": "bar123" },
    { "email": "qux@qux.com", "name": "qux", "pass": "qux123" },
];


server.listen(port, () => {
    log("start server http://localhost:" + port);
});

server.get("/users", (req, res) => {
    res.send(users);
});

server.get("/data", (req, res) => {
    if (users.length == 0) {
        axios
            .get('https://devplace.free.beeceptor.com/users')
            .then(function (response) {
                let data = Object(response.data);
                log(typeof data);
                log(data);
                let preuba = { "email": "qux@qux.com", "name": "qux", "pass": "qux123" };
                log(preuba);
                log(typeof preuba);
            })
            .catch(function (error) {
                console.log(error);
            });
        res.send("Se inicializo los usuarios");
    }
    else {
        res.send("Ya exisitan usuarios");
    }
})
server.get("/reset", (req, res) => {
    users = [];
})

server.get("/user/unmail/:email", (req, res) => {
    console.log(req.params.email);
    res.send(users.filter(el => el.email == req.params.email));
});
/* http://localhost:3000/user/["foo@foo.com","bar@bar.com"] */
server.get("/usersEmail/:email", (req, res) => {
    let email = req.params.email;
    let arrayEmail = email.split(",");
    let resp = [];
    arrayEmail.forEach((email) => {
        users.forEach((user) => {
            if (user.email == email) {
                resp.push(user)
            }
        })
    })
    res.send(resp);
})


server.get("/user/name/", (req, res) => {
    res.send(users.filter(el => (el.name === req.query.name)
    ))
});

server.post("/user", (req, res) => {
    users.push(
        { email: req.body.email, name: req.body.nombre, pass: req.body.pass }
    );
    res.send("usuario creado");
});



server.delete("/user/borrarUno/:email", (req, res) => {
    users = users.filter(el => el.email != req.params.email);
    res.send("usuario borrado");
});
/* /user/foo@foo.com,bar@bar.com */


/* "foo@foo.com","bar@bar.com" */
server.delete("/user/borrarVarios/", (req, res) => {
    let arrayEmail = req.query.email;
    arrayEmail.forEach(email => {
        users = users.filter((elemento) => elemento.email != email)
})
res.send("Se eliminaron todos los usuarios con ese mail");
});


server.put("/user/cambiar/", (req, res) => {
    users = forEach((user, i) => {
        if (user.email == req.body.email) {
            users[i].email = req.body.nuevoEmail;
        }
    })
    res.send("usuario ha sido modificado");
})
