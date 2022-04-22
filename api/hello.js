const hello = (req, res) => {
    /* #swagger.parameters['name'] = {
        in: 'body',
        description: 'Some description...'
    } */
    const name = req.body.name;
    console.log(name);
    res.status(200).json({ "hello": name });
}

export default hello;

const goodbye = (req, res) => {
    // #swagger.description = 'Send bye...'
    console.log("bye...")
    res.send("bye...")
}

const slow = async (req, res) => {
    console.log("start to do very slow jobs...")
    await sleep(6000)
    console.log("finally end! try to send response...")
    res.status(200).json({ "slow": "response" })
}

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

export {
    goodbye, slow
}
