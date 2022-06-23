/**
 * SearchBarProblemType.js
 * 
 * Attempts to create a generic searchbar with passed down props have failed, something about the array
 * of queried data is global and was causing label overriding. 
 * 
 * This specific SearchBar has some quirks that the others do not have. As it is intended to be the first
 * searchbar that a user interacts with, the option labels do not need to dynamically change. Another way 
 * to say this is that this search bar is not dependent on any state variables, but other search bars may 
 * be dependent on state variables (the problem name) that this searchbar sets. 
 * 
 * @author Alex Diviney, Daniel Igbokwe
 */

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../../contexts/ProblemProvider';
import React,{useContext, useState, useEffect} from 'react';
const filter = createFilterOptions();
// var initialized = false;
// var defaultProblem = null;
//our problems to be shown
var problemJson = [];




export default function SearchBarProblemType(props) {
  const { problem, problemName, setProblemName } = useContext(ProblemContext); //passed in context
  const [defaultProblemName, setDefaultProblemName] = useState('');
  


  useEffect(() => {
    initializeList(`${props.url}navigation/NPC_ProblemsRefactor/`);
  }, [])



  

  //console.log(props.url)
  // if (!initialized) {
  //   initializeList(`${props.url}navigation/NPC_ProblemsRefactor/`) //
  //   initialized = true;
  //   console.log('Problem Json list \n') 

  // }
  //const [value, setValue] = React.useState(null); //state manager.
  return (
    <Autocomplete
    style={{ width: "100%" }}
    //defaultValue={defaultProblem !== null ?  props.setTestName : null}
      value={problemName} 
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setProblemName(
            newValue
          );
          //setDefaultProblemName(newValue)
          props.setTestName(newValue);
        } else {
          setProblemName(newValue);
          props.setTestName(newValue); 
        }
      }}

      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
      

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="search-bar"
      options={problemJson}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
       
        // Regular option
        return option;
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={props.placeholder} />
      )}
    />
  );


  
/**
 * converts asynchronous fetch request into synchronous call that sets the dropdown labels by updating our array
 * @param {*} arr 
 */
function initializeProblemJson(arr) { 
  
  arr.map(function (element, index, array) {
    //console.log(element)
    if (!problemJson.includes(element)) {
     
      if(element ===  'SAT3'){
        //setDefaultProblemName(element);
        setProblemName(element);
        props.setTestName(element); 
      }

      problemJson.push(element)
    }
  }, 80);
  //console.log(problemJson);
}

/**
 * 
 * @param {*} url passed in url
 * @returns a promise with the json
 */
async function getRequest(url) {
    const promise = await fetch(url).then(result => {
      return result.json()
  })
  return promise;
  
}
/**
 * gets the data from our request and attempts to set our labels by calling initializeProblemJson
 * 
 */
function initializeList(url) {
  if(problemJson.length === 0){
    const req = getRequest(url);
    req.then(data => {
      initializeProblemJson(data)
      //console.log(problemJson)
    })
      .catch((error) => console.log("GET REQUEST FAILED",error));

  }
 
  // initialized = true;
}

}



