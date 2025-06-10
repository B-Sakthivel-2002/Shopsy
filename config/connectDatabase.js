const mongoose = require('mongoose');

const connectDatabase = () => {
     mongoose.set('strictQuery', false); 
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((con) => {
    console.log("✅ MongoDB Connected: " + con.connection.host);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit on failure
  });
};

module.exports = connectDatabase;
