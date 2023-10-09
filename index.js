const express = require("express");
const app = express();
const generateInvoice = require("./helpers/createTemplate");

app.use(express.json());

app.post("/create-invoice", async (req, res) => {
  const dataBinding = req.body;

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

  const invoice = await generateInvoice({ dataBinding, options });
  res.contentType("application/pdf");
  return res.send(invoice);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
