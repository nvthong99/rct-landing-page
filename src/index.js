const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/router");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
