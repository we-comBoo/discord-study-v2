const dotenv = require("dotenv");

let path;
switch (process.env.NODE_ENV) {
  case "dev":
    path = `${__dirname}/.env.dev`;
    break;
  case "prod":
    path = `${__dirname}/.env.prod`;
    break;
  default:
    path = `${__dirname}/.env`;
}

console.log(path, `${process.env.NODE_ENV}`);
dotenv.config({ path: path }); // path 설정

const client = require("./client");
