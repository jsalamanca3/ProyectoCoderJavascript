const words = [
  {
    name: "manzana",
    price: 1200,
    stock: 20,
  },
  {
    name: "pera",
    price: 800,
    stock: 15,
  },
  {
    name: "mango",
    price: 1500,
    stock: 11,
  },
];

const frutas = words.map((word) => word.name);
alert("¡Bienvenidos a nuestra tienda de frutas!");
alert(
  `En el momento solo disponemos de las siguientes frutas: ${frutas.join(", ")}.`
);

const mostrarFrutas = () => {
  const frutaNames = words.map((fruta) => fruta.name);
  alert(`Estas son las frutas: ${frutaNames.join(", ")}.`);
};

//añadir nueva fruta
let continuar = true;

while (continuar) {
  const fruit = {
    name: prompt("Ingrese nombre de una fruta").toLocaleLowerCase(),
    price: Number(prompt("Ingrese el valor por unidad de la fruta")),
    stock: Number(prompt("Ingrese la cantidad de frutas")),
  };
  words.push(fruit);
  mostrarFrutas();
  continuar = confirm("¿Quiere seguir ingresando frutas?");
}

//actualizar fruta
const actualizarFruta = (name) => {
  const index = words.findIndex((word) => word.name === name);
  if (index !== -1) {
    const newName = prompt("Ingrese el nuevo nombre de la fruta").toLocaleLowerCase();
    const newPrice = Number(prompt("Ingrese el nuevo valor por unidad de la fruta"));
    const newStock = Number(prompt("Ingrese la nueva cantidad de fruta"));
    words[index] = { name: newName, price: newPrice, stock: newStock };
  }
};

continuar = confirm("¿Quiere actualizar alguna fruta?");

const actualizarFruit = () => {
  const name = prompt("Ingrese el nombre de la fruta a actualizar").toLowerCase();
  actualizarFruta(name);
};

while (continuar) {
  actualizarFruit();
  mostrarFrutas();
  continuar = confirm("¿Quiere actualizar otra fruta?");
}

//Borrar fruta
const eliminarFruta = (name) => {
  const index = words.findIndex((word) => word.name === name);
  if (index !== -1) {
    words.splice(index, 1);
    alert("Fruta eliminada");
    mostrarFrutas();
  } else {
    alert("Fruta no encontrada");
  }
};

continuar = confirm("Quiere eliminar alguna fruta");

while (continuar) {
  const frutaBorrar = prompt("Ingrese el nombre de la fruta a eliminar").toLocaleLowerCase();
  eliminarFruta(frutaBorrar);
  continuar = confirm("¿Quiere seguir eliminando frutas?");
  if (continuar) {
    mostrarFrutas();
  } else {
    continuar = confirm("¿Quiere eliminar alguna otra fruta?");
  }
}