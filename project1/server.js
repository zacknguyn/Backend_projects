// TARGET: Create a server application
// URL: http://localhost:8383
// IP -> 127.0.0.1:8383
const express = require("express");
const app = express(); // Define backend application
const PORT = 8383;

let data = ["zack"];

// Middleware
app.use(express.json()); // EXPECT JSON DATA ON INCOMING REQUESTS

// ENDPOINT - HTTP VERBS (method) && Routes (or paths)

// Type 1 - Website endpoints (sends back HTML, typically come when a user enters a URL in browser)
app.get("/", (req, res) => {
  res.send(
    `<body style="background: pink; color: blue;">
    <h1>DATA:</h1>
      <p>${JSON.stringify(data)}</p>
      <a href="/dashboard">Dashboard</a>
    </body>`
  );
}); // REQUEST AND RESPOND

app.get("/dashboard", (req, res) => {
  res.send(`
    <body>
      <h1>Dashboard</h1>
      <a href="/">Home</a>
    </body>
    `);
});

// Type - 2 API endpoints (non visual)
// CRUD - create read update delete

// CRUD == method
// create == post
// read == get
// udpate == put
// delete == delete

app.get("/api/data", (req, res) => {
  console.log("This one was for data");
  res.status(599).send(data);
});

app.post("/api/data", (req, res) => {
  // Someone wants to create a user
  const newData = req.body;
  console.log(newData);
  data.push(newData.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("DELETED the element");
  res.send(203);
});

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`)); // Listening to incoming requests
