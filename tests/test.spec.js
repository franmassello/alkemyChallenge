"use strict";

var assert = require("assert");
var request = require("supertest");
var app = require("../src/app.js");

var request = request("http://localhost:3000");

let token = "";
let idGet = "";
let idMovie = "";
describe("/register POST", function () {
  it("Endpoint working OK!", function (done) {
    request
      .post("/auth/register")
      .send({
        nombre: "test",
        apellido: "test",
        password: "test",
        email: "test@gmail.com",
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
          return (token = res.body.token);
        }
      });
    return token;
  });
});
describe("/login POST", function () {
  it("Endpoint working OK!", function (done) {
    request
      .post("/auth/login")
      .send({
        email: "test@gmail.com",
        password: "test",
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
          return (token = res.body.token);
        }
      });
    return token;
  });
});

describe("/characters POST", function () {
  it("Endpoint working OK!", function (done) {
    request
      .post("/characters")
      .set("x-access-token", token)
      .send({
        Imagen: "franas",
        Nombre: "fran",
        Edad: 23,
        Peso: 24,
        Historia: "franas",
        Peliculas_asociadas: "test",
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
        }
      });
  });
});
describe("/characters GET", function () {
  it("Endpoint working OK!", function (done) {
    request
      .get("/characters")
      .query({
        name: "fran",
      })
      .set("x-access-token", token)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error", err);
          done(err);
        } else {
          idGet = res.body[0].id;
          done();
        }
      });
  });
});
describe("/characters PUT", function () {
  it("Endpoint working OK!", function (done) {
    request
      .put("/characters")
      .set("x-access-token", token)
      .send({
        id: idGet,
        Imagen: "franas",
        Nombre: "fran",
        Edad: 21,
        Peso: 24,
        Historia: "franas",
        Peliculas_asociadas: "test",
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
        }
      });
  });
});
describe("/characters DELETE", function () {
  it("Endpoint working OK!", function (done) {
    request
      .delete("/characters")
      .set("x-access-token", token)
      .query({
        id: idGet,
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("/movies POST", function () {
  it("Endpoint working OK!", function (done) {
    request
      .post("/movies")
      .set("x-access-token", token)
      .send({
        Imagen: "franas",
        Titulo: "testMovie",
        Fecha_creacion: 2021,
        Calificacion: 4,
        Genero: "test",
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
        }
      });
  });
});
describe("/movies GET", function () {
  it("Endpoint working OK!", function (done) {
    request
      .get("/movies")
      .query({
        name: "testMovie",
      })
      .set("x-access-token", token)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error", err);
          done(err);
        } else {
          idMovie = res.body[0].id;
          done();
        }
      });
  });
});
describe("/movies PUT", function () {
  it("Endpoint working OK!", function (done) {
    request
      .put("/movies")
      .set("x-access-token", token)
      .send({
        id: idMovie,
        Titulo: "testMovie1",
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("/movies DELETE", function () {
  it("Endpoint working OK!", function (done) {
    request
      .delete("/movies")
      .set("x-access-token", token)
      .query({
        id: idMovie,
      })
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) {
          console.log("error");
          done(err);
        } else {
          done();
        }
      });
  });
});
