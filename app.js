const express = require("express");
const router = require("./router/DownloadRouter");
const app = express();

const { errorHandler, notFound } = require("./middleware/errormiddleware");

app.use(express.json());

app.use("/api/downloader", router);

app.listen(8080, () => {
  console.log("running");
});

app.use(errorHandler);
app.use(notFound);
