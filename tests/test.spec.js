"use strict";

var assert = require("assert");
var request = require("supertest");
var app = require("../src/app.js");

var request = request("http://localhost:3000");

let token = "";
let id = "";
describe("/register POST", function () {
  it("Should return json as default data format", function (done) {
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
  it("Should return json as default data format", function (done) {
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
  it("Should return json as default data format", function (done) {
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
    it("Should return json as default data format", function (done) {
      request
        .get("/characters")
        .send({
          name: "fran",
        })
        .set("x-access-token", token)
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            console.log("error", err);
            done(err);
          } else {
              console.log(res.body)
            //id = res.body.id;
            done();
          }
        });
    });
  });
describe("/characters PUT", function () {
    it("Should return json as default data format", function (done) {
        console.log('id', id)
      request
        .put("/characters")
        .set("x-access-token", token)
        .send({
          id: id,
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