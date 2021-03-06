const router = require('express').Router();
const { Favorites, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Favorites.create({
        pub_id: req.body.pub_id,
        user_id: req.body.user_id
    })
        .then(dbFavoritesData => {
            res.json(dbFavoritesData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get('/user/:id', (req, res) => {
    Favorites.findAll({
        where: {
            user_id: req.params.id
        }
    })
        .then(dbFavoritesData => res.json(dbFavoritesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Favorites.update(req.body, {
        indiviualHooks: true,
        where: {
            id: req.params.id
        },
    })
        .then(dbFavoritesData => {
            if (!dbFavoritesData[0]) {
                res.status(404).json({ message: 'No Favorite found with this id' });
                return;
            }
            res.json(dbFavoritesData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Favorites.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbFavoritesData => {
            if (!dbFavoritesData) {
                res.status(404).json({ message: 'No favorite found with this id' });
                return;
            }
            res.json(dbFavoritesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;