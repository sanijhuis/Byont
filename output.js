const { exec } = require('child_process');
const readline = require('readline');

// create a readline interface to ask for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ask for user input
rl.question('What is your name? ', (name) => {
  // run the shell script and pass the user's name as an argument
  exec(`./bash.sh ${name}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  // close the readline interface
  rl.close();
});