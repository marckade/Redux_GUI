// NOTE: Caleb - Temp fix for fixing visualization logic, should eventually be repaced with API info

const defaultSolvers = new Map([
    ["SAT3", "Sat3BacktrackingSolver"],
    ["CLIQUE", "CliqueBruteForce"],
    ["INDEPENDENTSET", "IndependentSetBruteForce"],
    ["VERTEXCOVER", "VertexCoverBruteForce"],
    ["ARCSET", "ArcSetBruteForce"],
    ["CUT","CutBruteForce"],
    ["CLIQUECOVER","CliqueCoverBruteForce"],
    ["GRAPHCOLORING","DanielBrelazSolver"],
    ["HAMILTONIAN","HamiltonianBruteForce"],
    ["STEINERTREE","SteinerTreeBruteForce"],
    ["WEIGHTEDCUT","WeightedCutBruteForce"],
    ["DIRHAMILTONIAN","DirectedHamiltonianBruteForce"],
    ["TSP","TSPBruteForce"]
])

export default defaultSolvers;