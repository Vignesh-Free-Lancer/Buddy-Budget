const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    // const conn = await mongoose.connect(
    //   process.env.MONGODB_URI,
    //   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    //   () => {
    //     console.log("Connected to MongoDB");
    //   }
    // );

    console.log(`MongoDB: ${conn.connection.host}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = connectDB;
