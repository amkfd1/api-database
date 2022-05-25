const http = require('http');
const app = require('./index');
const express = require("express");
const port = process.env.PORT || 3030;
const multer = require('multer');

const server = http.createServer(app);
app.use(multer);


server.listen(port);
console.log("Sever up and running");