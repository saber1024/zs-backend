const handler = require("express-async-handler");
const ytdl = require("ytdl-core");
const getVideoInfo = handler(async (req, res) => {
  const url = decodeURIComponent(req.body.url);

  const info = await ytdl.getInfo(url);

  const formats = info.formats.filter((x) => {
    return x.container === "mp4";
  });

  res.json({
    url: url,
    format: formats,
    code: 0,
  });
});

module.exports = getVideoInfo;
