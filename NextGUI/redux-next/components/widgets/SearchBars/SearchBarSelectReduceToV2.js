/**
 * SearchBarSelectReduceToV2.js
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
import React,{useContext,useEffect, useState} from 'react';
import { ProblemParser } from '../../../Tools/ProblemParser';
const filter = createFilterOptions();
export const noReductionsMessage =
  'No reductions available. Click on the create button to add a new reduction method';
//our problems to be shown
var problemJson = [];
const problemParser = new ProblemParser()




export default function SearchBarSelectReduceToV2(props) {
  //props.setData and props.data should be passed down.

  // const [defaultProblemName, setDefaultProblemName] = useState('');
  const [reductionProblem, setReduceTo] = useState('');
  const { problemName } = useContext(ProblemContext);
  const [noReductions, setNoReductions] = useState(false);
  

  // let stateVal = undefined;
  const fullUrl = props.url;
  console.log(`URL is ${fullUrl}`)
   // initializeList(fullUrl);

    useEffect(() => {
      setReduceTo("");
      props.setData("");
      initializeList(fullUrl);
    }, [problemName])
  
  
  
  //const [value, setValue] = React.useState(null); //state manager.
  return (
    <Autocomplete
    style={{ width: "100%" }}
    disabled={noReductions ? true : false}
    //problemParser.getWikiName(reductionProblem)
      value={reductionProblem}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          // setChosenReduceTo(
          //   newValue
          // );
          props.setData(newValue);
          setReduceTo(newValue);
          // stateVal = newValue
        } else {
          //setChosenReduceTo(newValue);
          setReduceTo(newValue);
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
        InputProps={ noReductions ? { ...params.InputProps, style: { fontSize: 12 } } : {...params.InputProps}}
        />
        
      )}
    />
  );


  function initializeProblemJson(arr) { //converts asynchronous fetch request into synchronous call that sets the dropdown labels
    while (problemJson.length) { 
      problemJson.pop(); 
  }


 

  if (!arr.length) { 
    setNoReductions(true);
    setReduceTo(noReductionsMessage);
    props.setData('');
   }

  // problemJson = [];
  arr.map(function (element, index, array) {
    setNoReductions(false);
    if (!problemJson.includes(element)) {
      if(element ===  'CLIQUE'&& problemName === 'SAT3'){
        // stateVal = element;
        props.setData(element);
        setReduceTo(element);
      }
      problemJson.push(element)
    }

  

  }
  , 80);


  

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
    //console.log(problemJson)
  })
    .catch((error) => console.log("GET REQUEST FAILED SELECT REDUCE TO"));
    
}

}


