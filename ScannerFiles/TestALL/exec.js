const { exec } = require('child_process');
// Ping google three times
exec('ping -c 3 google.com', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.eror(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});