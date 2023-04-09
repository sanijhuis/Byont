const { fork } = require('child_process');
const subProcess = fork("./child.js");
// Receive message from child process
subProcess.on('message', (message) => {
  console.log(`I get this from the son : ${message}`);
});