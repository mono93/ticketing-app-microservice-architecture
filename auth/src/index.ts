import express from "express";

const app = express();
app.use(express.json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!");
});

app.listen(8080, () => {
  console.log("Running on port 8080!");
});
