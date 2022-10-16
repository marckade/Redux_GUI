//Unlike most of the files in this project, this is not a React Componenent, it is instead a pure Javascript object.
// It contains functions for parsing passed in text, and returning an object with either error diagnostics, or a success message.
import Constants from "./Constants";

class ProblemInstanceParser {
    constructor() {
        
    }
    
    //Breaks parsing logic up by problem type, calls function based on type.
    parse(problemType,problemInstance) {
        let parsedOutput = {}
        if (problemType === Constants.ProblemTypes.Clique) {
            console.log("HIT PARSER")
            parsedOutput = this.parseClique(problemInstance);
            console.log(parsedOutput);
        }
        else {
            parsedOutput = {
                test: true,
                input: problemInstance,
                regex: "There is no regex string for this problem, parsing is likely not enabled",
                type: problemType,
                exampleStr: "There is no example string for this problem, click on the problem info box for more problem information"
                
            }
        }

    return parsedOutput
    }

    
    parseSat3(instance) {

    }
        
      
    parseClique(instance) {
        const type = "CLIQUE"
        const undirectedGraphFormat = /{{(([\w!]+)(,([\w!]+))*)+},{(\{([\w!]+),([\w!]+)\}(,\{([\w!]+),([\w!]+)\})*)*},\d+}/g; //checks for undirected graph format, implicitly regex
        const graphReg = new RegExp(undirectedGraphFormat);
        const bool = graphReg.test(instance)
        return {test:bool,input:instance,regex:undirectedGraphFormat,type:type,exampleStr:"{{a,b,c},{{a,b},{b,c}},2}"}
    }
    
}

export default ProblemInstanceParser