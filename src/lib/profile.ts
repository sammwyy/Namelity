import { animals } from "../data/animals";
import { constellations } from "../data/constellations";
import { Data, ExternalData } from "../data/data";
import { elements } from "../data/element";
import { flowers } from "../data/flowers";
import { foods } from "../data/food";
import { fruits } from "../data/fruits";
import { hobbies } from "../data/hobbies";
import { minecraftItems } from "../data/minecraft";
import { personalities } from "../data/personalities";
import { pokemonList } from "../data/pokemon";
import { seasons } from "../data/seasons";
import { superpowers } from "../data/superpowers";
import { weaknesses } from "../data/weaknesses";
import { weathers } from "../data/weathers";
import { Color, createColorPalette } from "./colors";
import RNG from "./rng";

export interface Profile {
  name: string;
  palette: Color[];
  animal: Data;
  constellation: Data;
  element: Data;
  flower: Data;
  food: Data;
  fruit: Data;
  hobby: Data;
  minecraft: ExternalData;
  personality: Data[];
  pokemon: ExternalData;
  season: Data;
  superpower: Data;
  weakness: Data;
  weather: Data;
}

export function generateProfile(name: string): Profile {
  const rng = new RNG(name.toLowerCase());
  const palette = createColorPalette(rng.nextColor());
  const animal = rng.choose(animals);
  const constellation = rng.choose(constellations);
  const element = rng.choose(elements);
  const flower = rng.choose(flowers);
  const food = rng.choose(foods);
  const fruit = rng.choose(fruits);
  const hobby = rng.choose(hobbies);
  const minecraft = rng.choose(minecraftItems);
  const personality = rng.chooseUnique(personalities, 5);
  const pokemon = rng.choose(pokemonList);
  const season = rng.choose(seasons);
  const superpower = rng.choose(superpowers);
  const weakness = rng.choose(weaknesses);
  const weather = rng.choose(weathers);

  return {
    name,
    palette,
    animal,
    constellation,
    element,
    flower,
    food,
    fruit,
    hobby,
    minecraft,
    personality,
    pokemon,
    season,
    superpower,
    weakness,
    weather,
  };
}
