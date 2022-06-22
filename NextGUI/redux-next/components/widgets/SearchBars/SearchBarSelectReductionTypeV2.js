/**
 * SearchBarSelectReductionTypeV2.js
 * 
* Attempts to create a generic searchbar with passed down props have failed, something about the array
 * of queried data is global and was causing label overriding. 
 * 
 * This searchbar is essentially the same as every other v2 suffix'd searchbar except for some error codes
 * @author Alex Diviney, Daniel Igbokwe
 */


import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../../contexts/ProblemProvider'
import React,{useContext,useEffect, useState} from 'react'
const filter = createFilterOptions();
var problemJson = [];

export default function SearchBarSelectReductionTypeV2(props) {
  //props.setData and props.data should be passed down.
  //our problems to be shown


  const [reductionType, setChosenReduceTo] = useState('');
  const { chosenReduceTo } = useContext(ProblemContext);
  //chosenReduceTo



  let stateVal = undefined;

  const fullUrl = props.url;
    console.log(fullUrl) 
    useEffect(() => {
      problemJson = [];
      setChosenReduceTo("");
      initializeList(fullUrl);
    }, [chosenReduceTo])
  
  //const [value, setValue] = React.useState(null); //state manager.
  return (
    <Autocomplete
    style={{ width: "100%" }}
      value={reductionType}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setChosenReduceTo(
            newValue
          );
          props.setData(newValue);
          // stateVal = newValue
        } else {
          setChosenReduceTo(newValue);
          props.setData(newValue);
          // stateVal = newValue;
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



  function initializeProblemJson(arr) { //converts asynchronous fetch request into synchronous call that sets the dropdown labels
    problemJson = [];
  //   while (problemJson.length) { 
  //     problemJson.pop(); 
  // }
  arr.map(function (element, index, array) {
    // problemJson = [];
    
    if (!problemJson.includes(element)) {
      if(element === "SipserReduceToCliqueStandard" && chosenReduceTo === 'CLIQUE'){
        props.setData(element);
        setChosenReduceTo(element)
        console.log(element)

      }
      problemJson.push(element)
    }
  }, 80);
  //console.log(problemJson);
}
async function getRequest(url) {
    const promise = await fetch(url).then(result => {
      return result.json()
  })
  return promise;
  
}

function initializeList(url) {

  const req = getRequest(url);
  req.then(data => {
   
    initializeProblemJson(data)
    console.log(data)
  })
    .catch((error) => console.log("GET REQUEST FAILED SEARCHBAR SELECT REDUCTION TYPE"));
}



}




