const apiUrl = 'https://pokeapi.co/api/v2/';

// Función para obtener datos de un Pokémon por su número de Pokédex
async function getPokemonData(pokemonId) {
    try {
      const response = await fetch(`${apiUrl}pokemon/${pokemonId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos del Pokémon:', error);
      throw error;
    }
  }

  // Ejemplo de uso
  const pokemonId = 25; // Pikachu
  getPokemonData(pokemonId)
    .then((pokemon) => {
      console.log('Nombre:', pokemon.name);
      console.log('Altura:', pokemon.height);
      console.log('Peso:', pokemon.weight);
      console.log('Habilidades:', pokemon.abilities);
      console.log('Tipos:', pokemon.types);
      // Aquí puedes realizar las acciones que desees con los datos del Pokémon
    })
    .catch((error) => {
      // Manejo de errores
    });
