import React from 'react'
import { useContext, useState,createContext, Component } from 'react'


export const ProblemContext = createContext();

const reduxBaseUrl = 'http://localhost:27000/'

class ProblemProvider extends Component {

    state = {
        
        problemJson: "DEFAULT",
        problemType: "NPC",
        problemName: "DEFAULTTYPE",
        problemInstance: "{{1,2,3},{1,2},GENERIC}",
        problemDescription: "You need to enter a problem to see information about it",
        reduceToOptions: ["PROVIDERDEFAULT1", "PROVIDERDEFAULT2"],
        chosenReduceTo: "CHOSEN PROBLEM TO REDUCE TO",
        reductionTypeOptions: ["PROVIDERREDUCTIONCHOICE1"],
        chosenReductionType: "PROVIDERCHOSENREDUCTION",
        reducedInstance: { instance: "PROVIDER_REDUCED_INSTANCE" },
        solverOptions: ["SOLVER_OPTION_ONE"],
        chosenSolver: "CHOSEN SOLVER PROVIDER",
        verifierOptions: ["PROVIDER_VERIFIER_OPTION_ONE"]
        
    }
    /** This method is essentially a "notify all listeners" method, except only for listeners that care about the problem name */
    setProblemName = (newName) => { //State doesn't update immediately, may want to add a better notifier pattern since type can mismatch state here. 
        //console.log(newName);
        this.setState({ problemName: newName })
        //console.log(this.state.problemName)
        //this.makeApiCallProblemInfo(newName.problemName) //test replacing this with a useEffect hook
        //this.makeApiCallReduceToOptions(newName.problemName, this.state.problemType)
        this.makeApiCallSolverOptions(newName.problemName, this.state.problemType)
        this.makeApiCallVerifierOptions(newName.problemName, this.state.problemType)
        
    }


    //API Calls: Consider using state and remote data orchestration for this.
    makeApiCallProblemInfo = (problemName) => {
        //console.log(problemName) //correct currentname .
        

       // URL for a problem and instance by user input 
       // reduxBaseUrl+`${problemName}Generic/instance?problemInstance=${problemInstance}`
        const req = apiFetch(reduxBaseUrl+problemName+'Generic/') 
           // `${problemName}Generic/instance?problemInstance=${problemInstance}`
        req.then(response => response.json())
            .then(data => {
                this.setProblemInstance(data.defaultInstance)
                this.setProblemJson(data.json())
                return data;
            })
            .then(data => this.setProblemDescription(data.formalDefinition + " " + data.problemDefinition))
            .catch((error) => { console.log("FETCH ERROR" + error) });
    }

  
    makeApiCallReduceToOptions = (problemName, problemType) => {
        const fullUrl = reduxBaseUrl+'Navigation/Problem_ReductionsRefactor/'+'?chosenProblem='+problemName+'&problemType='+problemType
     
        // URL to get problems to reduce to.
        // reduxBaseUrl+`Navigation/Problem_ReductionsRefactor/?chosenProblem=${problemName}&problemType=${problemType}`
        const req = apiFetch(fullUrl);
            
        req.then(response => response.json())

        // why is the problemInstance being set here
            .then(data => {
                console.log(data)
                return data;
            })
            .then(data => this.setProblemReduceToOptions(data))
            .catch((error) => { console.log("FETCH ERROR" + error) });
    }

    makeApiCallReductionTypeOptions = (reduceFrom, reduceTo, type) => {
        console.log(reduceFrom.problemName + " " + reduceTo + " " + type);
        reduceFrom = reduceFrom.problemName; //is coming in as object
        
        const fullUrl = reduxBaseUrl+'Navigation/PossibleReductionsRefactor/'+'?reducingFrom='+reduceFrom+'&reducingTo='+reduceTo+'&problemType='+type
        const req = apiFetch(fullUrl);
            
        req.then(response => response.json())
            .then(data => {
                console.log(data)
                return data;
            })
            .then(data => this.setProblemReductionTypeOptions(data))
            .catch((error) => { console.log("FETCH ERROR" + error) });
    }
    
    makeApiCallReductionRequest = () => {
        console.log(this.state.chosenReductionType)
        const fullUrl = reduxBaseUrl+this.state.chosenReductionType.problemName+'/reduce?'+'problemInstance='+this.state.problemInstance
        const req = apiFetch(fullUrl);
            
        req.then(response => response.json())
            .then(data => {
                console.log(data)
                return data;
            })
            .then(data => this.setProblemReductionTypeOptions(data))
            .catch((error) => { console.log("FETCH ERROR" + error) });
    }
    makeApiCallSolverOptions = (problemName) => {
        console.log(problemName);
        const fullUrl = reduxBaseUrl + "Navigation/Problem_SolversRefactor?chosenProblem=" + problemName + "&problemType=" + this.state.problemType
        const req = apiFetch(fullUrl);
        req.then(response => response.json())
            .then(data => {
                console.log(data)
                return data;
            })
            .then(data => this.setSolverOptions(data))
            .catch((error) => { console.log("FETCH ERROR" + error) });

    }

    makeApiCallVerifierOptions = (problemName) => {
        
        console.log(problemName);
        const fullUrl = reduxBaseUrl + "Navigation/Problem_VerifiersRefactor?chosenProblem=" + problemName + "&problemType=" + this.state.problemType
        const req = apiFetch(fullUrl);
        req.then(response => response.json())
            .then(data => {
                console.log(data)
                return data;
            })
            .then(data => this.setVerifierOptions(data))
            .catch((error) => { console.log("FETCH ERROR" + error) });
    }




    // Setters
    setProblemInstance = (newInstance) => {
        this.setState({problemInstance:newInstance})
    }

    setProblemJson = (newProblem) => {
        this.setState({problemJson:newProblem})
        console.log(newProblem)
    }

    setProblemDescription = (newDescription) => {
        this.setState({problemDescription:newDescription})
    }

    setProblemReduceToOptions = (options) => {
        this.setState({ reduceToOptions: options })
        console.log(options)
    }
    setProblemChosenReduceTo = (newChoice) => {
        this.setState({ chosenReduceTo: newChoice })
        
        this.makeApiCallReductionTypeOptions(this.state.problemName,newChoice.problemName,this.state.problemType);
    }

    setProblemReductionTypeOptions = (options)=>{
        this.setState({reductionTypeOptions: options})
    }
    setProblemReductionType = (newChoice) => {
        this.setState({ chosenReductionType: newChoice })
        //console.log(newChoice)
    }
    setSolverOptions = (options) => {
        this.setState({solverOptions: options})
    }
    setChosenSolver = (newChoice) => {
        this.setState({ chosenSolver: newChoice })
        console.log("solver chosen")
    }
    setVerifierOptions = (options) => {
        this.setState({verifierOptions:options})
    }
    setChosenVerifier = (newChoice) => {
        this.setState({ chosenVerifier: newChoice })
        console.log("verifier chosen")
    }
      

    render() {
        return (
            <ProblemContext.Provider value={{
                //These functions (and above state values) are what consumers or useContext(ProblemInsance)  have access to.
                ...this.state,
                setProblemInstance: this.setProblemInstance,
                setProblemName: this.setProblemName,
                setProblemReduceTo:this.setProblemReduceTo,
                setProblemJson : this.setProblemJson,
                makeApiCall: this.makeApiCall,
                setProblemChosenReduceTo: this.setProblemChosenReduceTo,
                setProblemReductionType: this.setProblemReductionType,
                reduceRequest: this.makeApiCallReductionRequest,
                setChosenSolver: this.setChosenSolver,
                setChosenVerifier: this.setChosenVerifier
            }}>
                {this.props.children}
            </ProblemContext.Provider>

        );
    }
    
}

async function apiFetch(url) {
    let request = await fetch(url)
    return request;
}

export default ProblemProvider
