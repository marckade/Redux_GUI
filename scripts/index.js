// Create a request variable and assign a new XMLHttpRequest object to it to allow for Web API calls
var request = new XMLHttpRequest()


// Solve button
document.getElementById('solveButton').addEventListener('click', () => {
  console.log('Solve button clicked')
});

// Verify button
document.getElementById('verifyButton').addEventListener('click', () => {
  console.log('Verify button clicked')
});

// ------ Problem Dropdown ------ //

var problems = [
  // {label: '3SAT', value: '3SAT'},
  // {label: '3STAR', value: '3STAR'},
  // Populated upon onLoad via Web API
];

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:27000/navigation/NPC_Problems', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  console.log(data)
  data.forEach(element => {
    var newLabel = {label: element, value: element}
    problems.push(newLabel)
  });
  
}
// Send request
request.send()

// Problem Info button
document.getElementById('problemInfo').addEventListener('click', () => {
  console.log('Info button clicked')

  try {
    var problemSelection = document.getElementById('problemsAutocomplete').value

    // Check if the problem has a prepended type
    if (problemSelection.includes('_')) {
      problemSelection = problemSelection.split('_')[1]
    }
    var route = 'http://localhost:27000/' + problemSelection + "Generic"
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)

    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        var data = JSON.parse(this.response)

        // Populate problem description
        $("#problemInfo").popover("dispose").popover({
          title: "Problem Information",
          content: problemSelection + ": " + data.formalDefinition
        });
        $("#problemInfo").popover("show");}
  }
      // Send request
      request.send()
  }
  catch(error) {

    // Populate it with "Problem not found" NOT BEING CALLED FOR SOME REASON
    $("#problemInfo").popover("dispose").popover({
      title: "Problem Information",
      content: "Problem not selected or problem not available"
    });
    $("#problemInfo").popover("show");
    console.log("hitting this")
    console.error(error);
  }
  
});

// Problem Instance Field
var myCollapse = document.getElementById("collapseArea");
myCollapse.addEventListener("show.bs.collapse", function(){
  console.log("Testing mate")

  try {
    var problemSelection = document.getElementById('problemsAutocomplete').value

    // Check if the problem has a prepended type
    if (problemSelection.includes('_')) {
      problemSelection = problemSelection.split('_')[1]
    }

    var route = 'http://localhost:27000/' + problemSelection + "Generic"
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)

    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        var data = JSON.parse(this.response)
        document.getElementById('problemInstanceText').value = data.defaultInstance
      }
  }
      // Send request
      request.send()
  }
  catch(error) {
    // Populate it with "Problem not found" NOT BEING CALLED FOR SOME REASON
    $("#problemInfo").popover("dispose").popover({
      title: "Problem Information",
      content: "Problem not selected or problem not available"
    });
    $("#problemInfo").popover("show");
    console.log("hitting this")
    console.error(error);
  }
});


// ------ Reduce to Dropdown ------ //

// Populate the ReduceTo Field
var reduceTo = [
  //{label: 'CLIQUE', value: 'CLIQUE'},
  //{label: 'Clustering', value: 'Clustering'},
  // Populated upon onLoad via Web API
];

document.getElementById('reduceToAutocomplete').addEventListener('click', () => {
  console.log('Info button clicked')

  try {
    var problemSelection = document.getElementById('problemsAutocomplete').value
    console.log(problemSelection)
    var route = 'http://localhost:27000/Navigation/Problem_Reductions?chosenProblem=' + problemSelection
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)
    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        // Begin accessing JSON data here and parse it out into the reduceTo array
        var data = JSON.parse(this.response)
        console.log(data)
        data.forEach(element => {
          var newLabel = {label: element, value: element}
          reduceTo.push(newLabel)
  });
      }
  }
      // Send request
      request.send()
  }
  catch(error) {
    console.error(error);
  }
  
}, {once : true}); // Might want to remove the once rule. Will talk to paul about this


// Populate the SelectReduction Field
var reductions = [
  //{label: "Paul's reduction", value: "Paul's reduction"},
  //{label: 'Power reduction', value: 'Power reduction'},
  // Populated upon onLoad via Web API
];

document.getElementById('reductionsAutocomplete').addEventListener('click', () => {
  console.log('Info button clicked')

  try {
    var problemFromSelection = document.getElementById('problemsAutocomplete').value
    var problemToSelection = document.getElementById('reduceToAutocomplete').value

    var route = 'http://localhost:27000/Navigation/PossibleReductions?reducingFrom=' + problemFromSelection +
                '&reducingTo=' + problemToSelection
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)
    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        // Begin accessing JSON data here and parse it out into the reduceTo array
        var data = JSON.parse(this.response)
        console.log(data)
        data.forEach(element => {
          var newLabel = {label: element.split('.')[0], value: element.split('.')[0]}
          reductions.push(newLabel)
  });
      }
  }
      // Send request
      request.send()
  }
  catch(error) {
    console.error(error);
  }
  
}, {once : true}); // Might want to remove the once rule. Will talk to paul about this

// ReductionTo Info button
document.getElementById('reductionToInfo').addEventListener('click', () => {

  try {
    var problemSelection = document.getElementById('reduceToAutocomplete').value

    // Check if the problem has a prepended type
    if (problemSelection.includes('_')) {
      problemSelection = problemSelection.split('_')[1]
    }
    var route = 'http://localhost:27000/' + problemSelection + "Generic"
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)

    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        var data = JSON.parse(this.response)

        // Populate problem description
        $("#reductionToInfo").popover("dispose").popover({
          title: "ReductionTo Problem Information",
          content: problemSelection + ": " + data.formalDefinition
        });
        $("#reductionToInfo").popover("show");}
  }
      // Send request
      request.send()
  }
  catch(error) {

    // Populate it with "Problem not found" NOT BEING CALLED FOR SOME REASON
    $("#reductionToInfo").popover("dispose").popover({
      title: "ReductionTo Problem Information",
      content: "Problem not selected or problem not available"
    });
    $("#reductionToInfo").popover("show");
    console.log("hitting this")
    console.error(error);
  }
  
});

// Reduction Info Button
document.getElementById('reductionInfo').addEventListener('click', () => {

  try {
    var reductionSelection = document.getElementById('reductionsAutocomplete').value

    // ChecSk if the problem has a prepended type
    if (reductionSelection.includes('_')) {
      reductionSelection = reductionSelection.split('_')[1]
    }
    var route = 'http://localhost:27000/' + reductionSelection
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)

    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        var data = JSON.parse(this.response)

        // Populate problem description
        $("#reductionInfo").popover("dispose").popover({
          title: "ReductionTo Problem Information",
          content: reductionSelection + ": " + data.reductionDefinition
        });
        $("#reductionInfo").popover("show");}
  }
      // Send request
      request.send()
  }
  catch(error) {

    // Populate it with "Problem not found" NOT BEING CALLED FOR SOME REASON
    $("#reductionInfo").popover("dispose").popover({
      title: "Problem Information",
      content: "Problem not selected or problem not available"
    });
    $("#reductionInfo").popover("show");
    console.log("hitting this")
    console.error(error);
  }
  
});

// Reduce Button Functionality
document.getElementById('reduceButton').addEventListener('click', () => {
  try {
    var reductionSelection = document.getElementById('reductionsAutocomplete').value

    // Check if the problem has a prepended type
    if (reductionSelection.includes('_')) {
      reductionSelection = reductionSelection.split('_')[1]
    }
    var route = 'http://localhost:27000/' + reductionSelection
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)

    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        var data = JSON.parse(this.response)
        document.getElementById('reduceInstanceText').textContent = data.reductionTo.G
      }
  }
      // Send request
      request.send()
  }
  catch(error) {
    console.error(error);
  }

});

// ------ Visualize Dropdown ------ //

document.getElementById('collapseArea3').addEventListener('show.bs.collapse', () => {

  var problemSelection = document.getElementById('problemsAutocomplete').value

  // Check if the problem has a prepended type
  if (problemSelection.includes('_')) {
    problemSelection = problemSelection.split('_')[1]
  }

  var scriptTag = document.getElementById('visualization');
  

  if(problemSelection === "GRAPHCOLORING"){
    scriptTag.src = "scripts/vertexColoring.js";
  }
  else if(problemSelection ==="ARCSET"){
    //console.log(problemSelection);
    //scriptTag.src = "scripts/Arcset.js";
    scriptTag.src = "scripts/Arcset.js";
  }

  else if(problemSelection ==="DM3"){
    //console.log(problemSelection);
    scriptTag.src = "scripts/DM3Generic.js";
    console.log("1");
  }
  else if(problemSelection ==="VERTEXCOVER"){
    //console.log(problemSelection);
    scriptTag.src = "scripts/VertexCover.js";
    // console.log(4);
  }


})

// document.getElementById('collapseArea3').addEventListener('hide.bs.collapse', () => {
//   console.log("og");
//   var scriptTag = document.getElementById('visualization');
//   scriptTag.src = "";
// })






// ------ Solve Dropdown ------ //

var solvers = [
  //{label: "Default CLIQUE solver (Greedy Heuristic Solver)", value: "Default CLIQUE solver (Greedy Heuristic Solver)"},
  // Populated upon onLoad via Web API
];

//Get Solver
document.getElementById('solversAutocomplete').addEventListener('click', () => {
  try {
    var problemFromSelection = document.getElementById('problemsAutocomplete').value

    var route = 'http://localhost:27000/Navigation/Problem_Solvers?chosenProblem=' + problemFromSelection

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)
    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        // Begin accessing JSON data here and parse it out into the reduceTo array
        var data = JSON.parse(this.response)
        console.log(data)
        data.forEach(element => {
          var newLabel = {label: element.split('.')[0], value: element.split('.')[0]}
          solvers.push(newLabel)
        });
      }
  }
      // Send request
      request.send()
  }
  catch(error) {
    console.error(error);
  }

}, {once : true});

// Get Solver Info
document.getElementById('solverInfo').addEventListener('click', () => {
  console.log('Info button clicked')

  try {
    var problemSelection = document.getElementById('problemsAutocomplete').value

    // Check if the problem has a prepended type
    if (problemSelection.includes('_')) {
      problemSelection = problemSelection.split('_')[1]
    }
    var route = 'http://localhost:27000/' + problemSelection + "Generic"
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', route, true)

    request.onload = function () {
      // Get the problem information and populate the problem dropdown
      if (this.response) {
        var data = JSON.parse(this.response)

        // Populate problem description
        $("#solverInfo").popover("dispose").popover({
          title: "Problem Information",
          content: problemSelection + ": " + data.formalDefinition
        });
        $("#solverInfo").popover("show");}
  }
      // Send request
      request.send()
  }
  catch(error) {

    // Populate it with "Problem not found" NOT BEING CALLED FOR SOME REASON
    $("#solverInfo").popover("dispose").popover({
      title: "Problem Information",
      content: "Problem not selected or problem not available"
    });
    $("#solverInfo").popover("show");
    console.log("hitting this")
    console.error(error);
  }
  
});

// Autocomplete fields


const problemsAC = new Autocomplete(document.getElementById('problemsAutocomplete'),{
  threshold: 1,
  data: problems
});

const reduceToAC = new Autocomplete(document.getElementById('reduceToAutocomplete'),{
  threshold: 1,
  data: reduceTo
});

const reductionsAC = new Autocomplete(document.getElementById('reductionsAutocomplete'),{
  threshold: 1,
  data: reductions
});

const solversAC = new Autocomplete(document.getElementById('solversAutocomplete'),{
  threshold: 1,
  data: solvers
});


var verifiers = [
  {label: "Default 3SAT verifier (Bodily's Verifier)", value: "Default 3SAT verifier (Bodily's Verifier)"},
];
const verifiersAC = new Autocomplete(document.getElementById('verifiersAutocomplete'),{
  threshold: 1,
  data: verifiers
});


// Enable popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
