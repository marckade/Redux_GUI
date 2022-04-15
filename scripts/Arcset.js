

class Arcset{

	constructor(aN,aL){
		this.width = 400;
		this.height = 400;
		this.altNodes = aN;
		this.altLinks = aL;
	//ticked();
	}
	}

	var nodesTest = [
		{id: 'A',name:"ALEX"},
		{id: 'B',name:"BAYDEN"},
		{id: 'C',name:"CALEB"},
		{id: 'D',name:"Daniel"},
		{id: 'E',name:"Elliot"}

	]
	
	var edgesTest = [
	
	{source:'A',target:'B'},
	{source:'B',target:'C'},
	{source:'C',target:'A'},
	{source:'C',target:'D'},
	{source:'E',target:'D'}


	]

	linkTest = [
		{source: 0,target: 1},
		{source: 1,target: 2},
		{source: 2,target: 3}
	]
	
	var graph = new Arcset(nodesTest,edgesTest);
	
var width = graph.width;
var height = graph.height;
//var width = 400;
//var height = 400;
//var altNodes = nodesTest;
 //var altLinks = linkTest;
var altNodes = graph.altNodes;
var altLinks = graph.altLinks;


//.id(function(d) { return d.id; }
var simulation = d3.forceSimulation(altNodes)
.force('charge', d3.forceManyBody().strength(-1000))
.force('center', d3.forceCenter(width / 2, height / 2))
.force('link', d3.forceLink().links(altLinks).id(function(d) { return d.id; }))
.on('tick', ticked);


function createClasses(){
	document.getElementById("reduceInstanceSvg").innerHTML+='<g class="links"></g>';
	document.getElementById("reduceInstanceSvg").innerHTML+='<g class="nodes"></g>';
	document.getElementById("reduceInstanceSvg").innerHTML+='<g class="circles"></g>';
	document.getElementById("reduceInstanceSvg").innerHTML+='<g class="pointers"></g>';

	
}
createClasses();

 function updateLinks() {
	var u = d3.select('.links') 
		.selectAll('line')
		.data(altLinks)
		.join('line')
		.attr('x1', function(d) {
			//console.log(d.source.x)
			return d.source.x
		})
		.attr('y1', function(d) {
			return d.source.y
		})
		.attr('x2', function(d) {
			return d.target.x
		})
		.attr('y2', function(d) {
			return d.target.y
		});
		return u;
}

 function updateNodes() {
	var u = d3.select('.nodes')
		.selectAll('text')
		.data(altNodes)
		.join('text')
		//.attr("r",100)
		.style("fill","#DBA")
		.text(function(d) {
			return d.name;
		})
		.attr('x', function(d) {
			return d.x+15;
		})
		.attr('y', function(d) {
			return d.y
		})
		.attr('dy', function(d) {
			return 5
		})
		return u; //u = svg g object class = nodes
	
	}

	function updateCircles(){
		var u = d3.select(".circles")
		.selectAll('circle')
		.data(altNodes)
		.join('circle')
		.style('fill','orange')
		.attr('r',10)
		.attr('cx',function(d){
			return d.x;
		})
		.attr('cy',function(d){
			return d.y;
		})
		
	}

	function updateArrows(){
		var u = d3.select(".pointers")
		.selectAll('circle')
		.data(altLinks)
		.join('circle')
		.style('fill','blue')
		.attr('r',5)
		.attr('cx',function(d){
			//console.log(d.target.x)
			return d.target.x - (1/6)*(d.target.x-d.source.x);
		})
		.attr('cy',function(d){
			return d.target.y - (1/6)*(d.target.y-d.source.y);
		})
		//.attr('height',50)
		//.attr('width',50)
	}

	function testTriangle(){
		var triangle = d3.symbol().type(d3.symbolTriangle).size(100);
		var translateStrx = 50
		var translateStry = 100;
		var translateStrRotate = 60;
		//var translateString = "translate("+translateStrx+ ","+translateStry+")";

		var u = d3.select(".pointers")
		.selectAll('path')
		.data(altLinks)
		.join('path')
		.attr("d",triangle)
		.attr("fill", "green")
        .attr("transform", function(d){
			 translateStrx = d.target.x - (1/6)*(d.target.x-d.source.x);
			 translateStry = d.target.y - (1/6)*(d.target.y-d.source.y);
			 translateStringCoords =  "translate("+translateStrx+ ","+translateStry+")";
			 translateStringRotate = "rotate("+translateStrRotate+")";
			var totalTranslation = translateStringCoords+ " "+translateStringRotate;
			
			
			//console.log(translateString);
			//return translateStringCoords;
			return totalTranslation;
		});
	}

function ticked() {
	var linksSvg = updateLinks();
	var arrowsSvg = updateCircles();
	var nodesSvg = updateNodes();
	var pointerSvg = updateArrows();
	var testtriangle = testTriangle();
	var totalSvg = d3.selectAll('g');
	//console.log("total",totalSvg);
	//console.log("links",updateLinks())

	return [totalSvg];

}




