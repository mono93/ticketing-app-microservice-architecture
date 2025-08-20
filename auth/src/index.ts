import mongoose from "mongoose";

import { app } from "./app";

const applicationStartUp = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(8080, () => {
    console.log("Running on port 8080");
  });
};

applicationStartUp();
