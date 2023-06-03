const words = [
    {
      id: 1,
      name: "manzana",
      price: 1200,
      stock: 20,
      img: "/Img/manzana.jpg",
    },
    {
      id: 2,
      name: "pera",
      price: 800,
      stock: 15,
      img: "/Img/pera.jpg",
    },
    {
      id: 3,
      name: "mango",
      price: 1500,
      stock: 30,
      img: "/Img/mango.jpg",
    },
    {
      id: 4,
      name: "mandarina",
      price: 900,
      stock: 50,
      img: "/Img/mandarina.jpg",
    },
    {
      id: 5,
      name: "naranja",
      price: 900,
      stock: 50,
      img: "/Img/naranja.jpg",
    },
  ];
  
  class Fruta {
    constructor(id, name, price, stock, img) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.stock = stock;
      this.img = img;
    }
  }
  
  const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
  
  //pintar productos
  const products = ({ id, name, price, stock, img }) => {
    const cajaCard = document.querySelector("#cajaCard");
    const card = document.createElement("div");
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
                      <button type="submit" id="btnContador">Agregar al carrito</button>
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
    words.forEach((producto) => {
      if (producto.stock != 0) {
        products(producto);
        addCarrito(producto.id);
      }
    });
  };
  verProductos();
  
  //añadir nueva fruta
  const addBtn = (document.querySelector("#btnAdd").onclick = function () {
    alert('"Ohh!" Button clicked!');
    const addFruit = () => {
      const fruit = new Fruta(
        Number(prompt("ingrese el id")),
        prompt("Ingrese nombre de una fruta").toLocaleLowerCase(),
        Number(prompt("Ingrese el valor por unidad de la fruta")),
        Number(prompt("Ingrese la cantidad de frutas")),
        prompt("Ingrese la url de la imagen").toLocaleLowerCase()
      );
      words.push(fruit);
    };
  });
  
  //actualizar fruta
  
  const actualizarFruta = (name) => {
    const index = words.findIndex((word) => word.name === name);
    if (index !== -1) {
      const newId = Number(
        prompt("Ingrese el id de la fruta a actualizar").toLocaleLowerCase()
      );
      const newName = prompt(
        "Ingrese el nombre de la fruta a actualizar"
      ).toLocaleLowerCase();
      const newPrice = Number(
        prompt("Ingrese el precio de la fruta a actualizar").toLocaleLowerCase()
      );
      const newStock = Number(
        prompt("Ingrese la cantidad de la fruta a actualizar").toLocaleLowerCase()
      );
      const newImg = prompt(
        "Ingrese la url de la fruta a actualizar"
      ).toLocaleLowerCase();
      words[index] = {
        id: newId,
        name: newName,
        price: newPrice,
        stock: newStock,
        img: newImg,
      };
    }
  };
  
  const actBtn = (document.querySelector("#btnAct").onclick = function () {
    alert('"Ohh!" Button clicked!');
    const actualizarFruta = () => {
      const name = prompt(
        "Ingrese el nombre de la fruta a actualizar"
      ).toLowerCase();
      actualizarFruta(name);
    };
  });
  
  //borrar fruta
  const btndelete = (document.querySelector("#btnDel").onclick = function () {
    alert('"Ohh!" Button clicked!');
    const deleteFruit = (name) => {
      const index = words.findIndex((word) => word.name === name);
      if (index !== -1) {
        words.splice(index, 1);
        alert("El producto sea eliminado satisfactoriamente");
      } else {
        alert("Producto no encontrado");
      }
    };
  });
  
  //contador carrito
  
    const btnElement = document.getElementById("#btnContador");
    const spanElement = document.getElementById("#spanContador");
    const contador = 0;
    btnElement.onclick = function() {
      contador++;
      spanElement.textContent = contador;
    };