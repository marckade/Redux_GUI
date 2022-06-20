import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";



export default function TestAuto(props) {

  const [problemName, setProblemName] = useState('');
  var defaultProblem = 'SAT3';
  var problemList = [];


  useEffect(() => {

    initializeList(`http://localhost:27000/navigation/NPC_ProblemsRefactor/`);

  }, [])

  async function getRequest(url) {
    const promise = await fetch(url).then(result => {
      return result.json()
    })
    return promise;

  }

  function initializeProblemJson(arr) {

    arr.map(function (element, index, array) {


      // if (problemList.length !== 0) {
        //console.log(element)

        if (!problemList.includes(element)) {
          // console.log(`${element} \n`)

          if (element === 'SAT3') {
            console.log(element);
            setProblemName(element);
            console.log(`This is the default problem ${element} \n`)
          }

          problemList.push(element);
        }
     // } else {
     //   problemList.push(element)

     // }
    }, 80);
    //console.log(problemJson);
  }

  function initializeList(url) {
    const req = getRequest(url);
    req.then(data => {
      initializeProblemJson(data)
      //console.log(problemJson)
    })
      .catch((error) => console.log("GET REQUEST FAILED", error));
    // initialized = true;
  }



  return (

    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys

      value={problemName}
      options={problemList}

      onChange={(event, newValue) => setProblemName(newValue)}



      renderInput={(params) => (
        <TextField {...params} label={props.placeholder} />
      )}


    />
  )

}
