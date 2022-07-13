

// PROBLEMS AND THEIR VISUALIZATIONS


var problems = [

    { name: 'GRAPHCOLORING',wikiName: 'Graph Coloring', type: 'Undirected graph', regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/ },
    { name: 'ARCSET', type: 'Directed graph',          regex: /{{(\w(,\w)*)+},{(\(\w,\w\)(,\(\w,\w\))*)*},\d+}/ },
    { name: 'VERTEXCOVER',wikiName: 'Vertex cover', type: 'Undirected graph', regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/ },
    { name: 'CLIQUE',wikiName:'Clique', type: 'Undirected graph', regex:/{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/},
    { name: 'TSP', type: 'Undirected graph', regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/ },
    { name: 'KNAPSACK', type: 'Undirected graph',regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/},
    { name: 'EXACTCOVER', wikiName: 'Exact cover', type: '' },
    { name: 'DM3',wikiName: '3-dimensional matching', type: 'Hyper graph'},
    { name: 'SAT3', wikiName:'3SAT', type: 'Boolean formula'},
    { name: 'SUBSETSUM',wikiName: 'Subset sum', type: '' },
    { name: 'INTPROGRAMMING01', wikiName: '0-1 integer programming', type: '' }

];






export class ProblemParser {

    constructor(name) {
        this.name = name;
       
    }


    getVisualization() {

        //TODO: Possibly use IF statement
        //to change visualizations depending on the problems list.

    }


    getWikiName(problemName){
        // const problem = problems.get(problemName);
        let name = ''

        problems.forEach((item) => {
            if(problemName === item.name){
                name = item.wikiName;

            }
          });
       return name;
    }
}