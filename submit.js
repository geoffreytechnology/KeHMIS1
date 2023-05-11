const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for data submission
app.post('/submit-data', (req, res) => {
  // Get the incoming data from the request body
  const data = req.body;

  // Send the data to Talend for processing
  request.post({
    url: 'https://your-talend-url.com/process-data',
    json: true,
    body: data
  }, (err, response, body) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error submitting data to Talend');
    } else {
      res.send('Data submitted to Talend for processing');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// This code creates an Express.js server and defines an endpoint /submit-data that accepts POST requests. It uses the body-parser middleware to parse the incoming request body as JSON.

// Inside the endpoint function, it gets the incoming data from the request body and sends it to Talend for processing using the request library. The request.post method sends a POST request to the Talend endpoint https://your-talend-url.com/process-data, with the JSON data in the request body.

// If there is an error submitting the data to Talend, it logs the error to the console and sends a 500 response to the client. Otherwise, it sends a success response.

// You can customize this code to fit your specific needs, such as changing the endpoint URL or modifying the data before submitting it to Talend.