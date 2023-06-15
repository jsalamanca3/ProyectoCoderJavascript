const pokemoncaja = document.querySelector("#cajaCard");

let offset = 1;
let limit = 17;

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      crearCard(data);
    })
    .catch((error) => {
      console.log(`Error al obtener los datos del Pokémon ${id}:`, error);
    });
}

function traerPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

if (localStorage.getItem("pokemons")) {
  const savedPokemons = JSON.parse(localStorage.getItem("pokemons"));
  savedPokemons.forEach((pokemonData) => {
    crearCard(pokemonData);
  });
}

function crearCard(pokemonData) {
  const card = document.createElement("div");
  card.id = `card${pokemonData.id}`;
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-duration", "3000");
  card.setAttribute("data-aos-once", "true");
  card.className = "card zoom-img";
  card.innerHTML = `
    <img src="${pokemonData.sprites.front_default}" alt="">
    <div class="cardProduct">
      <h3>${pokemonData.name}</h3>
      <p>#${pokemonData.id.toString().padStart(3, 0)}</p>
    </div>
  `;
  pokemoncaja.append(card);
}

traerPokemons(offset, limit);

const btnAtras = document.querySelector("#btnAtras");
btnAtras.addEventListener("click", () => {
  if (offset > 1) {
    offset -= limit;
    removeChildNodes(pokemoncaja);
    traerPokemons(offset, limit);
  }
});

const btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", () => {
  offset += limit;
  removeChildNodes(pokemoncaja);
  traerPokemons(offset, limit);
});

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}





/* const pokemoncaja = document.querySelector("#cajaCard");

let offset = 1;
let limit = 11;

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      crearCard(data);
    });
}

function traerPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

if (localStorage.getItem("pokemons")) {
  const savedPokemons = JSON.parse(localStorage.getItem("pokemons"));
  savedPokemons.forEach((pokemonData) => {
    fetchPokemon(pokemonData.id);
  });
}

function crearCard(pokemonData) {
  const card = document.createElement("div");
  card.id = `card${pokemonData.id}`;
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-duration", "3000");
  card.setAttribute("data-aos-once", "true");
  card.className = "card zoom-img";
  card.innerHTML = `
    <img src="${pokemonData.sprites.front_default}" alt="">
    <div class="cardProduct">
      <h3>${pokemonData.name}</h3>
      <p>#${pokemonData.id.toString().padStart(3, 0)}</p>
    </div>
  `;
  pokemoncaja.append(card);
}

traerPokemons(offset, limit);

const btnAtras = document.querySelector("#btnAtras");
btnAtras.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 11;
    removeChildNodes(pokemoncaja);
    traerPokemons(offset, limit);
  }
});

const btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", () => {
  offset += 11;
  removeChildNodes(pokemoncaja);
  traerPokemons(offset, limit);
});

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
 */






/* const pokemoncaja = document.querySelector("#cajaCard");

let offset = 1;
let limit = 11;

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      crearCard(data);
    });
}

function traerPokemons(offset, limit) {
  for (let i = offset; i < offset + limit; i++) {
    fetchPokemon(i);
  }
}

if (localStorage.getItem("pokemons")) {
  const savedPokemons = JSON.parse(localStorage.getItem("pokemons"));
  savedPokemons.forEach((pokemon) => {
    crearCard(pokemon);
  });
}

const crearCard = (pokemon) => {
  const cajaCard = document.querySelector("#cajaCard");

  const savedPokemons = localStorage.getItem("pokemons")
    ? JSON.parse(localStorage.getItem("pokemons"))
    : [];
  if (!savedPokemons.some((savedPokemon) => savedPokemon.id === pokemon.id)) {
    savedPokemons.push(pokemon);
  }

  localStorage.setItem("pokemons", JSON.stringify(savedPokemons));

  const card = document.createElement("div");
  card.id = `card${pokemon.id}`;
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-duration", "3000");
  card.setAttribute("data-aos-once", "true");
  card.className = "card zoom-img";
  card.innerHTML = `
                      <img src="${pokemon.sprites.front_default}" alt="">
                      <div class="cardProduct">
                          <h3>${pokemon.name}</h3>
                          <p> #${pokemon.id.toString().padStart(3, 0)}</p>
                      </div>
  `;
  cajaCard.append(card);
};

traerPokemons(offset, limit);

const btnAtras = document.querySelector("#btnAtras");
btnAtras.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 11;
    removeChildNodes(cajaCard);
    traerPokemons(offset, limit);
  }
});

const btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", () => {
  offset += 11;
  removeChildNodes(cajaCard);
  traerPokemons(offset, limit);
});

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
} */



/* 

async function agregarPokemon(nombre, tipo, altura, peso, habilidades, img) {
  try {
    const response = await fetch(apiUrl + "pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre,
        type: tipo,
        height: altura,
        weight: peso,
        abilities: habilidades,
        img: img,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar el Pokémon:", error);
    throw error;
  }
}

async function editarPokemon(
  pokemonId,
  nombre,
  tipo,
  altura,
  peso,
  habilidades,
  img
) {
  try {
    const response = await fetch(`${apiUrl}pokemon/${pokemonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre,
        type: tipo,
        height: altura,
        weight: peso,
        abilities: habilidades,
        img: img,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al editar el Pokémon:", error);
    throw error;
  }
}

async function eliminarPokemon(pokemonId) {
  try {
    const response = await fetch(`${apiUrl}pokemon/${pokemonId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el Pokémon:", error);
    throw error;
  }
}

// Obtener datos de un Pokémon por ID
const pokemonId = 25;
getPokemonData(pokemonId)
  .then((pokemon) => {
    console.log("Nombre:", pokemon.name);
    console.log("Altura:", pokemon.height);
    console.log("Peso:", pokemon.weight);
    console.log("Habilidades:", pokemon.abilities);
    console.log("Tipos:", pokemon.types);
    // Realizar acciones con los datos del Pokémon obtenido
  })
  .catch((error) => {
    // Manejo de errores
  });

// Traer lista de Pokémon
const offset = 0;
const limit = 10;
traerPokemons(offset, limit)
  .then((pokemons) => {
    console.log("Lista de Pokémon:", pokemons);
    // Realizar acciones con la lista de Pokémon obtenida
  })
  .catch((error) => {
    //
  });

// Añadir nuevo Pokémon
async function agregarPokemon(nombre, tipo, altura, peso, habilidades, img) {
  try {
    const response = await fetch(apiUrl + "pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre,
        type: tipo,
        height: altura,
        weight: peso,
        abilities: habilidades,
        img: img,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar el Pokémon:", error);
    throw error;
  }
}

// Editar Pokémon existente
async function editarPokemon(
  pokemonId,
  nombre,
  tipo,
  altura,
  peso,
  habilidades,
  img
) {
  try {
    const response = await fetch(`${apiUrl}pokemon/${pokemonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre,
        type: tipo,
        height: altura,
        weight: peso,
        abilities: habilidades,
        img: img,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al editar el Pokémon:", error);
    throw error;
  }
}

// Eliminar Pokémon existente
async function eliminarPokemon(pokemonId) {
  try {
    const response = await fetch(`${apiUrl}pokemon/${pokemonId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el Pokémon:", error);
    throw error;
  }
}





// Agregar un nuevo Pokémon
agregarPokemon(
  "Charizard",
  "Fire",
  1.7,
  90.5,
  ["Blaze", "Solar Power"],
  "https://example.com/charizard.png"
)
  .then((pokemon) => {
    console.log("Pokémon agregado:", pokemon);
    // Realizar acciones después de agregar el Pokémon
  })
  .catch((error) => {
    // Manejo de errores
  });

// Editar un Pokémon existente
const pokemonId = 25;
editarPokemon(
  pokemonId,
  "Pikachu",
  "Electric",
  0.4,
  6,
  ["Static"],
  "https://example.com/pikachu.png"
)
  .then((pokemon) => {
    console.log("Pokémon editado:", pokemon);
    // Realizar acciones después de editar el Pokémon
  })
  .catch((error) => {
    // Manejo de errores
  });

// Eliminar un Pokémon existente
const pokemonId = 25;
eliminarPokemon(pokemonId)
  .then((response) => {
    console.log("Pokémon eliminado:", response);
    // Realizar acciones después de eliminar el Pokémon
  })
  .catch((error) => {
    // Manejo de errores
  });

// ...

 */