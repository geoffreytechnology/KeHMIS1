const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for job status
app.get('/job-status/:jobName', (req, res) => {
  // Get the job name from the request parameters
  const jobName = req.params.jobName;

  // Construct the Talend job status URL
  const talendUrl = `https://your-talend-url.com/job/${jobName}/status`;

  // Send a GET request to the Talend job status URL
  request.get({
    url: talendUrl,
    json: true
  }, (err, response, body) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting Talend job status');
    } else {
      res.send(body);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// This code creates an Express.js server and defines an endpoint /job-status/:jobName that accepts GET requests with the jobName parameter. It uses the body-parser middleware to parse incoming request bodies as JSON.

// Inside the endpoint function, it gets the job name from the request parameters and constructs the Talend job status URL by appending the job name to the base URL https://your-talend-url.com/job/ and adding /status to the end.

// The request.get method sends a GET request to the Talend job status URL. If there is an error getting the Talend job status, it logs the error to the console and sends a 500 response to the client. Otherwise, it sends the job status as a response.

// You can customize this code to fit your specific needs, such as changing the endpoint URL or modifying the response format.