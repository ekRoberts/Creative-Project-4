import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Party(props) {

    let partyinfo = props.partyInfo
    const [character, setCharacter] = useState([]);
    //console.log(raceinfo.race)
    
    const fetchCharacter = async() => {
    try {      
      const response = await axios.get("/dndapi/character/" + partyinfo.name);
      console.log(response.data.character)
      setCharacter(response.data.character)
    } catch(error) {
      console.log("Error getting the character")
    }
  }
  
  const deleteFromParty = async () => {
       try {
           let name = partyinfo.name
           await axios.delete('/dndapi/party/' + name);
           props.updateParty();
       }
       catch (error) {
         console.log("Error deleting from party")
       }
     };
     
  const increaseLevel = async () => {
       try {
           let name = partyinfo.name
           await axios.post('/dndapi/partyLevel/' + name);
           
           props.updateParty();
       }
       catch (error) {
         console.log("Error increasing level")
       }
     };
     
  
      

    return (

      <div className = 'partyElement'>
            
           <p className = 'memberElement'> <strong> Member: </strong> {partyinfo.name}</p> <p className = 'memberElement'> <strong> Level: </strong> {partyinfo.level}</p> 
           <button type="button" className="minus" onClick={e => deleteFromParty()}> Remove from Party </button> 
        <button type="button" className="minus" onClick={e => increaseLevel()}> Increase Level </button> 
               
       </div>
        );
  }

export default Party;
