const router = require('express').Router();
const { User } = require('../../models');

// get users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'no user found with this email address!' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'incorrect password' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    })
});

// update user
router.put('/:id', (req, res) => {
    User.update({
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'no user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'no user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;