const hello = (req, res) => {
  // #swagger.description = 'Send Hello...'
  /* #swagger.parameters['name'] = {
        in: 'body',
        description: 'Your name...'
     } */
  const { name } = req.body;
  res.status(200).json({ hello: `${name}` });
};

const goodbye = (req, res) => {
  // #swagger.description = 'Send bye...'
  const { name } = req.params;
  res.send(`bye...${name}`);
};

const slow = async (req, res) => {
  console.log("start to do very slow jobs...");
  await sleep(6000);
  console.log("finally end! try to send response...");
  res.status(200).json({ slow: "response" });
};

const sleep = async (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export default hello;
export { goodbye, slow };
