// NOTE: Caleb - Temp fix for fixing visualization logic, should eventually be repaced with API info

const defaultSolvers = new Map([
    ["SAT3", "Sat3BacktrackingSolver"],
    ["CLIQUE", "CliqueBruteForce"],
    ["VERTEXCOVER", "VertexCoverBruteForce"],
    ["ARCSET", "ArcSetBruteForce"],
    ["CUT","CutBruteForce"],
    ["CLIQUECOVER","CliqueCoverBruteForce"],
    ["GRAPHCOLORING","DanielBrelazSolver"],
    ["HAMILTONIAN","HamiltonianBruteForce"],
])

export default defaultSolvers;