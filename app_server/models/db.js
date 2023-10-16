const mongoose = require('mongoose');
const readLine = require('readline');

let dbURL = 'mongodb+srv://sanjay:qZyMOVSYvkgft48V@cluster0.8wsu9j8.mongodb.net/?retryWrites=true&w=majority';
if (process.env.NODE_ENV === 'production') {
  dbURL = process.env.DB_HOST || process.env.MONGODB_URI;
}

mongoose.connect("mongodb+srv://sanjay:qZyMOVSYvkgft48V@cluster0.8wsu9j8.mongodb.net/?retryWrites=true&w=majority");


mongoose.connection.on('connected', () => {
  console.log('connected');
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log('Mongoose disconnected through ${msg}');
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});


require('./menu-models');