import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Race(props) {

    let raceinfo = props.raceinfo
    //console.log(raceinfo.race)
    
        const addCharacterRace = async () => {
        try {
            console.log('This is the current class info ' + raceinfo.race)
            console.log(raceinfo.race)
            console.log(props.currentName)
            await axios.post("/dndapi/characterAddRace/" + props.currentName + '/' + raceinfo.race );
            console.log('Made it out of the dndapi call');
            props.updateCharacter();
            console.log('Made it out of the update call');
        }
        catch (error) {
            console.log("Error accessing race")
        }
    };


    return (
        
      <div className = 'raceElement'>
      <p> <strong>Race:</strong> {raceinfo.race} </p>
      <div className = 'classInfo'>
            
            <p> <strong>Size:</strong> {raceinfo.size}</p>
            <p> <strong>Language:</strong> {raceinfo.lang}</p>
            </div>
            <button type="button" className="minus" onClick={e => addCharacterRace()}> Select Race </button> 
       </div>

        );
  }

export default Race;
