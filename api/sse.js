// Server Sent Event
import cors from "../middleware/cors.js";

const sse = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.write("retry: 1000\n\n");
  res.write(`data: ${new Date().toISOString()}\n\n`);
  const interval = setInterval(() => {
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }, 1000);

  req.connection.addListener(
    "close",
    () => {
      clearInterval(interval);
    },
    false,
  );
};

export default cors(sse);
