
function traverseTree(node, visitNode) {
    visitNode(node);

    if (node.children) {
        node.children.forEach(function(child) {
            traverseTree(child, visitNode);
        });
    }
}

const tree = {
    name: 'A',
    children: [
        {
            name: 'B',
            children: [
                {
                    name: 'C'
                },
                {
                    name: 'D'
                }
            ]
        },
        {
            name: 'E',
            children: [
                {
                    name: 'F'
                },
                {
                    name: 'G'
                }
            ]
        }
    ]
};

function visitNode(node) {
    console.log(node.name);
}

traverseTree(tree, visitNode);


