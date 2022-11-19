import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Class from './Class.js';
import Race from './Race.js';
import Character from './Character.js';
import Weapon from './Weapon.js';
import Party from './Party.js';
import Header from './Header.js';
import './App.css';




function App() {
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [party, setParty] = useState([]);
  const [error, setError] = useState("");
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState([]);
  const [characters, setCharacters] = useState([]);



  const fetchClasses = async() => {
    try {      
      const response = await axios.get("/dndapi/charclasses");
      setClasses(response.data.classes);
    } catch(error) {
      setError("error retrieving classes: " + error);
    }
  };
  
    const fetchRaces = async() => {
    try {      
      const response = await axios.get("/dndapi/races");
      setRaces(response.data.races);
    } catch(error) {
      setError("error retrieving races: " + error);
    }
  };
  
      const fetchWeapons = async() => {
    try {      
      const response = await axios.get("/dndapi/weapons");
      setWeapons(response.data.weapons);
      console.log(weapons);
    } catch(error) {
      setError("error retrieving races: " + error);
    }
  };
  
    
      const fetchParty = async() => {
    try {      
      const response = await axios.get("/dndapi/party");
      setParty(response.data.party);
      console.log(party);
    } catch(error) {
      setError("error retrieving races: " + error);
    }
  };


        const fetchCharacters = async() => {
    try {      
      const response = await axios.get("/dndapi/character");
      setWeapons(response.data.characters);
    } catch(error) {
      setError("error retrieving races: " + error);
    }
  }
  
    const createCharacter = async() => {
    try {
      await axios.post("/dndapi/character/" + currentPlayerName);
    } catch(error) {
      setError("error adding a ticket: " + error);
    }
  }
  
  const setdndapiCurrentCharacter = async() => {
    try {
      await axios.post("/dndapi/currentcharacter/" + currentPlayerName);
      
    } catch(error) {
      setError("error adding a ticket: " + error);
    }
  }
  
      const fetchCurrentCharacter = async() => {
    try {      
      const response = await axios.get("/dndapi/currentcharacter/");
      setCurrentCharacter(response.data.character[0]);
      console.log(response.data.character[0]);
      setCurrentPlayerName(response.data.character[0].name);
      console.log(response.data.character[0].name);
      console.log(currentPlayerName);
    } catch(error) {
      setError("error retrieving races: " + error);
    }
  }
  
      const fetchCharacter = async() => {
    try {      
      const response = await axios.get("/dndapi/character/" + currentPlayerName);
      setCurrentCharacter(response.data.character);
      console.log(response.data.character)
    } catch(error) {
      setError("error retrieving races: " + error);
    }
  }
  

    useEffect(() => {
      fetchClasses();
    },[]);
    
    
    useEffect(() => {
      fetchRaces();
    },[]);
    
    useEffect(() => {
      fetchWeapons();
    },[]);  
    
    useEffect(() => {
      fetchParty();
    },[]); 
    
    
    // useEffect(() => {
    //   fetchCharacters();
    // },[]); 
    
    // useEffect(() => {
    //   fetchCurrentCharacter();
    //   console.log(currentCharacter)
    // },[]);
    
    
    
    const addCharacter = async(e) => {
    e.preventDefault();
    createCharacter();
    fetchCharacter();
    setdndapiCurrentCharacter();
    fetchCurrentCharacter();
    console.log(currentPlayerName);
    console.log(currentCharacter);
  }

  const listClasses = classes.map((d) => <li className= "charclass" key={d.charclass}> <Class classinfo={d} currentName = {currentPlayerName} updateCharacter = {fetchCurrentCharacter}/> </li>);
  const listRaces = races.map((d) => <li className= "races" key={d.race}> <Race raceinfo={d} currentName = {currentPlayerName} updateCharacter = {fetchCurrentCharacter}/> </li>);
  const listWeapons = weapons.map((d) => <li className= "weapons" key={d.weapon}> <Weapon weaponInfo={d} currentName = {currentPlayerName} updateCharacter = {fetchCurrentCharacter}/> </li>);
  const listParty = party.map((d) => <li className= "party" key={d.id + d.name}> <Party partyInfo={d} currentName = {currentPlayerName} updateParty = {fetchParty}/> </li>);
     
  return (
    <div className="App">
      <Header/>
 <div className='character'>
  <div className = 'classTitle'> 
    
   <u> Current Character: </u>
    </div>
    <Character currentCharacter = {currentCharacter} updateParty = {fetchParty}/>
    </div>
    <hr/>
        <div className = 'partyList'>
    <div className = 'classTitle'> 
   <u> Party: </u>
    </div>
    {listParty}
    </div>
    <hr/>
    <u className = 'classTitle'>Create a Character:</u>
          <form onSubmit={addCharacter} className = 'nameSubmit'>
        <div className = 'boxes'>
          <label>
            <strong>Choose a Name: </strong>
            <input type="text" value={currentPlayerName} onChange={e => setCurrentPlayerName(e.target.value)} />
          </label>
        </div>
        <input type="submit" value="Submit" className = 'minus'/>
      </form>
    <div className='charChoices'>
    <div className = 'choiceList'>
    <div className = 'classTitle'> 
    Choose a Class:
    <hr/>
    </div>
    {listClasses}
    </div>
    <div className = 'choiceList'>
    <div className = 'classTitle'> 
    Choose a Race:
    <hr/>
    </div>
    {listRaces}
    </div>
    <div className = 'choiceList'>
    <div className = 'classTitle'> 
    Choose a Weapon:
    <hr/>
    </div>
    {listWeapons}
    </div>
      </div>
      <div className = 'footer'>
        Put Github Here
      </div>
    </div>
  );
}

export default App;
