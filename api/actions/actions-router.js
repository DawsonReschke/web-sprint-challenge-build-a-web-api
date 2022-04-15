// Write your "actions" router here!
const express = require ('express')
const server = express.Router(); 
const actionDB = require('./actions-model')
const {
    verifyActionExists,
    validateActionBodyPOST,
    validateActionBodyPUT
} = require('./actions-middlware')


server.get('/',(req,res,next)=>{
    actionDB.get()
        .then(actions=>{
            res.json(actions);
        })
        .catch(e=>{
            next({status:500,message:'cannot get db entries'})
        })
        
})
server.get('/:id',verifyActionExists,(req,res,next)=>{
    res.json(req.action)
})
server.post('/',validateActionBodyPOST,(req,res)=>{
    actionDB.insert(req.body)
        .then(inserted => res.json(inserted))
        .catch(e=>console.log(e))
})
server.put('/:id',validateActionBodyPUT,verifyActionExists,(req,res,next)=>{
    actionDB.update(req.params.id,req.body)
        .then(updated=>res.json({...req.action,...req.body,a:5}))
        .catch(e=>console.log(e))
})
server.delete('/:id',verifyActionExists,(req,res,next)=>{
    actionDB.remove(req.params.id)
        .then(removed=>res.json(req.action))
        .catch(e=>{next({status:500,message:'internal server error'})})
})


module.exports = server