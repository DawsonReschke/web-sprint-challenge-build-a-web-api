// add middlewares here related to projects
const projectDB = require('./projects-model')
const verifyProjectExists = async(req,res,next) => {
    const {id} = req.params
    if(!id) next({status: 500,message:'internal server error'})
    const exists = await projectDB.get(id); 
    if(!exists) return next({status:404,message:'project not found'})
    req.project = exists
next()
}

const validateBodyPOST = (req,res,next) => { 
    const {body} = req
    if(!body.description || !body.name) return next({status:400,message:'A project requires a name and description'})
    next(); 
}
const validateBodyPUT = (req,res,next) => { 
    const {body} = req
    if(!body.description || !body.name || typeof body.completed === 'undefined') return next({status:400,message:'A project requires a name and description'})
    next(); 
}

module.exports = {
    verifyProjectExists,
    validateBodyPOST,
    validateBodyPUT
}