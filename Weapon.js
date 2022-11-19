import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Weapon(props) {

    let weaponinfo = props.weaponInfo
    //console.log(classinfo)

    const addCharacterWeapon = async () => {
        try {
            console.log('This is the current class info ' + weaponinfo.weapon)
            console.log(props.currentName);
            await axios.post("/dndapi/characterAddWeapon/" + props.currentName + '/' + weaponinfo.weapon );
            console.log('Made it out of the dndapi call');
            props.updateCharacter();
            console.log('Made it out of the update call');
            
        }
        catch (error) {
            console.log("Error accessing character")
        }
    };

    return (
      <div className = 'weaponElement'>
      <p> <strong>Weapon:</strong> {weaponinfo.weapon} </p>
            <div className = 'classInfo'>
            
            <p> <strong>Damage:</strong> {weaponinfo.damage}</p>
            <p> <strong>Cost:</strong> {weaponinfo.cost}</p>
            </div>

            <button type="button" className="minus" onClick={e => addCharacterWeapon()}> Select Weapon </button> 
       </div>
        );
  }

export default Weapon;
