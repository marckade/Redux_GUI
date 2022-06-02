import React from 'react'
import { useContext, useState,createContext, Component } from 'react'


export const ProblemContext = createContext();

class ProblemProvider extends Component {

    state = {
        problemName: "NPC_NODECOVER",
        problemInstance: "{{1,2,3},{1,2},0}"
    }
    setProblemName = (newName) => {
        //console.log(newName);
        console.log("hit");
        this.setState({problemName:newName})
        //console.log(this.state.problemName)
        this.makeApiCall(newName.problemName)
    
    }

    makeApiCall = (problemName) => {
        console.log(problemName) //correct currentname .
        var problemArr = problemName.split('_');
        var problemSuffix = problemArr[1].toUpperCase();
        console.log(problemSuffix)
        const req = apiFetch('http://localhost:27000/'+problemSuffix+'Generic/') 
            
        req.then(response => response.json())
        .then(data => this.setProblemInstance(data.defaultInstance)).catch((error) => { console.log("FETCH ERROR" + error) });

    }
    
    setProblemInstance = (newInstance) => {
        this.setState({problemInstance:newInstance})
    }

    

    render() {
        return (
            <ProblemContext.Provider value={{ ...this.state, setProblemInstance: this.setProblemInstance,setProblemName:this.setProblemName,makeApiCall:this.makeApiCall }}>
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
