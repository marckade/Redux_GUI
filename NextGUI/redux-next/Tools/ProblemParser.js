

// PROBLEMS AND THEIR VISUALIZATIONS
var problems = [

    { name: 'GRAPHCOLORING', type: 'Undirected graph', regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/ },
    { name: 'ARCSET', type: 'Directed graph',          regex: /{{(\w(,\w)*)+},{(\(\w,\w\)(,\(\w,\w\))*)*},\d+}/ },
    { name: 'VERTEXCOVER', type: 'Undirected graph', regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/ },
    { name: 'CLIQUE', type: 'Undirected graph', regex:/{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/},
    { name: 'TSP', type: 'Undirected graph', regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/ },
    { name: 'KNAPSACK', type: 'Undirected graph',regex: /{{(\w(,\w)*)+},{(\{\w,\w\}(,\{\w,\w\})*)*},\d+}/},
    { name: 'EXACTCOVER', type: '' },
    { name: 'DM3', type: 'Hyper graph'},
    { name: 'SAT3', type: 'Boolean formula'},
    { name: 'SUBSETSUM', type: '' },
    { name: 'IP01', type: '' }

];



class ProblemParser {

    constructor(name) {
        this.name = name;
       
    }


    getVisualization() {

        //TODO: Possibly use IF statement
        //to change visualizations depending on the problems list.

    }
}