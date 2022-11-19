import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Character(props) {

    let character = props.currentCharacter;
    console.log(character);
    
        const addToParty = async () => {
        try {
            console.log('This is the current class info ' + character.charclass)
            console.log(character.name);
            await axios.post("/dndapi/party/"  + character.name);
            console.log('Made it out of the dndapi call');
            props.updateParty();
            console.log('Made it out of the update call');
        }
        catch (error) {
            console.log("Error adding to party")
        }
    };
    
    return (
      <div className = 'characterInfo'>
            
       <p className = 'characterElement'><strong>Name :</strong> {character.name} </p>  <p className = 'characterElement'><strong>Class : </strong>{character.charclass} </p>  <p className = 'characterElement'><strong>Race : </strong>  {character.race} </p> <p className = 'characterElement'><strong>Weapon : </strong>{character.weapon} </p> 
        <button type="button" className="addParty" onClick={e => addToParty()}> Add to Party </button> 
       </div>
        );
  }

export default Character;
