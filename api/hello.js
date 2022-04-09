
const hello = (req, res) => {
    res.send("hello");
}

export default hello;

const goodbye = (req, res) => {
    res.send("bye...")
}

export {
    goodbye
}
