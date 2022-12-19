const { run }= require('./core');

const dataProcessed = run();

console.log(JSON.stringify(dataProcessed,null, 2));