const pokemonCaja = document.querySelector("#cajaCard");
const pokemons = JSON.parse(localStorage.getItem("pokemons")) || {};

let pagina = 1;
const limit = 15;

if (Object.keys(pokemons).length > 0) {
  window.addEventListener("beforeunload", function(event) {
    traerPokemons();
  });
}

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!isPokemonExist(data)) {
        const pokemonData = {
          id: data.id,
          name: data.name,
          sprites: {
            front_default: data.sprites && data.sprites.front_default ? data.sprites.front_default : '',
          },
          stats: [],
          eliminado: false, // Nueva propiedad "eliminado" inicializada en falso
        };
        fetchPokemonData(id, pokemonData);
      }
    })
    .catch((error) => {
      console.log(`Error al obtener los datos del Pokémon ${id}:`, error);
    });
}

function isPokemonExist(pokemonData) {
  return pokemons.hasOwnProperty(pokemonData.id);
}

function fetchPokemonData(id, pokemonData) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => response.json())
    .then((data) => {
      const stats = data.stats;
      stats.forEach((stat) => {
        const statName = stat.stat.name;
        const baseValue = stat.base_stat;

        console.log(`${statName}: ${baseValue}`);
      });

      pokemonData.stats = stats;

      pokemons[id] = pokemonData;
      localStorage.setItem("pokemons", JSON.stringify(pokemons));

      crearCard(pokemonData);

    })
    .catch((error) => {
      console.log(`Error al obtener los datos del Pokémon ${id}:`, error);
    });
}

let pageNumber = parseInt(localStorage.getItem("pageNumber")) || 1;

function guardarPaginaActual() {
  localStorage.setItem("pageNumber", pageNumber.toString());
}

function traerPokemons() {
  const offset = (pageNumber - 1) * limit;
  const finalId = offset + limit;

  for (let i = offset + 1; i <= finalId; i++) {
    if (!pokemons[i]) {
      fetchPokemon(i);
    }
  }

  removeChildNodes(pokemonCaja);
  Object.values(pokemons)
    .filter((pokemonData) => !pokemonData.eliminado && pokemonData.id >= offset + 1 && pokemonData.id <= finalId)
    .forEach((pokemonData) => {
      crearCard(pokemonData);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  verPokemon();

  const btnSiguiente = document.querySelector("#btnSiguiente");
  btnSiguiente.addEventListener("click", () => {
    pageNumber++;
    guardarPaginaActual();
    traerPokemons();
  });

  const btnAtras = document.querySelector("#btnAtras");
  btnAtras.addEventListener("click", () => {
    if (pageNumber > 1) {
      pageNumber--;
      guardarPaginaActual();
      traerPokemons();
    }
  });

  traerPokemons();
});

function crearCard(pokemonData) {
  const card = document.createElement("div");
  card.id = `card${pokemonData.id}`;
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-duration", "3000");
  card.setAttribute("data-aos-once", "true");
  card.className = "card zoom-img";

  const statsHtml = pokemonData.stats && Array.isArray(pokemonData.stats)
    ? pokemonData.stats
        .map((stat) => `<p>${stat.stat.name}: ${stat.base_stat}</p>`)
        .join("")
    : "";

  card.innerHTML = `
    <img src="${pokemonData.sprites && pokemonData.sprites.front_default ? pokemonData.sprites.front_default : ''}" alt="">
    <div class="cardProduct">
      <h3>${pokemonData.name}</h3>
      <div class="div-card-btn">
        <p>#${pokemonData.id.toString().padStart(3, 0)}</p>
        <ul class="div-ul-li-btn">
          <li>
            <button class="btn-add">
              <span class="material-symbols-outlined" id="span-add">
                add_circle
              </span>
            </button>
          </li>
          <li>
            <button class="btn-act">
              <span class="material-symbols-outlined" id="span-act">
                autorenew
              </span>
            </button>
          </li>
          <li>
            <button class="btn-del">
              <span class="material-symbols-outlined" id="span-del">
                cancel
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div class="caja-stats">
        ${statsHtml}
      </div>
    </div>
  `;
  pokemonCaja.append(card);

  const addButton = card.querySelector(".btn-add");
  const updateButton = card.querySelector(".btn-act");
  const deleteButton = card.querySelector(".btn-del");

  addButton.addEventListener("click", () => {
    const id = card.id.substring(4);
    const pokemonData = {
      id: parseInt(id),
      name: card.querySelector("h3").textContent,
      sprites: {
        front_default: card.querySelector("img").getAttribute("src"),
      },
      stats: pokemons[id].stats || [],
    };
    addPokemon(pokemonData);
  });

  updateButton.addEventListener("click", () => {
    alert("¡Ohh! Vas a actualizar un Pokémon");
    const name = prompt("Ingrese el nombre del Pokémon para actualizar").toLowerCase();
    actualizarPokemon(name);
  });

  deleteButton.addEventListener("click", () => {
    alert("¡Ohh! Vas a eliminar un Pokémon");
    const name = prompt("Ingrese el nombre del Pokémon a eliminar").toLowerCase();
    deletePokemon(name);
  });
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

class Poke {
  constructor(id, name, img) {
    this.id = id;
    this.name = name;
    this.sprites = {
      front_default: img
    };
    this.stats = [];
    this.eliminado = false; // Nueva propiedad "eliminado" inicializada en falso
  }

  static guardarPokemon() {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  }
}

function addPokemon(pokemonData) {
  if (pokemons.hasOwnProperty(pokemonData.id)) {
    console.log("El Pokémon ya existe:", pokemonData);
    return;
  }

  const pokemon = new Poke(
    pokemonData.id,
    pokemonData.name,
    pokemonData.sprites.front_default
  );

  pokemons[pokemonData.id] = pokemon;
  Poke.guardarPokemon();

  verPokemon();
  console.log("Se ha agregado un Pokémon:", pokemonData);
}

function verPokemon() {
  const existingCards = Array.from(pokemonCaja.children).map((card) => card.id);
  Object.values(pokemons).forEach((pokemon) => {
    const cardId = `card${pokemon.id}`;
    if (!existingCards.includes(cardId) && !pokemon.eliminado) { // Agregar la condición de "eliminado"
      crearCard(pokemon);
    }
  });
}

function actualizarPokemon(name) {
  const pokemonId = Object.keys(pokemons).find((id) => pokemons[id].name === name);
  if (pokemonId) {
    const updatedPokemonData = { ...pokemons[pokemonId] };
    fetchPokemonData(pokemonId, updatedPokemonData);
  } else {
    console.log(`No se encontró ningún Pokémon con el nombre "${name}"`);
  }
}

function deletePokemon(name) {
  const pokemonId = Object.keys(pokemons).find((id) => pokemons[id].name === name);
  if (pokemonId) {
    const cardToRemove = document.querySelector(`#card${pokemonId}`);
    cardToRemove.remove();
    pokemons[pokemonId].eliminado = true; // Marcar el Pokémon como eliminado en el objeto "pokemons"
    localStorage.setItem("pokemons", JSON.stringify(pokemons)); // Actualizar el almacenamiento local
    console.log(`Se ha eliminado el Pokémon "${name}"`);
  } else {
    console.log(`No se encontró ningún Pokémon con el nombre "${name}"`);
  }
}

traerPokemons();