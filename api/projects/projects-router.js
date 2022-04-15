// Write your "projects" router here!
const express = require('express'); 
const {    
    verifyProjectExists,
    validateBodyPOST,
    validateBodyPUT} = require('./projects-middleware')
const server = express.Router(); 
const projectDB = require('./projects-model')


server.get('/',(req,res,next)=>{
    projectDB.get()
        .then(entries=>res.json(entries))
        .catch(e=>next(e))
})

server.get('/:id/actions',verifyProjectExists,(req,res)=>{
    projectDB.getProjectActions(req.params.id)
        .then(actions=>res.json(actions))
        .catch(e=>console.log(e))
})

server.get('/:id',verifyProjectExists,(req,res)=>{
    res.json(req.project)
})

server.post('/',validateBodyPOST,(req,res)=>{
    projectDB.insert(req.body)
        .then(inserted=>res.json(inserted))
        .catch(e=>console.log(e))
})
server.put('/:id',validateBodyPUT,verifyProjectExists,(req,res)=>{
    projectDB.update(req.params.id,req.body)
        .then(updated=>res.json(updated))
        .catch(e=>console.log(e))
})
server.delete('/:id',verifyProjectExists,(req,res)=>{
    projectDB.remove(req.params.id)
        .then(removed=>res.json(removed))
        .catch(e=>console.log(e))
})

module.exports = server