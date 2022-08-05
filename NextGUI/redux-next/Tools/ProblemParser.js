// import  noReductionsMessage  from "../components/widgets/SearchBars/SearchBarSelectReduceToV2";

// PROBLEMS AND THEIR VISUALIZATIONS
let noReductionsMessage = 'No reductions available. Click on the add button to add a new reduction method';



const wikiName = new Map()
wikiName.set('SAT3', '3SAT');
wikiName.set('SAT', 'SAT');
wikiName.set('ARCSET', 'Feedback arc set problem');
wikiName.set('CLIQUE', 'Clique');
wikiName.set('SUBSETSUM', 'Subset sum');
wikiName.set('DM3', '3-dimensional matching');
wikiName.set('KNAPSACK', 'Knapsack');
wikiName.set('TSP', 'Traveling  salesman problem');
wikiName.set('INTPROGRAMMING01', '0–1 integer programming');
wikiName.set('VERTEXCOVER','Vertex cover');
wikiName.set('GRAPHCOLORING', 'Graph Coloring');
wikiName.set('ExactCover', 'Exact cover')
wikiName.set('VertexCover', 'Vertex cover')






export class ProblemParser {

 


    getWikiName(problemName){
        let name = ''

        console.log("problem name "+problemName )

        if(wikiName.has(problemName)){
            return wikiName.get(problemName);
        }

        if(problemName === noReductionsMessage){
            return noReductionsMessage;
        }
        // if(problemName !== '' && problemName !== null && problemName !== noReductionsMessage)
    
       return name;
    }
}