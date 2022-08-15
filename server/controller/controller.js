var userDB = require('../model/model');

// create and save new User
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Request cannot be empty!"});
        return;
    }

    // create new user (record in database)
    const newUser = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save into database
    newUser
        .save(newUser)
        .then((data => {
            //res.send(data);
            res.redirect('/add-user');
        }))
        .catch(err => {
            res.status(500).send({message: err.message || "Some error uccured while creating new user."});
        });
}

// Find and return users/user
exports.find = (req, res) => {
    const userID = req.query.id;
    if(userID){
        userDB.findById(userID)
        .then(user => {
            if(!user){
                res.status(404).send({ message: `Couldn't find user with ID ${userID}` });
            }
            else{
                res.send(user);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || `Couldn't find user with ID ${userID}` });
        });
    }
    else{
        userDB.find()
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occured while looking for user in database"});
        });
    }
    
}

// update user by userID
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty!"});
    }

    // retrieve user id from URL param
    const userID = req.params.id;
    if(!userID){
        console.log("UserID not defined!");
    }

    userDB.findByIdAndUpdate(userID, req.body, {userFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot update user with id ${userID}. Maybe user not found.`});
            }
            else{
                res.send(data);
                //redirect('/');
            }})
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occured while updating user data."})
        });
}

// delete user by userID
exports.delete = (req, res) => {
    userDB.findByIdAndDelete(req.params.id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot delete user with ID ${userID}. Maybe user doesn't exist.`});
            }
            else{
                res.send({ message: "User deleted succesufully." });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occured while deleting user."});
        });
}