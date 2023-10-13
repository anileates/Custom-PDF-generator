    <div>
      <h1>Invoice</h1>
      <p>Customer Name: {{ customerName }}</p>
      <p>Total Amount: {{ amount }}</p>
      <ul>
        <li v-for="productId in products" :key="productId">Product ID: {{ productId }}</li>
      </ul>
    </div>
  
  <style>
  p {
    background-color: red;
  }
  </style>
  