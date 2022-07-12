import * as d3 from 'd3'
import dynamic from "next/dynamic";


// let data = [
//     [
//         "x1",
//         "!x2",
//         "x3"
//     ],
//     [
//         "!x1",
//         "x3",
//         "x1"
//     ],
//     [
//         "x2",
//         "!x3",
//         "x1"
//     ],
// ]
const width = 600;
const height = 600;


let clauses = [];
let literals = [];
function getSat3(divID,data) {
    
   // var element = d3.select("#" + divID);
    //var width = element.node().getBoundingClientRect().width;
    //console.log(width);
    //var parentWidth = element.getBoundingClientRect().width;
    //width = parentWidth;   
    let svg = new d3.select("#"+divID).append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("class", "all");
    // new clause("a",svg,100,200,["X","Y","Z"]).show();
    let x = 20;
    let y = 100;
    console.log(data.length, "length")
    for (let i = 0; i < data.length; i++){
        console.log("x", i, x);
        let c = new clause(i, svg, x, y, [data[i][0], data[i][1], data[i][2]], 15);
        c.show();
        console.log("width", i, width - c.width, width);
        x += c.width + 10;
        console.log(x,(width-c.width))
        if (x >= width - c.width) {
            console.log('greater than width')
            x = 20;
            y += 50
        }
    }

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

class literal{
    constructor(id, className, name, svg, x, y, size = 20){
        this.id = "_"+id.replace("!","not");
        this.className = className;
        this.name = name;
        this.svg = svg;
        this.x = x;
        this.y = y;
        this.size = size;
    }
    show(c = this.className, e = this.id){
        this.svg.append("rect")
            .attr("x", this.x)
            .attr("y", this.y-this.size/2)
            .attr("fill", "white")
            .attr("height", this.size)
            .attr("width", this.size*this.name.length)
            .attr("id", this.id)
            .attr("class", "c_"+this.className+" gadget")
            .on("mouseover", function () {
                showCluster(c)
                showElement(e);
            })
            .on("mouseout", function () {
                clear();
            })
        this.svg.append("text")
            .attr("class", this.className)
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("text-anchor", "left")
            .attr("dominant-baseline", "middle")
            .attr("font-size", this.size+"px")
            .text(this.name)
            .on("mouseover", function () {
                showCluster(c);
                showElement(e);
            })
            .on("mouseout", function () {
                clear();
            })

    }
}

class clause{
    constructor(className,svg,x,y,literals,size = 20){
        this.className = className;
        this.svg = svg;
        this.x = x;
        this.y = y;
        this.size = size;
        this.literalsIDs = [];
        for (let i=0; i<literals.length; i++){
            this.literalsIDs[i] = literals[i] + "_"+(i + className*3);
        }
        this.literals = literals
        this.width = 0;
        //012 345 678
        //
    }
    show(c = this.className){
        let l1 = new literal(this.literalsIDs[0], this.className, this.literals[0], this.svg, (this.x + this.size), this.y, this.size);
        let l2 = new literal(this.literalsIDs[1], this.className, this.literals[1], this.svg, (this.x + this.size*2 + l1.size*l1.name.length), this.y, this.size);   
        let l3 = new literal(this.literalsIDs[2], this.className, this.literals[2], this.svg, (this.x + this.size*3 + l1.size*l1.name.length + l2.size*l2.name.length), this.y, this.size);
        this.width = this.size*3 + l1.size*l1.name.length + l2.size*l2.name.length + l3.size*l3.name.length + this.size/2;
        this.svg.append("rect")
            .attr("x", this.x)
            .attr("y", this.y-this.size)
            .attr("fill", "white")
            .attr("height", this.size*2)
            .attr("width", this.width)
            .attr("class", "c_"+this.className+" gadget")
            .on("mouseover", function () {
                showCluster(c);
            })
            .on("mouseout", function () {
                clear();
            })
        this.svg.append("text")
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("text-anchor", "left")
            .attr("dominant-baseline", "middle")
            .attr("font-size", this.size+"px")
            .text("(");
        l1.show();
        console.log(this.literals);
        this.svg.append("text")
            .attr("x", this.x + this.size + l1.size*l1.name.length)
            .attr("y", this.y)
            .attr("text-anchor", "left")
            .attr("dominant-baseline", "middle")
            .attr("font-size", this.size+"px")
            .text("\u2228");
        l2.show();     
        this.svg.append("text")
            .attr("x", this.x + this.size*2 + l1.size*l1.name.length + l2.size*l2.name.length)
            .attr("y", this.y)
            .attr("text-anchor", "left")
            .attr("dominant-baseline", "middle")
            .attr("font-size", this.size+"px")
            .text("\u2228");
        l3.show();
        this.svg.append("text")
            .attr("x", this.x + this.size*3 + l1.size*l1.name.length + l2.size*l2.name.length + l3.size*l3.name.length)
            .attr("y", this.y)
            .attr("text-anchor", "left")
            .attr("dominant-baseline", "middle")
            .attr("font-size", this.size+"px")
            .text(")");
       
        // this.
    }
}

export{
    getSat3
}