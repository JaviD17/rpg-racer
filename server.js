const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers/api-routes/routes');
const exphbs = require('express-handlebars');
const hbs = exphbs({defaultLayout: 'main'});
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, function() {
      console.log('App listening on PORT ' + PORT);
    });
  });