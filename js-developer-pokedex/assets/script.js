const pokedex = document.getElementById("pokedex");
const load = document.getElementById("load");
const popup = document.getElementById("popup");
const name = document.getElementById("name");
const image = document.getElementById("image");
const description = document.getElementById("description");
const abilities = document.getElementById("abilities");
const close = document.getElementById("close");
let offset = 0;

// Função para buscar os Pokémons na API
async function getPokemons(offset, limit) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  const pokemons = data.results;
  
  // Para cada Pokémon, adiciona um div na Pokedex
  pokemons.forEach(pokemon => {
    const div = document.createElement("div");
    div.className = "pokemon";
    //div.innerText = pokemon.name;
    div.addEventListener("click", () => {
      // Quando o div é clicado, busca as informações do Pokémon e abre o popup
      getPokemonDetails(pokemon.url);
      popup.style.display = "block";
    });
    getPokemonSprite(pokemon.url, div);
        getPokemonType(pokemon.url, div);

    // Adiciona as informações do Pokémon na div
    div.innerHTML += `<h3>${pokemon.name}</h3>`;
    pokedex.appendChild(div);
  });
}

// Função para buscar as informações de um Pokémon na API
async function getPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();
  name.innerText = data.name;
  image.src = data.sprites.front_default;
  description.innerText = `Height: ${data.height}, Weight: ${data.weight}`;
  abilities.innerText = `Abilities: ${data.abilities.map(ability => ability.ability.name).join(", ")}`;
  
  let color;
  
  // Selecionar a cor de acordo com o tipo no Popup
  switch (data.types[0].type.name) {
    case "grass":
      color = "#9bcc50";
      break;
    case "fire":
      color = "#fd7d24";
      break;
    case "water":
      color = "#4592c4";
      break;
    case "electric":
      color = "#eed535";
      break;
    case "ice":
      color = "#98d5d7";
      break;
    case "ground":
      color = "#dfbf69";
      break;
    case "flying":
      color = "#a98ff0";
      break;
    case "poison":
      color = "#a040a0";
      break;
    case "fighting":
      color = "#bf3029";
      break;
    case "psychic":
      color = "#f65687";
      break;
    case "dark":
      color = "#725847";
      break;
    case "rock":
      color = "#b8a137";
      break;
    case "bug":
      color = "#a8b720";
      break;
    case "ghost":
      color = "#6e5896";
      break;
    case "steel":
      color = "#b9b7cf";
      break;
    case "dragon":
      color = "#6f38f6";
      break;
    case "fairy":
      color = "#f9aec7";
      break;
    case "normal":
      color = "#a6a877";
      break;
    default:
      color = "#9b9b9b";
      
  }
  popup.style.backgroundColor = color;
  div.innerHTML += `<div>Type: ${data.types[0].type.name}</div>`;
}

// Função para buscar a imagem de um Pokémon
async function getPokemonSprite(url, div) {
  const response = await fetch(url);
  const data = await response.json();
  const sprite = document.createElement("img");
  sprite.src = data.sprites.front_default;
  div.appendChild(sprite);
}

// Função para buscar o tipo de um Pokémon
async function getPokemonType(url, div) {
  const response = await fetch(url);
  const data = await response.json();
  const type = document.createElement("div");
  let color;
  
  // Selecionar a cor de acordo com o tipo na Div
switch (data.types[0].type.name) {
    case "grass":
      color = "#9bcc50";
      break;
    case "fire":
      color = "#fd7d24";
      break;
    case "water":
      color = "#4592c4";
      break;
    case "electric":
      color = "#eed535";
      break;
    case "ice":
      color = "#98d5d7";
      break;
    case "ground":
      color = "#dfbf69";
      break;
    case "flying":
      color = "#a98ff0";
      break;
    case "poison":
      color = "#a040a0";
      break;
    case "fighting":
      color = "#bf3029";
      break;
    case "psychic":
      color = "#f65687";
      break;
    case "dark":
      color = "#725847";
      break;
    case "rock":
      color = "#b8a137";
      break;
    case "bug":
      color = "#a8b720";
      break;
    case "ghost":
      color = "#6e5896";
      break;
    case "steel":
      color = "#b9b7cf";
      break;
    case "dragon":
      color = "#6f38f6";
      break;
    case "fairy":
      color = "#f9aec7";
      break;
    case "normal":
      color = "#a6a877";
      break;
    default:
      color = "#9b9b9b";
      
  }
  type.style.backgroundColor = color;
  type.style.width = "100%";
  type.style.height = "20px";
  type.innerText = data.types[0].type.name;
  div.style.backgroundColor = color;
  div.appendChild(type);
}

close.addEventListener("click", () => {
  // Quando o botão "Close" é clicado, fecha o popup
  popup.style.display = "none";
});

load.addEventListener("click", () => {
  // Quando o botão "Carregar Mais Pokémons" é clicado, busca mais Pokémons
  offset += 20;
  getPokemons(offset, 20);
});

// Chama a função para buscar os Pokémons na API
getPokemons(offset, 20);