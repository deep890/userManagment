const axios = require('axios');


exports.homeRoute = (req,res) =>{
    // axios helps to deal with api, https (get and post request)
    // making a get request to /api/users
    axios.get('http://localhost:1900/api/users')
    .then(function (response){
        res.render('index',{
            users:response.data

        })
    })
    .catch(err=>{
        res.send(err);
    })
    
}
exports.add_user = (req,res) =>{
    res.render('add_user')

}
exports.update_user = (req,res) =>{
    axios.get('http://localhost:1900/api/users',{params:{id:request.query.id}})
    .then(function (userData){
        res.render('update_user',{user:userData.data})

    })
    .catch(err =>{
        res.send(err);
    })

}