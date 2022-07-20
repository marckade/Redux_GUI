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
import { ProblemContext } from '../../contexts/ProblemProvider';
import React, { useContext, useEffect, useState } from 'react';
import message from './SearchBarSelectReduceToV2';
const filter = createFilterOptions();
export const noReductionsTypeMessage =
  'No reductions available. Click on the create button to add a new reduction solver method';
var problemJson = [];


export default function SearchBarSelectReductionTypeV2(props) {
  //props.setData and props.data should be passed down.
  //our problems to be shown


  const [reductionType, setReduceToType] = useState('');
  const { chosenReduceTo } = useContext(ProblemContext);
  const [noReductionsType, setNoReductionsType] = useState(false);
  //chosenReduceTo

  const fullUrl = props.url;
  console.log(fullUrl)
  useEffect(() => {
    problemJson = [];
    setReduceToType("");
    initializeList(fullUrl);
  }, [chosenReduceTo]);

  //const [value, setValue] = React.useState(null); //state manager.
  return (
    <Autocomplete
      style={{ width: "100%" }}
      disabled={noReductionsType ? true : false}
      value={reductionType}
      onChange={(event, newValue) => {

   
        if (typeof newValue === 'string') {
          setReduceToType(
            newValue
          );
          props.setData(newValue);
          // stateVal = newValue
        } else {
          setReduceToType(newValue);
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
        <TextField {...params} label={props.placeholder}
        InputProps={ noReductionsType ? { ...params.InputProps, style: { fontSize: 12 } } : {...params.InputProps}}
        />
      )}
    />
  );



  function initializeProblemJson(arr) { //converts asynchronous fetch request into synchronous call that sets the dropdown labels
    // problemJson = [];
      while (problemJson.length) { 
        problemJson.pop(); 
    }

    if (!arr.length) { 
      setNoReductionsType(true);
      setReduceToType(noReductionsTypeMessage);
      props.setData('');
     }

    arr.map(function (element, index, array) {
      // problemJson = [];
      setNoReductionsType(false);

      if (!problemJson.includes(element)) {
        if (element === "SipserReduceToCliqueStandard" && chosenReduceTo === 'CLIQUE') {
          props.setData(element);
          setReduceToType(element);

        }
        problemJson.push(element);
       
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

    console.log(message.noReductionsMessage)
    console.log(chosenReduceTo)

    if(chosenReduceTo !== ''){
    
      const req = getRequest(url);
      req.then(data => {
  
        initializeProblemJson(data)
        console.log(data)
      })
        .catch((error) => console.log("GET REQUEST FAILED SEARCHBAR SELECT REDUCTION TYPE"));

    } else{
      setNoReductionsType(true);
      setReduceToType(noReductionsTypeMessage);
    }

   
  }



}

// export noReductionsMessage




