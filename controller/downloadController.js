const handler = require("express-async-handler");
const ytdl = require("ytdl-core");
const getVideoInfo = handler(async (req, res) => {
  const url = decodeURIComponent(req.body.url);

  const info = await ytdl.getInfo(url);

  const formats = info.formats.filter((x) => {
    return x.container === "mp4";
  });

  var uniqueArr = [];

  if (!formats.length === 0) {
    uniqueArr = formats.reduce((acc, current) => {
      const x = acc.find((item) => item.qualityLabel === current.qualityLabel);
      if (!x) {
        if (current.qualityLabel !== null) {
          return acc.concat([current]);
        }
      } else {
        return acc;
      }
    }, []);

    res.json({
      url: url,
      format: uniqueArr,
      code: 0,
    });
  } else {
    res.json({
      code: 0,
      format: [],
      url: url,
    });
  }
});

module.exports = getVideoInfo;
