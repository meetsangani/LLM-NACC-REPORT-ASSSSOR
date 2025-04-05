const { Graph } = require('../../models/analysis/Graph');

function generateGraph(data) {
    const graph = new Graph();
    
    // Assuming data is an array of objects with x and y properties
    data.forEach(point => {
        graph.addPoint(point.x, point.y);
    });

    return graph;
}

module.exports = {
    generateGraph,
};