const router = require('express').Router();
const { Favorites, User } = require('../../models');

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
    Favorites.findAll({})
        .then(dbFavoritesData => res.json(dbFavoritesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Favorites.findOne({
        where: {
            id: req.params.id
        },
        include: {
            all: true
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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