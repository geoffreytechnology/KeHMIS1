const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for job triggering
app.post('/trigger-job', (req, res) => {
  // Get the job name and parameters from the request body
  const jobName = req.body.jobName;
  const jobParams = req.body.jobParams;

  // Construct the Talend job trigger URL
  const talendUrl = `https://your-talend-url.com/job/${jobName}/start`;

  // Send a POST request to the Talend job trigger URL with the job parameters
  request.post({
    url: talendUrl,
    json: true,
    body: jobParams
  }, (err, response, body) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error triggering Talend job');
    } else {
      res.send('Talend job triggered successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// This code creates an Express.js server and defines an endpoint /trigger-job that accepts POST requests. It uses the body-parser middleware to parse the incoming request body as JSON.

// Inside the endpoint function, it gets the job name and parameters from the request body. It then constructs the Talend job trigger URL by appending the job name to the base URL https://your-talend-url.com/job/ and adding /start to the end. The jobParams object is sent as JSON in the request body.

// The request.post method sends a POST request to the Talend job trigger URL with the job parameters. If there is an error triggering the Talend job, it logs the error to the console and sends a 500 response to the client. Otherwise, it sends a success response.

// You can customize this code to fit your specific needs, such as changing the endpoint URL or modifying the job parameters before triggering the Talend job.