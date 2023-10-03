$(document).ready(function () {
  // Product Listing Page (PLP) logic
  if (window.location.pathname === "/") {
    $.getJSON("http://localhost:3000/api/stockprice", function (data) {
      data.forEach(function (product) {
        var productHtml =
          '<div class="product" data-product-id="' +
          product.id +
          '"><div class="image-container"><img src="' +
          product.image +
          '" alt="' +
          product.brand +
          '"></div>';
        productHtml += "<h3>" + product.brand + "</h3></div>";
        $("#product-list").append(productHtml);
      });
    });
  }

  // Product Detail Page (PDP) logic
  if (window.location.pathname !== "/") {
    $.getJSON("http://localhost:3000/api/stockprice", function (products) {
    var pathParts = window.location.pathname.split("/");
    var productId = pathParts[1].split("-")[0];
    var product = products.find((p) => p.id === parseInt(productId));

    function updateProductDetails() {
      $.getJSON("http://localhost:3000/api/stockprice/" + product.skus[0].code, function (data) {
        $("#product-name").text(product.brand);
        $("#product-information").text(product.information);
        $("#product-desc").html(
          '<li>' + product.style + '</li><li>' + 
          product.substyle + '</li><li>' + 
          product.abv + '</li><li>' + 
          product.origin + '</li>'
        );
        $("#product-image").html(
          '<img src="' + product.image + '" alt="' + product.brand + '">'
        );
        $("#product-price").text("Price: $" + (data.price / 100).toFixed(2));
        $("#product-stock").text("Stock: " + data.stock);
      });
    }

    updateProductDetails();
    setInterval(updateProductDetails, 5000);
  })
  }
});

$(document).on("click", ".product", function () {
  var selectedProductId = $(this).data("product-id");
  var productBrand = $.trim($(this)[0].lastChild.innerText).toLowerCase().replace(/ /g, '');
  // Do something with the selected product ID, e.g., redirect to the detail page
  window.location.href = "/" + selectedProductId + "-" + productBrand; 
});

