const greeting = (req, res) => {
    console.log(greeting);
    res.send("greeting...");
}

const goodbye = (req, res) => {
    console.log("bye..");
    res.send("bye...");
}

export {
    greeting,
    goodbye
}