const express = require("express");
const app = express();
const {
  generateInvoiceWithHandlebars,
  generateInvoiceFromString,
  generateInvoicePug,
  generateInvoiceMustache
} = require("./helpers/createTemplate");

app.use(express.json());

const options = {
  format: "A4",
  headerTemplate: "<p></p>",
  footerTemplate: "<p></p>",
  displayHeaderFooter: false,
  margin: {
    top: "40px",
    bottom: "100px",
  },
  printBackground: true,
  path: "invoice.pdf", // remove path property to return PDF instead saving it locally
};

app.post("/create-invoice-handlebars", async (req, res) => {
  const dataBinding = req.body;

  const invoice = await generateInvoiceWithHandlebars({ dataBinding, options });
  res.contentType("application/pdf");
  return res.send(invoice);
});

app.post("/create-invoice-string", async (req, res) => {
  const dataBinding = req.body;

  const invoice = await generateInvoiceFromString({ dataBinding, options });
  res.contentType("application/pdf");
  return res.send(invoice);
});

app.post("/create-invoice-pug", async (req, res) => {
  const dataBinding = req.body;

  const invoice = await generateInvoicePug({ dataBinding, options });
  res.contentType("application/pdf");
  return res.send(invoice);
});

app.post("/create-invoice-mustache", async (req, res) => {
  const dataBinding = req.body;

  const invoice = await generateInvoiceMustache({ dataBinding, options });
  res.contentType("application/pdf");
  return res.send(invoice);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
