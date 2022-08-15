const axios = require('axios');

exports.homeRoute = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then((response) => {
            res.render('index', { users: response.data });
        })
}

exports.add_user = (req, res) => {
    res.render('add-user');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users/', { params: {id: req.query.id}})
        .then(userdata => {
            res.render('update-user', { user: userdata.data });
        })
        .catch(err => {
            res.send(err);
        });
}