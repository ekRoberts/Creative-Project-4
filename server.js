
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});



const raceSchema = new mongoose.Schema({
  race: String,
  size: String,
  speed: String,
  lang: String,
});

const weaponSchema = new mongoose.Schema({
  weapon: String,
  damage: String,
  cost: String,
});

const classSchema = new mongoose.Schema({
  charclass: String,
  hitDie: String,
  primaryAbility: String,
  secondaryAbility: String,
  armor: String,
});

const partySchema = new mongoose.Schema({
  name: String,
  level: String,
  hitPoints: String,
  initiative: String,
})

const characterSchema = new mongoose.Schema({
  name: String,        
  charclass: String,
  race: String,
  weapon: String,
});



characterSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
  partySchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
raceSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });  
  
weaponSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  }); 
  
 classSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
  characterSchema.set('toJSON', {
  virtuals: true
});

raceSchema.set('toJSON', {
  virtuals: true
});

weaponSchema.set('toJSON', {
  virtuals: true
});

classSchema.set('toJSON', {
  virtuals: true
});

partySchema.set('toJSON', {
  virtuals: true
});

const Class = mongoose.model('Class', classSchema)
const Race = mongoose.model('Race', raceSchema)
const Character = mongoose.model('Character', characterSchema)
const Weapon = mongoose.model('Weapon', weaponSchema)
const Party = mongoose.model('Party', partySchema)
  



// Class.deleteMany({ }).then(function(){
//     console.log("Class Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

// Race.deleteMany({ }).then(function(){
//     console.log("Race Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

// Character.deleteMany({ }).then(function(){
//     console.log("Character Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

// Weapon.deleteMany({ }).then(function(){
//     console.log("Weapon Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

// Party.deleteMany({ }).then(function(){
//     console.log("Party Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

let currentName = 'Unknown';
let currentClass = 'Unknown';
let currentRace = 'Unknown';


app.delete('/dndapi/party/:name', async (req, res) => {
  try {
    await Party.deleteOne({
      name: req.params.name
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/dndapi/charclasses', async (req, res) => {
  try {
    let classes = await Class.find();
    res.send({classes: classes});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/dndapi/races', async (req, res) => {
  try {
    let races = await Race.find();
    res.send({races: races});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/dndapi/weapons', async (req, res) => {
  try {
    let weapons = await Weapon.find();
    res.send({weapons: weapons});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/dndapi/character', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send({characters: characters});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/dndapi/character/:name', async (req, res) => {
  try {
    let character = await Character.find({name:req.params.name});
    res.send({character: character});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/dndapi/currentcharacter/', async (req, res) => {
  try {
    let currentCharacter = await Character.find({name:currentName});
    res.send({character: currentCharacter});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/dndapi/party', async (req, res) => {
  try {
    let party = await Party.find();
    res.send({party: party});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/party/:name', async (req, res) => {
    const party = new Party({
    name: req.params.name,
    level: "1",
    hitPoints: "25",
    initiative: "12",
    
  });
  try {
    await party.save();
        console.log("Added the " + party.name + " to the party")
    res.send({party:party});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/race', async (req, res) => {
    const race = new Race({
    race: req.body.race,
    size: req.body.size,
    speed: req.body.size,
    lang: req.body.lang
  });
  try {
    await race.save();
        console.log("Added the " + race.race + " race")
    res.send({race:race});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/class', async (req, res) => {
    const charclass = new Class({
    charclass: req.body.charclass,
    hitDie: req.body.hitDie,
    primaryAbility: req.body.primaryAbility,
    secondaryAbility: req.body.secondaryAbility,
    armor: req.body.armor
  });
  try {
    await charclass.save();
    console.log("Added the " + charclass.charclass + " class")
    res.send({charclass:charclass});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/weapon', async (req, res) => {
    const weapon = new Weapon({
    weapon: req.body.weapon,
    damage: req.body.damage,
    cost: req.body.cost
  });
  try {
    await weapon.save();
    console.log("Added the " + weapon.weapon + " to weapons")
    res.send({weapon:weapon});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/character', async (req, res) => {
    const character = new Character({
      name: req.body.name,        
      charclass: req.body.charclass,
      race: req.body.race,
      weapon: req.body.weapon
  });
  try {
    await character.save();
    console.log("Added the " + character.name + " character")
    res.send({charclass:character});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/currentcharacter/:currentCharacterName', async (req, res) => {
  try {
    currentName = req.params.currentCharacterName; 
    console.log("Added the " + currentName + " as the current character")
    res.send({character: currentName});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.post('/dndapi/character/:name', async (req, res) => {

  try {
    const character = new Character({
      name: req.params.name,        
      charclass: 'Unknown',
      race: 'Unknown',
      weapon: 'Unknown'
  });
    await character.save();
    console.log("Added the " + character.name + " character")
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/characterAddClass/:name/:charclass', async (req, res) => {
    console.log("made it to the dndapi function")
  try {
    
    Character.updateOne({name:req.params.name}, {$set:{charclass:req.params.charclass}}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

    let currentCharacter =  await Character.find({name:req.params.name});
    console.log("Added the " + req.params.charclass + " to the character " + req.params.name)
    res.send({character: currentName});

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/characterAddRace/:name/:race', async (req, res) => {
    
  try {
    Character.updateOne({name:req.params.name}, {$set:{race:req.params.race}}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

    console.log(currentName);
    console.log("Added the " + req.params.race + " to the character " + req.params.name);
    res.send({race: req.params.race});
   

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/characterAddWeapon/:name/:weapon', async (req, res) => {
    
  try {
    Character.updateOne({name:req.params.name}, {$set:{weapon:req.params.weapon}}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

    console.log(currentName);
    console.log("Added the " + req.params.weapon + " to the character " + req.params.name);
    res.send({weapon: req.params.weapon});
   

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/dndapi/partyLevel/:name', async (req, res) => {
    
  try {
    let party = await Party.find({name:req.params.name})
    console.log(party[0]);
    console.log(party[0].level);
    let level = String(parseInt(party[0].level) + 1)

    Party.updateOne({name:req.params.name}, {$set:{level:level}}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        });
    res.send({level: level});
    console.log(currentName);
    console.log("Increased the level");

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});





app.listen(3002, () => console.log('Server listening on port 3002!'));
