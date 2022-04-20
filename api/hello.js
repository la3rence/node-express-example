
const hello = (req, res) => {
    res.send("hello");
}

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

export default hello;

const goodbye = (req, res) => {
    console.log("bye...")
    res.send("bye...")
}

const slow = async (req, res) => {
    console.log("start to do very slow jobs...")
    await sleep(6000)
    console.log("finally end! try to send response...")
    res.status(200).json({ "slow": "response" })
}

export {
    goodbye, slow
}
