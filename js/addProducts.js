const pokemonCaja = document.querySelector("#cajaCard");
const pokemons = JSON.parse(localStorage.getItem("pokemons")) || {};

let pagina = 1;
const limit = 15;

if (Object.keys(pokemons).length > 0) {
  window.addEventListener("beforeunload", async function (event) {
    await traerPokemons();
  });
}

async function fetchPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    console.log(data);
    if (!isPokemonExist(data)) {
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprites: {
          front_default:
            data.sprites && data.sprites.front_default
              ? data.sprites.front_default
              : "",
        },
        stats: [],
        eliminado: false,
      };
      await fetchPokemonData(id, pokemonData);
    }
  } catch (error) {
    console.log(`Error al obtener los datos del Pokémon ${id}:`, error);
  }
}

function isPokemonExist(pokemonData) {
  return pokemons.hasOwnProperty(pokemonData.id);
}

async function fetchPokemonData(id, pokemonData) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
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
  } catch (error) {
    console.log(`Error al obtener los datos del Pokémon ${id}:`, error);
  }
}

let pageNumber = parseInt(localStorage.getItem("pageNumber")) || 1;

function guardarPaginaActual() {
  localStorage.setItem("pageNumber", pageNumber.toString());
}

async function traerPokemons() {
  const offset = (pageNumber - 1) * limit;
  const finalId = offset + limit;

  for (let i = offset + 1; i <= finalId; i++) {
    if (!pokemons[i]) {
      await fetchPokemon(i);
    }
  }

  removeChildNodes(pokemonCaja);
  Object.values(pokemons)
    .filter(
      (pokemonData) =>
        pokemonData.id >= offset + 1 &&
        pokemonData.id <= finalId &&
        !pokemonData.eliminado
    )
    .forEach((pokemonData) => {
      crearCard(pokemonData);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  verPokemon();

  const btnSiguiente = document.querySelector("#btnSiguiente");
  btnSiguiente.addEventListener("click", async () => {
    pageNumber++;
    guardarPaginaActual();
    await traerPokemons();
  });

  const btnAtras = document.querySelector("#btnAtras");
  btnAtras.addEventListener("click", async () => {
    if (pageNumber > 1) {
      pageNumber--;
      guardarPaginaActual();
      await traerPokemons();
    }
  });

  const btnAddPokemon = document.querySelector("#btn-add-pokemon");
  btnAddPokemon.addEventListener("click", () => {
    const name = prompt(
      "Ingrese el nombre del Pokémon a agregar"
    ).toLowerCase();
    agregarPokemonEliminado(name);
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

  const statsHtml =
    pokemonData.stats && Array.isArray(pokemonData.stats)
      ? pokemonData.stats
          .map((stat) => `<p>${stat.stat.name}: ${stat.base_stat}</p>`)
          .join("")
      : "";

  card.innerHTML = `
                    <img src="${
                      pokemonData.sprites && pokemonData.sprites.front_default
                        ? pokemonData.sprites.front_default
                        : ""
                    }" alt="">
                    <div class="cardProduct">
                      <h3>${pokemonData.name}</h3>
                      <div class="div-card-btn">
                        <p>#${pokemonData.id.toString().padStart(3, 0)}</p>
                        <ul class="div-ul-li-btn">
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

  const updateButton = card.querySelector(".btn-act");
  const deleteButton = card.querySelector(".btn-del");

  updateButton.addEventListener("click", () => {
    const name = prompt(
      "Ingrese el nombre del Pokémon para actualizar"
    ).toLowerCase();
    if (name) {
      alert(`Vas a actualizar el Pokémon ${name}`);
      actualizarPokemon(name);
    }
  });

  deleteButton.addEventListener("click", () => {
    const name = pokemonData.name.toLowerCase();
    eliminarPokemon(name);
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
      front_default: img,
    };
    this.stats = [];
    this.eliminado = false;
  }

  static guardarPokemon() {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  }
}

function agregarPokemonEliminado(name) {
  const pokemon = Object.values(pokemons).find(
    (pokemon) =>
      pokemon.name.toLowerCase() === name && pokemon.eliminado === true
  );

  if (pokemon) {
    pokemon.eliminado = false;
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
    verPokemon();

    alert(`El Pokémon ${pokemon.name} fue agregado`);

    verificarEliminados();

    location.reload();
  } else {
    alert(`No se encontró el Pokémon eliminado ${name}`);
  }
}

function actualizarPokemon(name) {
  const pokemonId = Object.keys(pokemons).find(
    (id) => pokemons[id].name === name && !pokemons[id].eliminado
  );
  if (pokemonId) {
    const updatedPokemonData = { ...pokemons[pokemonId] };

    const newName = prompt(
      "Ingrese el nuevo nombre del Pokémon",
      updatedPokemonData.name
    );
    if (newName) {
      updatedPokemonData.name = newName;
    }

    const newImg = prompt(
      "Ingrese la nueva imagen del Pokémon",
      updatedPokemonData.sprites.front_default
    );
    if (newImg) {
      updatedPokemonData.sprites.front_default = newImg;
    }

    const newId = prompt(
      "Ingrese el nuevo ID del Pokémon",
      updatedPokemonData.id
    );
    if (newId) {
      updatedPokemonData.id = parseInt(newId);
    }

    updatedPokemonData.stats.forEach((stat) => {
      const newStatValue = prompt(
        `Ingrese el nuevo valor para la estadística ${stat.stat.name}`,
        stat.base_stat
      );
      if (newStatValue) {
        stat.base_stat = parseInt(newStatValue);
      }
    });

    pokemons[pokemonId] = updatedPokemonData;
    localStorage.setItem(
      `pokemons_${pokemonId}`,
      JSON.stringify(updatedPokemonData)
    );

    const cardToUpdate = document.querySelector(`#card${pokemonId}`);
    cardToUpdate.querySelector("h3").textContent = updatedPokemonData.name;
    cardToUpdate.querySelector("img").src =
      updatedPokemonData.sprites.front_default;

    const statsHtml = updatedPokemonData.stats
      .map((stat) => `<p>${stat.stat.name}: ${stat.base_stat}</p>`)
      .join("");
    cardToUpdate.querySelector(".caja-stats").innerHTML = statsHtml;

    alert(`Se ha actualizado el Pokémon "${name}"`);
    Poke.guardarPokemon();
  } else {
    alert(
      `No se encontró ningún Pokémon con el nombre "${name}" o ya está eliminado`
    );
  }
}

function verificarEliminados() {
  const eliminados = Object.values(pokemons).filter(
    (pokemon) => pokemon.eliminado
  );

  if (eliminados.length > 0) {
    eliminados.forEach((pokemon) => {
      delete pokemon.eliminado;
      crearCard(pokemon);
    });

    Poke.guardarPokemon();
  }
}

function eliminarPokemon(name) {
  const pokemon = Object.values(pokemons).find(
    (pokemon) => pokemon.name.toLowerCase() === name
  );

  if (pokemon) {
    const cardToRemove = document.querySelector(`#card${pokemon.id}`);
    cardToRemove.remove();

    pokemons[pokemon.id].eliminado = true;
    Poke.guardarPokemon();

    console.log(`El Pokémon ${pokemon.name} fue eliminado`);

    alert(`Se ha eliminado el Pokémon ${pokemon.name}`);
  } else {
    alert(`No se encontró el Pokémon ${name}`);
  }
}

function verPokemon() {
  console.log("Pokemons actuales:");
  console.log(pokemons);
}

traerPokemons();
