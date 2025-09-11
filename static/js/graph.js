// Interactive Neo4j Knowledge Graph JavaScript

// Graph data based on the example image
const graphData = {
    nodes: [
        // Classes (pink)
        { id: "DClass", type: "class", label: "DClass" },
        { id: "CClass", type: "class", label: "CClass" },
        { id: "SClass", type: "class", label: "SClass" },
        { id: "C2Class", type: "class", label: "C2Class" },
        { id: "MyClass", type: "class", label: "MyClass" },
        
        // Methods (blue)
        { id: "sal_func1", type: "method", label: "sal_func1" },
        { id: "sal_func1_copy", type: "method", label: "sal_func1" },
        { id: "func4", type: "method", label: "func4" },
        { id: "func1", type: "method", label: "func1" },
        { id: "func3", type: "method", label: "func3" },
        { id: "__init__", type: "method", label: "__init__" },
        { id: "__func2", type: "method", label: "__func2" },
        
        // Variables (orange)
        { id: "a", type: "variable", label: "a" },
        { id: "b", type: "variable", label: "b" },
        { id: "cat", type: "variable", label: "cat" },
        { id: "dog", type: "variable", label: "dog" },
        { id: "c", type: "variable", label: "c" },
        { id: "instance", type: "variable", label: "instance" },
        { id: "inheritance", type: "variable", label: "inheritance" }
    ],
    
    links: [
        // Class relationships
        { source: "DClass", target: "CClass", label: "INHERITS", type: "inherits" },
        { source: "CClass", target: "sal_func1", label: "HAS_METHOD", type: "has_method" },
        { source: "CClass", target: "a", label: "HAS_VARIABLE", type: "has_variable" },
        { source: "CClass", target: "cat", label: "HAS_VARIABLE", type: "has_variable" },
        
        // Method relationships
        { source: "sal_func1", target: "sal_func1_copy", label: "CALLS", type: "calls" },
        { source: "sal_func1", target: "func4", label: "CALLS", type: "calls" },
        { source: "sal_func1_copy", target: "func1", label: "CALLS", type: "calls" },
        { source: "func1", target: "func3", label: "CALLS", type: "calls" },
        
        // Variable relationships
        { source: "SClass", target: "inheritance", label: "HAS_VARIABLE", type: "has_variable" },
        { source: "SClass", target: "instance", label: "HAS_VARIABLE", type: "has_variable" },
        { source: "MyClass", target: "__init__", label: "HAS_METHOD", type: "has_method" },
        { source: "MyClass", target: "__func2", label: "HAS_METHOD", type: "has_method" },
        { source: "MyClass", target: "func3", label: "HAS_METHOD", type: "has_method" },
        
        // Cross-references
        { source: "func1", target: "b", label: "REFERENCES", type: "references" },
        { source: "__init__", target: "c", label: "REFERENCES", type: "references" },
        { source: "C2Class", target: "dog", label: "HAS_VARIABLE", type: "has_variable" }
    ]
};

let simulation, node, link, linkLabel, nodeLabel, tooltip;

function initializeGraph() {
    const width = 800;
    const height = 600;
    
    const svg = d3.select("#graph-svg")
        .attr("width", width)
        .attr("height", height);
    
    // Define arrow markers
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#999");
    
    // Create simulation
    simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(80))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(25));
    
    // Create links
    link = svg.append("g")
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("class", "link");
    
    // Create link labels
    linkLabel = svg.append("g")
        .selectAll("text")
        .data(graphData.links)
        .join("text")
        .attr("class", "link-label")
        .text(d => d.label);
    
    // Create nodes
    node = svg.append("g")
        .selectAll("circle")
        .data(graphData.nodes)
        .join("circle")
        .attr("class", d => `node ${d.type}`)
        .attr("r", d => d.type === "class" ? 22 : d.type === "method" ? 18 : 15)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // Create node labels
    nodeLabel = svg.append("g")
        .selectAll("text")
        .data(graphData.nodes)
        .join("text")
        .attr("class", "node-label")
        .text(d => d.label.length > 8 ? d.label.substring(0, 6) + "..." : d.label)
        .style("font-size", d => d.type === "class" ? "11px" : "10px");
    
    // Tooltip
    tooltip = d3.select("#tooltip");
    if (tooltip.empty()) {
        tooltip = d3.select("body").append("div").attr("id", "tooltip").attr("class", "tooltip");
    }
    
    // Node interactions
    node
        .on("mouseover", function(event, d) {
            tooltip
                .style("opacity", 1)
                .html(`<strong>${d.label}</strong><br>Type: ${d.type}<br>Click to highlight connections`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
            
            d3.select(this).style("stroke-width", "4px");
        })
        .on("mouseout", function(event, d) {
            tooltip.style("opacity", 0);
            d3.select(this).style("stroke-width", "2px");
        })
        .on("click", function(event, d) {
            highlightConnections(d);
        });
    
    // Update positions on simulation tick
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        linkLabel
            .attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2);
        
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        
        nodeLabel
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
    
    // Auto-restart animation every 10 seconds
    setInterval(() => {
        if (simulation.alpha() < 0.001) {
            simulation.alpha(0.1).restart();
        }
    }, 10000);
}

// Drag functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Highlight connections
function highlightConnections(selectedNode) {
    // Reset all elements
    node.style("opacity", 0.3);
    link.style("opacity", 0.1);
    linkLabel.style("opacity", 0.1);
    nodeLabel.style("opacity", 0.3);
    
    // Highlight selected node
    node.filter(d => d.id === selectedNode.id)
        .style("opacity", 1)
        .style("stroke-width", "4px");
    
    nodeLabel.filter(d => d.id === selectedNode.id)
        .style("opacity", 1);
    
    // Highlight connected elements
    const connectedNodes = new Set();
    connectedNodes.add(selectedNode.id);
    
    link.filter(d => d.source.id === selectedNode.id || d.target.id === selectedNode.id)
        .style("opacity", 0.8)
        .each(d => {
            connectedNodes.add(d.source.id);
            connectedNodes.add(d.target.id);
        });
    
    linkLabel.filter(d => d.source.id === selectedNode.id || d.target.id === selectedNode.id)
        .style("opacity", 0.8);
    
    node.filter(d => connectedNodes.has(d.id))
        .style("opacity", 1);
    
    nodeLabel.filter(d => connectedNodes.has(d.id))
        .style("opacity", 1);
    
    // Reset after 3 seconds
    setTimeout(resetHighlight, 3000);
}

function resetHighlight() {
    node.style("opacity", 1).style("stroke-width", "2px");
    link.style("opacity", 1);
    linkLabel.style("opacity", 1);
    nodeLabel.style("opacity", 1);
}

// Control functions - expose to global scope
window.restartSimulation = function() {
    if (simulation) {
        simulation.alpha(1).restart();
    }
}

window.centerGraph = function() {
    if (simulation) {
        const width = 800;
        const height = 600;
        simulation.force("center", d3.forceCenter(width / 2, height / 2));
        simulation.alpha(0.3).restart();
    }
}

window.randomizeLayout = function() {
    if (simulation) {
        const width = 800;
        const height = 600;
        graphData.nodes.forEach(d => {
            d.x = Math.random() * width;
            d.y = Math.random() * height;
        });
        simulation.alpha(1).restart();
    }
}

// Initialize graph when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing graph...');
    
    // Check if D3 is available
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not available!');
        return;
    }
    
    // Check if SVG element exists
    const svgElement = document.getElementById('graph-svg');
    if (!svgElement) {
        console.error('SVG element with id "graph-svg" not found!');
        return;
    }
    
    try {
        initializeGraph();
        console.log('Graph initialized successfully');
    } catch (error) {
        console.error('Error initializing graph:', error);
    }
});