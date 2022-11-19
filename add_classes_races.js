const axios = require("axios");

const classes = require("./classes.js");
const races = require("./races.js");
const weapons = require("./weapons.js");

const baseURL = "http://localhost:3002";

classes.forEach(async (charclass) => {
  const response = await axios.post(`${baseURL}/dndapi/class`, charclass);
  if (response.status != 200)
    console.log(`Error adding ${charclass.charclass}, code ${response.status}`);
});

races.forEach(async (race) => {
  const response = await axios.post(`${baseURL}/dndapi/race`, race);
  if (response.status != 200)
    console.log(`Error adding ${race.race}, code ${response.status}`);
});

weapons.forEach(async (weapon) => {
  const response = await axios.post(`${baseURL}/dndapi/weapon`, weapon);
  if (response.status != 200)
    console.log(`Error adding ${weapon.weapon}, code ${response.status}`);
});
