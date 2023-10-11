const puppeteer = require("puppeteer");

let browserInstance = null;

const getBrowser = async () => {
  if (browserInstance) {
    return browserInstance;
  }

  browserInstance = await puppeteer.launch({
    args: ["--no-sandbox"],
  });

  return browserInstance;
};

module.exports = getBrowser;
