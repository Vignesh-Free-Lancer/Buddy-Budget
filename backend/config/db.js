const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Here URI mentioned mongodb compass
    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    // Here URI mentioned mongodb cluster
    const url = process.env.MONGODB_URI;
    // const conn = await mongoose.connect(url, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    // const conn = await mongoose.connect(url);

    mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_AUTH_USERNAME}:${process.env.MONGODB_AUTH_PASSWORD}@cluster0.fnyrs.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    );
    mongoose.connection
      .once("open", function () {
        console.log("Conection has been made!");
      })
      .on("error", function (error) {
        console.log("Error is: ", error);
      });
    // console.log(`MongoDB: ${conn.connection.host}`);
  } catch (e) {
    console.log("Error", e);
  }
};

module.exports = connectDB;
