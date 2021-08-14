const User = require('./User');
const Post = require('./Post');
const Favorites = require('./Favorites');

User.hasMany(Favorites, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Favorites.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Favorites, Post };