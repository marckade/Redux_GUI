import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";



export default function TestAuto(props){

    const [problemName, setProblemName] = useState();
    var defaultProblem = 'SAT3';
    var problemList = [];

    async function getRequest(url) {
        const promise = await fetch(url).then(result => {
          return result.json()
      })
      return promise;
      
    }



    function getProblemsList(){
        const req =  getRequest(`http://localhost:27000//navigation/NPC_ProblemsRefactor/`);
        req.then(data => {

            console.log(` The problem List is below \n`)


            data.map(function(element, i, a){

                if(!problemJson.includes(element)){
                    console.log(`${element} \n`)

                }

            })
        })

    }
    



    return(

        <Autocomplete 

        value={defaultProblem}

        onChange={(event, newValue) => setProblemName(newValue)}


        renderInput={(params) => (
            <TextField {...params} label={props.placeholder} />
          )}
        
        
        />
    )

}
