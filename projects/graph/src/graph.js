/**
 * Edge
 */
export class Edge {
  // !!! IMPLEMENT ME
  constructor(destination, weight = 1) {
    this.destination = destination;
    this.weight = weight;
  }
}

/**
 * Vertex
 */
export class Vertex {
  // !!! IMPLEMENT ME
  constructor(value = 'vertex',pos = {x: 0, y: 0}) {
    this.edges = [];
    this.value = value;
    this.pos = pos;
  }
}

/**
 * Graph
 */
export class Graph {
  constructor() {
    this.vertexes = [];
  }

  // debugCreateTestData(){
  //   let debugVertex1 = new Vertex('d1', {x:100, y: 100});
  //   let debugVertex2 = new Vertex('d2', {x: 250, y: 200});

  //   let debugEdge1 = new Edge(debugVertex2);

  //   debugVertex1.edges.push(debugEdge1);

  //   this.vertexes.push(debugVertex1, debugVertex2);
  // }

  /**
   * Create a random graph
   */
  randomize(width, height, pxBox, probability=0.6) {
    // Helper function to set up two-way edges
    function connectVerts(v0, v1) {
      v0.edges.push(new Edge(v1));
      v1.edges.push(new Edge(v0));
    }

    let count = 0;

    // Build a grid of verts
    let grid = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        let v = new Vertex();
        //v.value = 'v' + x + ',' + y;
        v.value = 'v' + count++;
        row.push(v);
      }
      grid.push(row);
    }

    // Go through the grid randomly hooking up edges
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Connect down
        if (y < height - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y+1][x]);
          }
        }

        // Connect right
        if (x < width - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y][x+1]);
          }
        }
      }
    }

    // Last pass, set the x and y coordinates for drawing
    const boxBuffer = 0.8;
    const boxInner = pxBox * boxBuffer;
    const boxInnerOffset = (pxBox - boxInner) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid[y][x].pos = {
          'x': (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
          'y': (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0
        };
      }
    }

    // Finally, add everything in our grid to the vertexes in this Graph
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.vertexes.push(grid[y][x]);
      }
    }
  }

  /**
   * Dump graph data to the console
   */
  dump() {
    let s;

    for (let v of this.vertexes) {
      if (v.pos) {
        s = v.value + ' (' + v.pos.x + ',' + v.pos.y + '):';
      } else {
        s = v.value + ':';
      }

      for (let e of v.edges) {
        s += ` ${e.destination.value}`;
      }
      console.log(s);
    }
  }

  // need to get found arrays out of functions
  // have bfs return an array and have getConnectedComponents return an array of arrays
  // declare our array of arrays in graph and change it directly

  /**
   * BFS
   */
  bfs(start) {
    // !!! IMPLEMENT ME
    const queue = [];
    const found = [];

    queue.push(start);
    found.push(start);

    start.visited = false;
    
    while (queue.length > 0) {
      let firstVertex = queue[0];
      
      for (let edge of firstVertex.edges) {
        const neighborEdge = edge.destination;
        
        if (!found.includes(neighborEdge)) {
          neighborEdge.visited = true;
          queue.push(neighborEdge);
          found.push(neighborEdge);
        }
      }
      queue.shift();
    }
    return found;
    // add the start vertex to the queue
    // add the start vertex to the current found array
    // go to the first item in the queue
      // if queue is empty, stop
    // check the first vertex for neighbors
      // for each new neighbor found, add to current found array and queue
    // dequeue the first item in the queue
    // goto 3
  }

  /**
   * Get the connected components
   */
  getConnectedComponents() {
    // !!! IMPLEMENT ME
    let connectedComponents = [];
    // loop through the list of vertex, for each unfound vertex
    // do BFS for that item (start)
    for (let vertex of this.vertexes) {
      if (!vertex.visited)
        connectedComponents.push(this.bfs(vertex));
    }
    return connectedComponents;
  }
}
