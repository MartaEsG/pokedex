const title$$ = document.createElement ("img");
title$$.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
title$$.classList.add ("title");

const buscar$$ = document.createElement("h3");
buscar$$.textContent = "CAPTURAR POKEMON...";

const searcher$$ = document.createElement("input");

const header$$ = document.createElement("section");
document.body.appendChild(header$$);
header$$.appendChild (title$$);
header$$.appendChild(buscar$$);
header$$.appendChild(searcher$$);


const getPokemons = async () => {

    const pokedex = []
  
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  
      const response = await fetch(url);
      const res = await response.json();
      pokedex.push(res);
    }
    return pokedex;
  };
   
  
const DataPokemons = (pokemons) => {
  
    return pokemons.map ((pokemon) => ({
      
        nombre: pokemon.name.toUpperCase(),
        imagen: pokemon.sprites['front_default'],
        imagen2: pokemon.sprites['back_default'],
        tipo: pokemon.types.map((type) => type.type.name).join(', '),
        id: pokemon.id, 
    }));
};


const main$$ = document.createElement("div")

    document.body.appendChild(main$$)


      
const drawPokemons = (pokemons) => {
  
    for (const character of pokemons) {
      let characterFigure$$ = document.createElement("figure");
      main$$.appendChild(characterFigure$$);
  

      let characterH2$$ = document.createElement("h2");
      characterH2$$.textContent=character.nombre;
      characterFigure$$.appendChild(characterH2$$);

      let divImg$$ = document.createElement ("div");
      divImg$$.classList.add("flipCard");
      characterFigure$$.appendChild(divImg$$);
      
    
      let characterImg$$ = document.createElement("img");
      characterImg$$.setAttribute("src",character.imagen);
      characterImg$$.setAttribute("alt",character.nombre);
      characterImg$$.classList.add("flipCard-front");
      divImg$$.appendChild(characterImg$$);

      let characterImg2$$ = document.createElement("img");
      characterImg2$$.setAttribute("src",character.imagen2);
      characterImg2$$.setAttribute("alt",character.nombre);
      characterImg2$$.classList.add ("flipCard-back");
      divImg$$.appendChild(characterImg2$$); 

  
      let characterTipo$$ = document.createElement ("h3");
      characterTipo$$.textContent = `type: ${character.tipo} `;
  
      let characterId$$ = document.createElement ("p");
      characterId$$.textContent = `ID: ${character.id}`;
  
      
      characterFigure$$.appendChild(characterTipo$$);
      characterFigure$$.appendChild(characterId$$);
}
 


}
const init = async () => {
    const pokemons = await getPokemons();

    const dataCharacter = DataPokemons(pokemons);
 
    drawPokemons(dataCharacter);
  
};
  
  
init();


const busqueda = async (event) => {
    let pokemons = await getPokemons();
    let filteredPokemons = []
    for (const pokemon of pokemons) {
        if (pokemon.name.includes(event.target.value)){
            filteredPokemons.push(pokemon)
            main$$.innerHTML = ""
        }
   } let newPokemons = DataPokemons(filteredPokemons)

   drawPokemons(newPokemons);    
}
 
searcher$$.addEventListener ("input", busqueda)





  
