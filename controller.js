var userdb = require('../model/model');

// create and save new user 
exports.create = (req,res) =>{
    // validate request
    if(!req.body){
        res.send({message:'content cannot be empty'})
        return;
    }
    // new user
    const user = new userdb({
        name: req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status,
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
            res.send({message:'some error occured while creating the user'})

        })
    
}
exports.find = (req,res) =>{
    if(req.query.id){
        const id = req.query.id
        userdb.findById(id)
        .then(data=>{
            if(!data){
                res.send({message:`USER NOT FOUND WITH ID ${id}`})

            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.send({message:`error retriving user with id ${id}`})
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
        res
        .send({message:`data to update cannot be empty`})

    }
    const id = req.params.id 
    userdb.findByIdAndUpdate(id,req.body)
    .then(data =>{
        if(!data){
            res.send({message:`user not found`})
        }
        else{
            res.send(data)
        }
    }) 
    .catch(err =>{
        res.send({message:`error update user information`})
    })

     // update and delete ALWAYS require id   
    
}

exports.delete = (req,res) =>{
    const id = req.params.id 
    userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.send({message:`check your id cannot delete it ${id}`})
        }
        else{
            res.send({message:`user is deleted`})
        }
    })
    .catch(err =>{
        res.send({message:`could not delete the user with id ${id}`})
    })

}


