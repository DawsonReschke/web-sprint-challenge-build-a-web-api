// add middlewares here related to actions
const actionDB = require('./actions-model')
const verifyActionExists = async (req,res,next) => {
    const {id} = req.params
    const action = await actionDB.get(id)
    if(!action) return next({status:404,message:'action not found'})
    req.action = action
    next();
}
const validateActionBodyPOST = (req,res,next) => { 
    const {body} = req 
    if(!body.notes || !body.description || !body.project_id) return next({status:400,message:'notes,description,projectid are required attributes'})
    next()
}
const validateActionBodyPUT = (req,res,next) => { 
    const {body} = req 
    if(!body.notes || !body.description || typeof body.completed !== 'boolean') return next({status:400,message:'notes,description,projectid are required attributes'})
    next()
}

module.exports = {
    verifyActionExists,
    validateActionBodyPOST,
    validateActionBodyPUT,
}