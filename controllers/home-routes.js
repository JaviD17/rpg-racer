const router = require("express").Router();
const { Op } = require("sequelize");
const sequelize = require("../config/connection");
const { User } = require("../models");
const {Comment} = require("../models");
const { beforeFindAfterExpandIncludeAll } = require("../models/User");

router.get("/", (req, res) => {
  //console.log(req.session);
  res.render("index", {
    loggedIn: req.session.loggedIn,
  });
});

//login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//signup route
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/search-results/:city", (req, res) => {
  res.render("search-results");
});

router.get("/pub/:id", (req, res) => {
  Comment.findAll({
    where: {
      pub_id: req.params.id
    },
    attributes: [
      'id',
      'comment_text',
      'pub_id',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      }
    ]

    
  })
  .then(dbCommentData => {
    const comments = dbCommentData.map(post => post.get({ plain: true }));

  res.render("pub", {
    comments,
  });
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
