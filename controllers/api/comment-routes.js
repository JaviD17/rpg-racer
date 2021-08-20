const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        pub_id: req.body.pub_id,
        user_id: req.body.user_id
    })
        .then(dbCommentData => {
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
    Comment.findAll({
        include: {
            all: true,
            nested: true
        }
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get comment via pub_id
router.get('/pub/:id', (req, res) => {
    Comment.findOne({
        where: {
            pub_id: req.params.id
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

// get comment via user_id
router.get('/user/:id', (req, res) => {
    Comment.findOne({
        where: {
            user_id: req.params.id
        },
        include: {
            all: true,
            nested: true
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.put('/:id', withAuth, (req, res) => {
    Comment.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData[0]) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
            }
            res.json(dbCommentData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

module.exports = router;