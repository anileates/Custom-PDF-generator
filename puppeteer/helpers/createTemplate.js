const handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const { chromium } = require("playwright");

const generateInvoiceWithPlaywright = async ({ dataBinding }) => {
  // Get template HTML as a string
  const invoiceTemplate = fs.readFileSync(
    path.join(process.cwd(), "/templates/invoice.html"),
    "utf8"
  );

  // Compile the template with data using Handlebars
  const template = handlebars.compile(invoiceTemplate);
  const finalHtml = template(dataBinding);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(finalHtml);
  const pdf = await page.pdf({ path: "invoice2.pdf" });
  
  await browser.close();

  return pdf;
};

const generateInvoice = async ({ dataBinding, options }) => {
  // Get template HTML as a string
  const invoiceTemplate = fs.readFileSync(
    path.join(process.cwd(), "/templates/invoice.html"),
    "utf8"
  );

  // Compile the template with data using Handlebars
  const template = handlebars.compile(invoiceTemplate);
  const finalHtml = template(dataBinding);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });

  // Create a new blank page and set the content with the HTML generated by Handlebars
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`);

  // create PDF
  const pdf = await page.pdf(options);
  await browser.close();
  return pdf;
};

module.exports = { generateInvoice, generateInvoiceWithPlaywright };
