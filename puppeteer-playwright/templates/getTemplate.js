const getTemplate = (customerName, amount) => {
    return `<html>
    <head>
        <meta charset="UTF-8">
        <title>Invoice</title>
    </head>
    <body>
        <h1>Invoice</h1>
        <p>Customer Name: ${customerName}</p>
        <p>Total Amount: ${ amount }</p>
    </body>
    </html>
    
    <style>
    p {
        background-color: red;
    }
    </style>`;
}

module.exports = {
    getTemplate
}