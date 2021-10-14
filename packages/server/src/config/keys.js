module.exports = {
  app: {
    name: "MERN App",
    apiEndpoint: process.env.API_URL ? `/${process.env.API_URL}` : "/api",
  },
  database: {
    url:
      process.env.MONGODB_URI ||
      "mongodb+srv://CassandraT123:CassandraT123@kibblesandritz.mvb2v.mongodb.net/sample_dataset?retryWrites=true&w=majority", // for local mongodb
    // url: "mongodb+srv://CassandraT123:CassandraT123@kibblesandritz.mvb2v.mongodb.net/sample_dataset?retryWrites=true&w=majority" // for mongodb atlas, comment the above line, uncomment this line, and add your connection string.
  },
  jwt: {
    secret: process.env.JWT_SECRET || "jwt-secret",
    tokenLife: "7d",
  },
};
