//#region peticion


const getCharacters = async () => {

  // 1. constante pokedex creada para guardar cada uno de los objetos (pokemons + toda su info) que vamos a obtener en cada vuelta en un array. 
  const pokedex = []

  // 2. creamos bucle comenzando index en 1 ya que el primer elemento de la api es /1. 
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

  // 3. usamos await para que no ejecute nada antes de que se haya ejecutado el paso anterior
    const response = await fetch(url);
    const res = await response.json();
    pokedex.push(res);
  }
  return pokedex;
};

// 4. creamos una función init abajo del todo donde iremos guardando cada paso que vamos dando. 

const mappedCharacters = (characters) => {

  // 6. Vamos a hacer que la función nos devuelva el nombre, imagen, tipo e id de cada objeto ("character") del array pokedex que ya habiamos sacado, para cada uno de los character 
  return characters.map ((character) => ({
    

    // 7. Ponemos los nombres en mayúscula 
      nombre: character.name.toUpperCase(),

    //  8. en el caso de la imagen, la API contenía varias (siendo un array) y por ello escogemos la de la posición "font-default" para todos los casos. 
      imagen: character.sprites['front_default'],

    //  9. en el caso del tipo tenemos primero que mapear "types" que es un array. Dentro tenemos varios objetos con varias propiedades, y dentro de la propiedad type (y a su vez dentro de la propiedad name, que está dentro de cada type) tenemos el nombre del tipo. 
    // 10. Finalmente usamos .join(,) para que nos devuelva los elementos en una cadena separados por coma. 
      tipo: character.types.map((type) => type.type.name).join(', '),

      id: character.id, 
  }));
};

// 11. vamos a bajar a la función init para guardarlo. 

// 13. vamos a crear un contenedor llamado "main$$" donde vamos a ver nuestros pokemon pintados. Lo metemos el en body con appendChild
const main$$ = document.createElement("div")
  main$$.innerHTML =""
  document.body.appendChild(main$$)

// 14. creamos función para pintar y bucle para que nos pinte en cada vuelta (para cada pokemon)
const drawCharacters = (characters) => {

  for (const character of characters) {

// 15. primero creamos elemento "figure" que nos va a guardar el nombre, imagen, tipo y id para cada pokemon, y lo metemos en el div "main" que habiamos creado. 
    let characterFigure$$ = document.createElement("figure");
    main$$.appendChild(characterFigure$$);

// 16. creamos h2 que lleve por texto el nombre de cada pokemon
    let characterH2$$ = document.createElement("h2");
    characterH2$$.textContent=character.nombre;

// 17. creamos img y le metemos la dirección url de la imagen, y como "alt" el nombre del pokemon.  
    let characterImg$$ = document.createElement("img");
    characterImg$$.setAttribute("src",character.imagen);
    characterImg$$.setAttribute("alt",character.nombre);

//  18. creamos h3 que lleve por texto el tipo de cada pokemon
    let characterTipo$$ = document.createElement ("h3");
    characterTipo$$.textContent = `type: ${character.tipo} `;

//  19. creamos p que lleve por texto el id de cada pokemon
    let characterId$$ = document.createElement ("p");
    characterId$$.textContent = `ID: ${character.id}`;

// 20. metemos todos los elementos creados dentro de la figura
    characterFigure$$.appendChild(characterH2$$);
    characterFigure$$.appendChild(characterImg$$);
    characterFigure$$.appendChild(characterTipo$$);
    characterFigure$$.appendChild(characterId$$);

  }
}

// 21. vamos a bajar a la función init para guardarlo. 


//#endregion


//#region init

// 4b. creamos función init donde iremos guardando todos los pasos

const init = async () => {
 
// 5. creamos constante characters que no se ejecuta hasta que lo getcharacters esté 100% ejecutado. A continuación, fuera de aquí (arriba) creamos la funcion mappedCharacters y le vamos a dar el valor de nuestra nueva constante "characters" (es decir, el array resultante de la primera función getCharacters)

  const characters = await getCharacters();

// 12. creamos otra constante "mappeCharacter" que nos guarde el resultado de la función de mappedCharacters de arriba. 

  const mappeCharacter = mappedCharacters(characters);

// 22. llamamos a la función drawCharacters que hemos creado arriba

  drawCharacters(mappeCharacter);

};

// 23. finalmente llamamos a la función init para que nos ejecute todo lo que hemos ido guardando en ella 

init();

//#endregion