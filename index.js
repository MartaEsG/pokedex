//#region peticion


const getCharacters = async () => {
  const pokedex = []
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    const res = await response.json();
    pokedex.push(res);
  }
  return pokedex;
};

const mappedCharacters = (characters) => {
  return characters.map ((character) => ({
    nombre: character.name,
    imagen: character.sprites['front_default'],
    tipo: character.types.map((type) => type.type.name).join(', '),
    id: character.id, 
  }));
};

// Aqui lo que hemos dicho es que la función nos devuelva el nombre, imagen y tipo del array de characters que ya habiamos sacado, para cada uno de los character. Y vamos a bajar a la función init para guardarlo. 

const main$$ = document.createElement("div")
  main$$.innerHTML =""
  document.body.appendChild(main$$)

const drawCharacters = (characters) => {
  for (const character of characters) {
    let characterFigure$$ = document.createElement("figure");
    let characterH2$$ = document.createElement("h2");
    characterH2$$.textContent=character.nombre;
    let characterImg$$ = document.createElement("img");
    characterImg$$.setAttribute("src",character.imagen);
    characterImg$$.setAttribute("alt",character.nombre);
    let characterTipo$$ = document.createElement ("h3");
    characterTipo$$.textContent = `type: ${character.tipo} `;
    let characterId$$ = document.createElement ("p");
    characterId$$.textContent = `ID: ${character.id}`;
    main$$.appendChild(characterFigure$$);
    characterFigure$$.appendChild(characterH2$$);
    characterFigure$$.appendChild(characterImg$$);
    characterFigure$$.appendChild(characterTipo$$);
    characterFigure$$.appendChild(characterId$$);

  }



  // for (const character of characters)
 
    
    // let characterFigcaption$$ =document.createElement("figcaption")

    // characterH2$$.textContent=character.nombre

    // characterFigcaption$$.textContent=character.rol

   
    //
    // characterFigure$$.appendChild(characterFigcaption$$)
    // 
}
//#endregion


//#region init
const init = async () => {
  // creamos constante init 
  const characters = await getCharacters();
  // console.log(characters);
  // creamos constante characters que no se ejecuta hasta que lo haga getcharacters. A continuación vamos a crear la funcion mappedCharacters y le vamos a dar el valor de nuestra nueva constante characters 
  
const mappeCharacter = mappedCharacters(characters);

// creamos otra constante "mappeCharacter" que nos guarde el resultado de la función de mapeo de arriba. 

// console.log(mappeCharacter);

drawCharacters(mappeCharacter);

};



init();

//#endregion