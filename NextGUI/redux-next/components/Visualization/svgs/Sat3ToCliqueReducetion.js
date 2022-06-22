import * as d3 from 'd3'
var width = 500;
var height = 500;

let nodes = [];
let edges = [];

var data =  [
    {
        "name": "x1",
        "cluster": "0"
    },
    {
        "name": "!x2",
        "cluster": "0"
    },
    {
        "name": "x3",
        "cluster": "0"
    },
    {
        "name": "!x1",
        "cluster": "1"
    },
    {
        "name": "x3",
        "cluster": "1"
    },
    {
        "name": "x1",
        "cluster": "1"
    },
    {
        "name": "x2",
        "cluster": "2"
    },
    {
        "name": "!x3",
        "cluster": "2"
    },
    {
        "name": "x1",
        "cluster": "2"
    },
    // {
    //     "name": "x4",
    //     "cluster": "3"
    // },
    // {
    //     "name": "!x3",
    //     "cluster": "3"
    // },
    // {
    //     "name": "x2",
    //     "cluster": "3"
    // },
    // {
    //     "name": "x4",
    //     "cluster": "4"
    // },
    // {
    //     "name": "!x2",
    //     "cluster": "4"
    // },
    // {
    //     "name": "x1",
    //     "cluster": "4"
    // }
];
const degrees = (value) => value * (Math.PI / 180);
const sin = (theta) => Math.sin(degrees(theta));
const cos = (theta) => Math.cos(degrees(theta));

const positionByDegree = (degree, r, w, h) => {
    return {
        "x":sin(degree)*r+w,
        "y":cos(degree)*-r+h
    }
}


function getClique(divID){
    let svg = new d3.select("#"+divID).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "all");
    
        let centerX = width/2;
        let centerY = height/3;
        let r = centerX/2;
        let center = {"x":centerX,"y":centerY}
        // new node("X","C", svg, center).show(); 

        data.sort((a,b) => (a.cluster > b.cluster) ? 1 : ((b.cluster > a.cluster) ? -1 : 0)); 

        let n = data.length;
        let m = n + n/3;

        let dataCount = 0;
        for(var i=0; i<m; i++){
            if(i%4 === 0) {continue;}
            nodes[dataCount] = new node(data[dataCount].name+"_"+dataCount,data[dataCount].cluster,data[dataCount].name,svg,positionByDegree(i*360/m,r,centerX,centerY));
            dataCount ++;
        }
        
        for(var i=0; i<nodes.length; i++){
            for(var j=0; j<nodes.length; j++){
                if (nodes[i].Cluster() !== nodes[j].Cluster()){
                    if((nodes[i].Name() === nodes[j].Name() && nodes[i].Variable() === nodes[j].Variable())||nodes[i].Variable() !== nodes[j].Variable()){
                        new edge(svg,nodes[i],nodes[j]);
                    }
                }
            }
        }

        nodes.forEach(node => node.show());
    
    d3.select("#"+divID).selectChildren()._groups[0]?.slice(1).map((child) => d3.select(child).remove())

}

function showCluster(cluster){
    if(d3.select("#highlightGadgets").property("checked")){
    d3.selectAll(".c_"+cluster)
        .attr("fill", "red");
    }
}
function showElement(element){
    if(d3.select("#highlightGadgets").property("checked")){
    d3.selectAll("#"+element)
        .attr("fill", "yellow");
    }
}
function clear(){
    d3.selectAll(".gadget")
        .attr("fill", "white");
}


class node {
    constructor(id, cluster, name, svg, position = {"x":10,"y":10}, size = 15) {
        this.svg = svg;
        this.x = position.x;
        this.y = position.y;
        this.size = size;
        this.name = name;
        this.cluster = cluster;
        this.variable = name.replace("!","");
        this.id = "_"+id.replace("!","not");
    }
    show(c = this.cluster, e = this.id) {
        this.svg.append("circle")
            .attr("cx", this.x)
            .attr("cy", this.y)
            .attr("r", this.size)
            .attr("class", "c_"+this.cluster+" "+"gadget")
            .attr("id", this.id)
            .attr("fill","white")
            .attr("stroke","black")
            .on("mouseover", function () {
                showCluster(c);
                showElement(e);
            })
            .on("mouseout", function () {
                clear();
            })
        this.svg.append("text")
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("stroke", "black")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", 1 / 1.5 * this.size + "px")
            .text(this.name)
            .on("mouseover", function () {
                showCluster(c);
                showElement(e);
            })
            .on("mouseout", function () {
                clear();
            })
    }
    X() {
        return this.x;
    }
    Y() {
        return this.y;
    }
    Size() {
        return this.size;
    }
    Name() {
        return this.name;
    }
    Cluster() {
        return this.cluster;
    }
    Variable() {
        return this.variable;
    }
    Id() {
        return this.id;
    }


}

class edge {
    constructor(svg, A, B,) {
        this.svg = svg;
        this.A = A;
        this.B = B;
        svg.append("path")
            .attr("d", ("M " + A.X() + " " + A.Y()) + (" L " + B.X() + " " + B.Y()))
            .attr("stroke", "black")
    }
}

export {
    getClique
}