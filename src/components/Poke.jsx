import React, { useEffect, useState } from "react";

function Poke() {
  //  Guardar la lista de generaciones 
  const [generaciones, setGeneraciones] = useState([]);

  //  Guardar los Pokémon que se muestran 
  const [pokemones, setPokemones] = useState([]);

  //  Cuando el componente aparezca por primera vez, traer las generaciones
  useEffect(() => {
    // Función async para llamar a la API
    async function cargarGeneraciones() {
      const respuesta = await fetch("https://pokeapi.co/api/v2/generation/");
      const datos = await respuesta.json();
      setGeneraciones(datos.results); // datos.results es la lista de generaciones
    }
    cargarGeneraciones();
  }, []); // [] significa: ejecutar solo la primera vez

  // Función que se ejecuta cuando hacen clic en un botón
  async function verPokemon(urlGeneracion) {
    const respuesta = await fetch(urlGeneracion);
    const datos = await respuesta.json();

    // Crear un arreglo con nombre e imagen de cada Pokémon
    const lista = datos.pokemon_species.map((p) => {
      // Obtener el ID del Pokémon desde la URL
      const id = p.url.split("/")[6]; // https://.../pokemon-species/25/ → 25
      return {
        name: p.name,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });

    setPokemones(lista); // Actualizar la lista para mostrarla
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Generaciones de Pokemon:</h2>

      {/* Mostrar los botones */}
      {generaciones.map((gen) => (
        <button
          onClick={() => verPokemon(gen.url)}
          style={{ padding:8, border: "1px solid #ccc", marginRight: 2, marginBottom: 2, background: "#3b82f6"}}
        >
          {gen.name} {/* nombre de la Generacion */}
        </button>
      ))}

     

      {/* Mostrar los Pokémon */}
      {pokemones.map((p) => (
        <div style={{ marginBottom: 10 }}>
          <img src={p.img}  width={50} />
          <span style={{ marginLeft: 10 }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Poke;