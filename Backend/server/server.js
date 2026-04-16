const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");

dotenv.config();

const INITIAL_PORT = parseInt(process.env.PORT || 5000, 10);

const startServer = async () => {
  await connectDB();

  const listenWithFallback = (port) => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`LuminEd LMS API running on port ${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        if (process.env.NODE_ENV === 'production') {
          console.error(`[Error] Port ${port} is in use. In production, this is fatal.`);
          process.exit(1);
        }
        console.warn(`[Warning] Port ${port} is in use, trying port ${port + 1}...`);
        listenWithFallback(port + 1);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });
  };

  listenWithFallback(INITIAL_PORT);
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

// Export app for Vercel Serverless Functions
module.exports = app;

