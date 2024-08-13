// orderTemplate.js
function generateOrderHTML(order) {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }

          .container {
              max-width: 600px;
              margin: 20px auto;
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
              font-size: 24px;
              margin-bottom: 20px;
          }

          p {
              margin: 5px 0;
          }

          .order-details,
          .delivery-info,
          .contact-info {
              margin-bottom: 20px;
          }

          .product {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
          }

          .product img {
              max-width: 100px;
              border-radius: 4px;
              margin-right: 10px;
          }

          .product-info {
              flex-grow: 1;
          }

          .product-title {
              font-size: 16px;
              font-weight: bold;
          }

          .product-quantity,
          .product-price {
              font-size: 14px;
          }

          .total {
              font-size: 18px;
              font-weight: bold;
              text-align: right;
          }

          .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #888;
          }
      </style>
  </head>

  <body>
      <div class="container">
          <h1>Order Confirmation</h1>
          <p>Thank you for your order! Here are the details:</p>

          <div class="order-details">
              <h2>Order ID: ${order._id}</h2>
              ${order.products
                .map(
                  (product) => `
                <div class="product">
                    <img src="${product.productId.imageUrl}" alt="${
                    product.productId.title
                  }">
                    <div class="product-info">
                        <p class="product-title">${product.productId.title}</p>
                        <p class="product-quantity">Quantity: ${
                          product.quantity
                        }</p>
                    </div>
                    <p class="product-price">₹${(
                      product.productId.price * 84
                    ).toFixed(2)}</p>
                </div>
              `
                )
                .join("")}
              <p class="total">Total Amount: ₹${order.amount.toFixed(2)}</p>
          </div>

          <div class="delivery-info">
              <h3>Delivery Information</h3>
              <p><strong>Address:</strong> ${order.address}</p>
              <p><strong>Estimated Delivery Date:</strong> ${
                order.deliveryDate
              }</p>
          </div>

          <div class="footer">
              <p>If you have any questions, feel free to contact our support team.</p>
              <p>Thank you for shopping with us!</p>
          </div>
      </div>
  </body>

  </html>
  `;
}

module.exports = generateOrderHTML;
