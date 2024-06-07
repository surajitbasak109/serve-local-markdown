#!/usr/bin/env node

const express = require("express");
const path = require("path");
const fs = require("fs");
const { marked } = require("marked");
const expressLayout = require("express-ejs-layouts");

const { getFilesRecursively } = require("./utilities.js");

const app = express();
const port = 3838;

app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/app");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  try {
    const directoryPath = process.cwd();
    const files = getFilesRecursively(directoryPath);

    let fileLinks = files.map((file) => path.relative(directoryPath, file));

    const content = {
      title: "Markdown server",
      files: fileLinks,
    };

    res.render("index", {
      content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/file/:filePath", (req, res) => {
  try {
    const filePath = path.join(process.cwd(), req.params.filePath);

    const baseNameWithoutExt = path.basename(filePath).split('.')[0];

    if (fs.existsSync(filePath) && path.extname(filePath) === ".md") {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const htmlContent = marked.parse(fileContent);
      const content = {
        title: baseNameWithoutExt,
        htmlContent,
        isMarkdownPage: true,
      };

      res.render("display-markdown", {
        content,
      });
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Markdown server is running at http://localhost:${port}`);
});
