const express = require("express");
const app = express();

// Get request with query parameters
app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  // Get the current day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time with validation of +/-2 hours
  const now = new Date();
  const utcTime = now.toISOString().replace(/\.\d+Z$/, "Z");

  // Construct the response JSON object
  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url:
      "https://github.com/Vestertech/HNGendpoint/blob/master/app.js",
    github_repo_url: "https://github.com/vestertech/HNGendpoint",
    status_code: 200,
  };

  // Send the JSON response
  res.json(response);
});

// Start the server on port 3100
const port = 3100;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}....`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
