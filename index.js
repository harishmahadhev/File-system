import { readdirSync } from "fs";
import express from "express";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const dir_name = process.env.DIRECTORY_NAME || "/";

app.use(express.json());
app.get("/", (req, res) => {
  const files = readdirSync(dir_name);
  res.write(`<html><head>`);
  res.write(`<style>*{ background-color: #fdf4ed }</style>`);
  res.write(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" /> `);
  res.write(`</head><body>`);
  res.write(`<h1> Files in your Directory </h1>`);
  files.forEach((file) => {
    if (path.extname(file) === "") {
      res.write(
        `<h3> <i class="fa fa-folder" aria-hidden="true"></i> ${file}</h3>`
      );
    } else if (path.extname(file) === ".sys") {
      res.write(
        `<h3> <i class="fa fa-file-o" aria-hidden="true"></i> ${file}</h3>`
      );
    } else if (
      path.extname(file) === ".png" ||
      path.extname(file) === ".jpg" ||
      path.extname(file) === ".jpeg"
    ) {
      res.write(
        `<h3><i class="fa fa-file-image-o" aria-hidden="true"></i> ${file}</h3>`
      );
    } else if (path.extname(file) === ".pdf") {
      res.write(
        `<h3><i class="fa fa-file-pdf-o" aria-hidden="true"></i> ${file}</h3>`
      );
    } else {
      res.write(
        `<h3><i class="fa fa-file-text-o" aria-hidden="true"></i> ${file}</h3>`
      );
    }
  });
  res.end(`</body></html>`);
});

app.listen(port, () => console.log(`Server started at ${port}`));
