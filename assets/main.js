const savedWords = localStorage.getItem("words");
const words = savedWords ? JSON.parse(savedWords): [
      {
        id: 1,
        name: "manzana",
        price: 1200,
        stock: 20,
        img: "imagenes.manzana.jpg",
      },
      {
        id: 2,
        name: "pera",
        price: 800,
        stock: 15,
        img: "imgenes/pera.jpg",
      },
      {
        id: 3,
        name: "mango",
        price: 1500,
        stock: 30,
        img: "imgenes/mango.jpg",
      },
      {
        id: 4,
        name: "mandarina",
        price: 900,
        stock: 50,
        img: "imgenes/mandarina.jpg",
      },
      {
        id: 5,
        name: "naranja",
        price: 900,
        stock: 50,
        img: "imgenes/naranja.jpg",
      },
    ];

class Fruta {
  constructor(id, name, price, stock, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.img = img;
    Fruta.guardarFrutas();
  }
  static guardarFrutas() {
    localStorage.setItem("words", JSON.stringify(words));
  }
}

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

//pintar productos
const products = ({ id, name, price, stock, img }, index) => {
  const cajaCard = document.querySelector("#cajaCard");
  const card = document.createElement("div");
  card.id = `card${index}`;
  card.className = "card";
  card.innerHTML = `
                    <img src="${img}" alt="">
                    <div class="cardProduct">
                        <h3>${name}</h3>
                        <span><b>Precio:</b> ${price}$ <b>Stock:</b> ${stock}</span>
                    </div>
                    <form id="formCarrito${id}">
                    <input name="id" type="hidden" value="${id}">
                    <input name="cantidad" type="number" value="1" min="1" max="${stock}">
                    <button type="submit" id="btnContador${id}" onclick="(ev)=> {addButton}">Agregar al carrito</button>
                    </form>
    `;
  cajaCard.append(card);
};

//añadir al carrito
const addCarrito = (id) => {
  const formCarrito = document.querySelector("#formCarrito" + id);
  formCarrito.addEventListener("submit", (e) => {
    e.preventDefault();
    const cantidad = e.target.children["cantidad"].value;
    carrito.push({
      id,
      cantidad,
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
};

//ver productos
const verProductos = () => {
  words.forEach((producto, index) => {
    if (producto.stock !== 0) {
      products(producto, index);
      addCarrito(producto.id);
    }
  });
};

verProductos();

//añadir nueva fruta
const addBtn = document.querySelector("#btnAdd");
addBtn.addEventListener("click", function () {
  alert('"Ohh!" Vas agregar un nuevo producto!');
  addFruit();
});

const addFruit = () => {
  const fruit = new Fruta(
    Number(prompt("Ingrese el id")),
    prompt("Ingrese el nombre de una fruta").toLowerCase(),
    Number(prompt("Ingrese el valor por unidad de la fruta")),
    Number(prompt("Ingrese la cantidad de frutas")),
    prompt("Ingrese la URL de la imagen").toLowerCase()
  );
  words.push(fruit);
  Fruta.guardarFrutas();

  const index = words.length - 1;
  products(fruit, index);
  addCarrito(fruit.id);
};

//actualizar fruta

const actualizarFruta = (name) => {
  const index = words.findIndex((word) => word.name === name);
  if (index !== -1) {
    const newId = Number(prompt("Ingrese el nuevo id de la fruta"));
    const newName = prompt("Ingrese el nuevo nombre de la fruta").toLowerCase();
    const newPrice = Number(prompt("Ingrese el nuevo precio de la fruta"));
    const newStock = Number(prompt("Ingrese la nueva cantidad de la fruta"));
    const newImg = prompt("Ingrese la nueva URL de la fruta").toLowerCase();

    words[index].id = newId;
    words[index].name = newName;
    words[index].price = newPrice;
    words[index].stock = newStock;
    words[index].img = newImg;
    Fruta.guardarFrutas();

    const cardElement = document.querySelector(`#card${index}`);
    if (cardElement) {
      cardElement.querySelector("h3").textContent = newName;
      cardElement.querySelector(
        ".cardProduct span"
      ).innerHTML = `<b>Precio:</b> ${newPrice}$ <b>Stock:</b> ${newStock}`;
    }
  }
};

const actBtn = document.querySelector("#btnAct");
actBtn.addEventListener("click", function () {
  alert('"Ohh!" Vas actualizar un producto');
  const name = prompt(
    "Ingrese el nombre de la fruta a actualizar"
  ).toLowerCase();
  actualizarFruta(name);
});

//borrar fruta
const btndelete = document.querySelector("#btnDel");
btndelete.addEventListener("click", function () {
  alert('"Ohh!" Vas a eliminar un producto!');
});

const deleteFruit = (name) => {
  const index = words.findIndex((word) => word.name === name);
  if (index !== -1) {
    words.splice(index, 1);
    Fruta.guardarFrutas();
    alert("El producto ha sido eliminado satisfactoriamente");
    const cardElement = document.querySelector(`#card${index}`);
    if (cardElement) {
      cardElement.remove();
    }
  } else {
    alert("Producto no encontrado");
  }
};

btndelete.addEventListener("click", function () {
  const name = prompt("Ingrese el nombre de la fruta a eliminar").toLowerCase();
  deleteFruit(name);
});

//contador carrito
const btnElement = document.getElementById("btnContador${id}");
const spanElement = document.getElementById("spanContador");
let contador = 0;

function addButton(ev) {
  const detail =ev.detail;
  contador++;
  spanElement.textContent = contador;
};
