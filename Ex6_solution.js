const prompt = require('prompt');

let matrix = [
    [],
    [],
    []
];

let paths = [];

let i = 0,
    c = 0;

//attempts to start paths from every number of the first 2 columns
function generatePaths() {
    for (let index1 = 0; index1 < 3; index1++) {
        for (let index2 = 0; index2 < 3; index2++) {
            followPath(matrix[index1][index2], [
                [index1, index2]
            ]);
        }
    }
}

//recursively follows the path and when it ends outputs it if it's longer than 2
function followPath(number, path) {
    let column = path.slice(-1).pop()[1];
    var terminate = true;
    for (let index = 0; index < 3; index++) {
        if (matrix[index][column+1] == number) {
            terminate = false;
            let newPath = path;
            newPath.push([index,column+1]);
            followPath(number,newPath);
        }
    }
    if (terminate && Object.keys(path).length > 2) {
        console.log({number,length:Object.keys(path).length, path});
        
    }
}

//recursively takes all numbers from the matrix via console input and starts the path searching algorithm once it's done
function getNumber() {
    prompt.get('cordinates' + c + '_' + i, function (err, result) {
        if (!err) {
            matrix[c][i] = parseInt(result['cordinates' + c + '_' + i], 10);
            if (i == 4 && c == 2) {
                generatePaths();
            } else if (i == 4) {
                i = 0;
                c++;
                getNumber();
            } else {
                i++
                getNumber();
            }
        }
    });
}

prompt.start();
getNumber();
