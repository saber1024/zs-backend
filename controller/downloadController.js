const handler = require("express-async-handler");
const ytdl = require("ytdl-core");
const getVideoInfo = handler(async (req, res) => {
  const url = decodeURIComponent(req.body.url);

  const info = await ytdl.getInfo(url);
  if (info.formats.length > 0) {
    const formats = info.formats.filter((x) => {
      console.log(x.container);
      return x.container === "mp4";
    });

    if (formats.length > 0) {
      const uniqueById = uniqByProp("qualityLabel");
      const uniqueArr = uniqueById(formats);

      res.json({
        url: url,
        format: uniqueArr,
        code: 0,
      });
    } else {
      res.json({
        code: 0,
        format: info.formats,
        url: url,
      });
    }
  } else {
    res.json({
      code: 0,
      format: [],
      url: url,
    });
  }
});

const uniqByProp = (prop) => (arr) =>
  Object.values(
    arr.reduce(
      (acc, item) => (item && item[prop] && (acc[item[prop]] = item), acc), // using object mutation (faster)
      {}
    )
  );

module.exports = getVideoInfo;
