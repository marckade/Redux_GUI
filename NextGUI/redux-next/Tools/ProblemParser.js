

// PROBLEMS AND THEIR VISUALIZATIONS
let noReductionsMessage = 'No reductions available. Click on the add button to add a new reduce-to';



const wikiName = new Map()
wikiName.set('sat3', '3SAT');
wikiName.set('sat', 'SAT');
wikiName.set('arcset', 'Feedback arc set problem');
wikiName.set('clique', 'Clique');
wikiName.set('cliquecover', 'Clique Cover');
wikiName.set('cut', 'Cut');
wikiName.set('setcover','Set Cover');
wikiName.set('hamiltonian','Hamiltonian');
wikiName.set('subsetsum', 'Subset sum');
wikiName.set('dm3', '3-dimensional matching');
wikiName.set('knapsack', 'Knapsack');
wikiName.set('partition', 'Partition');
wikiName.set('tsp', 'Traveling Salesperson Problem');
wikiName.set('intprogramming01', '0–1 integer programming');
// wikiName.set('VERTEXCOVER','Vertex cover');
wikiName.set('graphcoloring', 'Graph Coloring')
wikiName.set('exactcover', 'Exact Cover')
wikiName.set('vertexcover', 'Vertex cover')
wikiName.set('steinertree','Steiner Tree')
wikiName.set('weightedcut','Weighted Cut')
wikiName.set('dirhamiltonian','Directed Hamiltonian')
wikiName.set('NODESET','Feedback Node Set')





export class ProblemParser {

 


    getWikiName(problemName){
        let name = problemName.toLowerCase()
        let isTransitive = false;
        if(name.includes("*")){
            isTransitive = true;
            name = name.replace("*","");
        }
    

    
        if(wikiName.has(name)){
            name = wikiName.get(name);
            // if(isTransitive){               //Note: Caleb - unhighlight when issues with * are resolved in visualization
            //     name = name +"*";
            // }
            return name;
        }
       
        if(problemName === noReductionsMessage){
            return noReductionsMessage;
        }
        // if(problemName !== '' && problemName !== null && problemName !== noReductionsMessage)
    
       return '';
    }
}