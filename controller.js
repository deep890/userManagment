var userdb = require('../model/model');

// create and save new user 
exports.create = (req,res) =>{
    // validate request
    if(!req.body){
        res.status(400).send({message: 'Content can not be empty'})
        return;
    }
    // new user
    const user = new userdb({
        name: req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    // save user in db
    // promises - 
    user
        .save(user)
        .then(data=>{
            //res.send(data)
            res.redirect('/add-user')

        })
        .catch(err =>{
            res.status(500).send({message:err.message || 'some error occured while creating the user'})
            
        })
    
}
exports.find = (req,res) =>{
    if(req.query.id){
        const id = req.query.id
        userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Not found user with id ${id}`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: `Error retrieving user with id ${id}`})
    
        })
        // only fetching the id 
    }
    else{
        userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.send({message:`error retreiving user information`})
        })
        // fetching all the data

}

}
exports.update = (req,res) =>{
    if(!req.body){
        return res 
      .status(400)
        .send({message:`data to update cannot be empty`})

    }
    const id = req.params.id 
    userdb.findByIdAndUpdate(id,req.body,{userFindAndModify : false})
    .then(data =>{
        if(!data){
            res.status(404).send({message:`user not found`})
        }
        else{
            res.send(data)
        }
    }) 
    .catch(err =>{
        res.status(500).send({message:`error update user information`})
    })

     // update and delete ALWAYS require id   
    
}

exports.delete = (req,res) =>{
    const id = req.params.id 
    userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message:`check your id cannot delete it ${id}`})
        }
        else{
            res.send({message:`user is deleted`})
        }
    })
    .catch(err =>{
        res.stauts(500).send({message:`could not delete the user with id ${id}`})
    })

}


