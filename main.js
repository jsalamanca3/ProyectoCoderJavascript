const products = [
  {
    name: "Zapato",
    price: 1600,
    stock: 6,
  },
  {
    name: "Medias",
    price: 1200,
    stock: 10,
  },
  {
    name: "Tenis",
    price: 5000,
    stock: 3,
  },
  {
    name: "Pantalón",
    price: 400,
    stock: 15,
  },
];

function checkProduct(name) {
  const product = products.find((p) => p.name.toUpperCase() === name);
  if (!product) {
    return "No contamos con ese producto";
  }
  const message = [
    "Contamos con el producto",
    product.name,
    "a un precio de",
    product.price + "$",
  ];
  if (product.price <= 1500) {
    message.push("(con descuento)");
  }
  if (product.stock > 0) {
    message.push("y tenemos " + product.stock + " unidades en stock");
  } else {
    message.push("y no tenemos más unidades en stock");
  }
  return message.join(" ");
}

let productName = prompt(
  "Productos en Stock: Zapato, Tenis, Pantalón, Medias. Si desea finalizar la compra escriba salir."
)
  .trim()
  .toUpperCase();

while (productName !== "SALIR") {
  alert(checkProduct(productName));
  productName = prompt(
    "Productos en Stock: Zapato, Tenis, Pantalón, Medias. Si desea finalizar la compra escriba salir."
  )
    .trim()
    .toUpperCase();
}

