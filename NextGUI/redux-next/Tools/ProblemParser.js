

// PROBLEMS AND THEIR VISUALIZATIONS
var problems = [

    { name: 'GRAPHCOLORING', type: 'Undirected graph' },
    { name: 'ARCSET', type: 'Directed graph' },
    { name: 'VERTEXCOVER', type: 'Undirected graph' },
    { name: 'CLIQUE', type: 'Undirected graph' },
    { name: 'TSP', type: 'Undirected graph'},
    { name: 'KNAPSACK', type: 'Undirected graph'},
    { name: 'EXACTCOVER', type: '' },
    { name: 'DM3', type: 'Hyper graph'},
    { name: 'SAT3', type: 'Boolean formula'},
    { name: 'SUBSETSUM', type: '' },
    { name: 'IP01', type: '' }

];



class ProblemParser {

    constructor(name, instance) {
        this.name = name;
        this.instance = instance;
    }


    getVisualization() {

        //TODO: Possibly use IF statement
        //to change visualizations depending on the problems list.

    }
}