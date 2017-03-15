var g = new Graph();

g.addVertex('A', {B: 1, C: 1, D:1.2});
g.addVertex('B', {A: 1, D: 1});
g.addVertex('C', {A: 1});
g.addVertex('D', {D: 1.2,B:1});


var path = g.shortestPath('A','D').concat(['A']).reverse();
console.log(g.calcDistance(path));
