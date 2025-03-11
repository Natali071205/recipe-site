const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors")

const usersRouter = require('./Routs/usersRouter');
const categoriesRouter = require('./Routs/categorieRouter');
const recipesRouter = require('./Routs/recipeRouter');
const responsesRouter = require('./Routs/responsesRouter');

const app = express();

mongoose.connect('mongodb://localhost:27017/recipes')
  .then(() => {
    console.log('successfuly to connent DB!');
  })
  .catch((err) => {
    console.error('Error not succesed to connect DB!', err);
  })

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/recipes', recipesRouter);
app.use('/response', responsesRouter);

// פועל רק אם השרת רץ בהצלחה
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});