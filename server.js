const hapi = require('hapi');
const server = new hapi.Server();
const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://localhost:27017/hapi_db';
//const Company = require('./models/company.model');
const companyRoutes = require('./routes/company.route');
var jwt = require('jsonwebtoken');

//connect with mongoDB
mongoose.connect(mongoDbUri, {
    useMongoClient: true
});
mongoose.connection.on('connected', () => {
    console.log(`app is connected to ${mongoDbUri}`);
});
mongoose.connection.on('error', err => {
    console.log('error while connecting to mongodb', err);
});
server.connection({
    host: 'localhost',
    port: '3000'
});
server.route({
    path: '/',
    method: 'GET',
    handler(req, reply) {
        reply('Welcome to HapiJs course!!');
    }
});
server.route({
    path:'/api/login',
    method:'POST',
    handler(req,reply) {
      const user = {id:3};
      const token = jwt.sign({user}, 'my_secrete_key');
      reply.json({
          token:token

      })
    }
    });


server.route(companyRoutes);

server.start(err => {
    if (err) {
        throw err;
    }
    console.log(`Server Running at PORT ${server.info.port}`);
});