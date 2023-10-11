const handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { getTemplate } = require("../templates/getTemplate");
const mustache = require("mustache");
const pug = require("pug");
let now = require("performance-now");

const { createSSRApp } = require( "vue")
const { renderToString } = require('vue/server-renderer')
const Vue = require('vue');


const generateInvoiceWithHandlebars = async ({ dataBinding, options }) => {
  let start = now();

  // Get template HTML as a string -- Her template engine icin fs ile okunacaktir
  const invoiceTemplate = fs.readFileSync(
    path.join(process.cwd(), "/templates/invoice.html"),
    "utf8"
  );

  // Compile the template with data using Handlebars
  const template = handlebars.compile(invoiceTemplate);
  const finalHtml = template(dataBinding);

  console.log(
    `Time to compile the template with Handlebars: ${now() - start} ms`
  );

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });

  let start2 = now();
  // Create a new blank page and set the content with the HTML generated by Handlebars
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`);

  // create PDF
  const pdf = await page.pdf(options);
  console.log(`Time to generate the PDF: ${now() - start2} ms`);

  await browser.close();
  return pdf;
};

const generateInvoiceFromString = async ({ dataBinding, options }) => {
  const { customerName, amount } = dataBinding;
  let start = now();

  // String concatination ile HTML olusturulur
  let invoiceTemplate = getTemplate(customerName, amount);

  console.log(
    `Time to compile the template with template/string literal ${
      now() - start
    } ms`
  );

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });

  let start2 = now();
  // Create a new blank page and set the content with the HTML generated by Handlebars
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${invoiceTemplate}`);
  console.log(`Time to generate the PDF: ${now() - start2} ms`);

  // create PDF
  const pdf = await page.pdf(options);
  await browser.close();
  return pdf;
};

const generateInvoicePug = async ({ dataBinding, options }) => {
  const { customerName, amount } = dataBinding;
  let start = now();

  const invoiceTemplate = fs.readFileSync(
    path.join(process.cwd(), "/templates/invoice.pug"),
    "utf8"
  );

  let finalHtml = pug.render(invoiceTemplate, {
    customerName,
    amount,
  });

  console.log(`Time to compile the Pug template ${now() - start} ms`);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });

  let start2 = now();
  // Create a new blank page and set the content with the HTML generated by Handlebars
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`);

  // create PDF
  const pdf = await page.pdf(options);
  console.log(`Time to generate the PDF: ${now() - start2} ms`);

  await browser.close();
  return pdf;
};

const generateInvoiceMustache = async ({ dataBinding, options }) => {
  const { customerName, amount } = dataBinding;
  let start = now();

  const invoiceTemplate = fs.readFileSync(
    path.join(process.cwd(), "/templates/invoice.mustache"),
    "utf8"
  );

  let finalHtml = mustache.render(invoiceTemplate, {
    customerName,
    amount,
  });

  console.log(`Time to compile the Mustache template ${now() - start} ms`);

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

const generateInvoiceVue = async ({ dataBinding, options }) => {
  const { customerName, amount } = dataBinding;
  let start = now();

  const invoiceTemplate = fs.readFileSync(
    path.join(process.cwd(), "/templates/invoice.html"),
    "utf8"
  );

  const app = createSSRApp({
    data: () => ({ customerName, amount }),
    template: invoiceTemplate
  })

  const finalHtml = await renderToString(app)
  console.log(`Time to compile the Vue template ${now() - start} ms`);

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

module.exports = {
  generateInvoiceWithHandlebars,
  generateInvoiceFromString,
  generateInvoicePug,
  generateInvoiceMustache,
  generateInvoiceVue
};
