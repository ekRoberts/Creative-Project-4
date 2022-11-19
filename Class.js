import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Class(props) {

    let classinfo = props.classinfo
    //console.log(classinfo)

    const addCharacterClass = async () => {
        try {
            console.log('This is the current class info ' + classinfo.charclass)
            console.log(props.currentName);
            await axios.post("/dndapi/characterAddClass/" + props.currentName + '/' + classinfo.charclass );
            console.log('Made it out of the dndapi call');
            props.updateCharacter();
            console.log('Made it out of the update call');
            
        }
        catch (error) {
            console.log("Error accessing character")
        }
    };

    return (
      <div className = 'classElement'>
      <p> <strong>Class:</strong> {classinfo.charclass} </p>
            <div className = 'classInfo'>
            
            <p> <strong>Hit Die:</strong> {classinfo.hitDie}</p>
            <p> <strong>Primary Ability:</strong> {classinfo.primaryAbility}</p>
            <p> <strong>Secondary Ability:</strong> {classinfo.secondaryAbility}</p>
            <p> <strong>Armor Class:</strong> {classinfo.armor}</p>
            </div> 
            <button type="button" className="minus" onClick={e => addCharacterClass()}> Select Class </button> 
       </div>
        );
  }

export default Class;
