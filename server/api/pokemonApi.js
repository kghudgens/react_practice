"use strict";

import axios from "axios";
import {
  extractValuesFromAbility,
  extractValuesFromPokemon,
} from "../helpers/extractHelpers.js";
import { saveSearch } from "../redis/redis.js";

function searchByPokemonName(name) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      const responseData = response.data;
      const returnedPokemon = extractValuesFromPokemon(responseData);
      saveSearch(returnedPokemon.getName(), returnedPokemon);
    })
    .catch((error) => {
      console.log("Error in the Search By Name api call: ", error);
    });
}

// get habitat
function searchForAbilities(name) {
  axios
    .get(`https://pokeapi.co/api/v2/ability/${name}/`)
    .then((response) => {
      const responseData = response.data;
      const returnedPokemonAbility = extractValuesFromAbility(responseData);
    })
    .catch((error) => {
      console.log(
        "Error in the Search By Name For Abilities api call: ",
        error
      );
    });
}

export { searchByPokemonName, searchForAbilities };
