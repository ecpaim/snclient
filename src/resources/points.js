let nPoints = 32; // number of discrete points of circle to print
let centerX = 230; // definition of circle
let centerY = 230;
let radius = 160;

let increment = Math.PI*2/nPoints;
let X;
let Y;
let answerX = centerX + radius;
let answerY = centerY;
for(let i = 1; i < nPoints; i++){
    X = centerX + Math.cos(increment*i)*radius;
    Y = centerY + Math.sin(increment*i)*radius;
    answerX += " ; " + X.toFixed(3);
    answerY += " ; " + Y.toFixed(3);
}
answerX += " ; " + (centerX + radius);
answerY += " ; " + centerY;
console.log(answerX);
console.log(answerY);

