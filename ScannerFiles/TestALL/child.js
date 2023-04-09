// Send a message to the father process
setTimeout(() => {
    process.send("Hello father, I send this information")
  }, 5000);