import cors from "../middleware/cors.js";
import fetch from "node-fetch";
import "dotenv/config";

const iftttKey = process.env.IFTTT_KEY;
const defaultImageUrl =
  "https://s3.bmp.ovh/imgs/2022/04/09/5da9d13f02880f41.png";
const defaultEventName = "event";

const fetchWebhook = async (eventName, value1, value2, value3) => {
  const url = `https://maker.ifttt.com/trigger/${eventName}/with/key/${iftttKey}`;
  const body = { value1, value2, value3 };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.text();
  console.log(result);
  return response;
};

/**
#swagger.description = 'Send message to IFTTT Webhook'
*/
const sendToIfttt = async (req, res) => {
  let { event, text, link, imgUrl } = req.query;
  // console.log(`Sending to IFTTT: ${event} ${text} ${link} ${imgUrl}`);
  if (event == "" || event == undefined || event == "undefined") {
    event = defaultEventName;
  }
  if (imgUrl == "" || imgUrl == undefined || imgUrl == "undefined") {
    imgUrl = defaultImageUrl;
  }
  const response = await fetchWebhook(event, text, link, imgUrl);
  res.send({ event, text, link, imgUrl, responseStatus: response.status });
};

export default cors(sendToIfttt);
export { sendToIfttt };
