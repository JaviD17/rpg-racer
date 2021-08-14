const User = require('./User');
const Comment = require('./Comment');
const Favorites = require('./Favorites');

User.hasMany(Favorites, {
    foreignKey: 'user_id'
});

Favorites.belongsToMany(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Favorites.hasMany(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Favorites, Comment };