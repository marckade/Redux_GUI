/**
 * ProblemProvider.js
 * 
 * This component defines the global state for the Redux application. 
 * 
 * It uses a global "context" which any individual component can then tap into by using the useContext react hook. 
 * Essentially, all the methods in here are setters, and so components can either use the context hook to access a read only
 * global state value, or use a provided setter method to edit the state of that global state value.
 * 
 * @author Alex Diviney
 * 
 */


import React from 'react'
import { useContext, useState, createContext, Component } from 'react'


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
        reducedInstance: "PROVIDER_REDUCED_INSTANCE",
        solverOptions: ["SOLVER_OPTION_ONE"],
        chosenSolver: "CHOSEN SOLVER PROVIDER",
        verifierOptions: ["PROVIDER_VERIFIER_OPTION_ONE"],
        solvedInstance: "DEFAULT SOLVED INSTANCE PROVIDER"

    }


    // Setters


    setProblemName = (newName) => {
        //console.log(newName);
        if (!(newName === null)) { //checks if the user x's out input, doesn't change until a new value is selected
            this.setState({ problemName: newName })
            //console.log(this.state.problemName)
        }
    }
    setProblemInstance = (newInstance) => {
        console.log(newInstance)
        this.setState({ problemInstance: newInstance })
        console.log("SET INSTANCE PROVIDER")
        console.log(this.state.problemInstance)
    }

    setProblemJson = (newProblem) => {
        this.setState({ problemJson: newProblem })
        console.log(newProblem)
    }

    setProblemDescription = (newDescription) => {
        this.setState({ problemDescription: newDescription })
    }

    setProblemReduceToOptions = (options) => {
        this.setState({ reduceToOptions: options })
        console.log(options)
    }

    setProblemReductionTypeOptions = (options) => {
        this.setState({ reductionTypeOptions: options })
    }
    setChosenReductionType = (newChoice) => {
        this.setState({ chosenReductionType: newChoice })
        //console.log(newChoice)
    }
    setSolverOptions = (options) => {
        this.setState({ solverOptions: options })
    }
    setChosenSolver = (newChoice) => {
        this.setState({ chosenSolver: newChoice })
        console.log("solver chosen")
    }
    setVerifierOptions = (options) => {
        this.setState({ verifierOptions: options })
    }
    setChosenVerifier = (newChoice) => {
        this.setState({ chosenVerifier: newChoice })
        console.log("verifier chosen")
    }

    setChosenReduceTo = (newChoice) => {
        this.setState({ chosenReduceTo: newChoice });
        console.log("reduction problem chosen")
    }
    setReducedInstance = (newInstance) => {
        this.setState({ reducedInstance: newInstance })
        console.log("new reduced instance set")
    }
    setSolvedInstance = (newInstance) => {
        this.setState({ solvedInstance: newInstance })
        console.log("new solved instance set")
    }

    render() {
        return (
            <ProblemContext.Provider value={{
                //These functions (and above state values) are what consumers or useContext(ProblemInsance)  have access to.
                ...this.state,
                setProblemInstance: this.setProblemInstance,
                setProblemJson: this.setProblemJson,
                setProblemName: this.setProblemName,
                setProblemReduceTo: this.setProblemReduceTo,
                setProblemJson: this.setProblemJson,
                makeApiCall: this.makeApiCall,
                setChosenReduceTo: this.setChosenReduceTo,
                setChosenReductionType: this.setChosenReductionType,
                setReducedInstance: this.setReducedInstance,
                setChosenSolver: this.setChosenSolver,
                setChosenVerifier: this.setChosenVerifier,
                setSolvedInstance: this.setSolvedInstance
            }}>
                {this.props.children}
            </ProblemContext.Provider>

        );
    }

}


export default ProblemProvider
