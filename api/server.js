const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

const express = require('express');
const server = express();
server.use(express.json()); 

server.use('/api/projects',projectRouter)
server.use('/api/actions',actionRouter)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!



/** 
* Error handler  
*/
server.use((err,req,res,next)=>{
    res.status(err.status).json(err.message)
    next(); 
})

module.exports = server;
