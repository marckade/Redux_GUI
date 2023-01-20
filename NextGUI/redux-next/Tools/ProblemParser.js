

// PROBLEMS AND THEIR VISUALIZATIONS
let noReductionsMessage = 'No reductions available. Click on the add button to add a new reduce-to';



const wikiName = new Map()
wikiName.set('sat3', '3SAT');
wikiName.set('sat', 'SAT');
wikiName.set('arcset', 'Feedback arc set problem');
wikiName.set('clique', 'Clique');
wikiName.set('subsetsum', 'Subset sum');
wikiName.set('dm3', '3-dimensional matching');
wikiName.set('knapsack', 'Knapsack');
wikiName.set('tsp', 'Traveling Salesperson Problem');
wikiName.set('intprogramming01', '0–1 integer programming');
// wikiName.set('VERTEXCOVER','Vertex cover');
wikiName.set('graphcoloring', 'Graph Coloring');
wikiName.set('exactcover', 'Exact cover')
wikiName.set('vertexcover', 'Vertex cover')






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