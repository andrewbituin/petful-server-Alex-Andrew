const express = require('express');
const catQueue = require('./store-cats');
const catsService = require('./cats-service');

const catsRouter = express.Router();

catsRouter
  .route('/')
  .all((req, res, next) => {
    const cat = catQueue.first.value;
    if (!cat) {
      return res.status(404).json({ message: 'No cats left in queue' });
    }
    req.cat = cat;
    next();
  })
  .get((req, res, next) => {
    return res.status(200).json(req.cat);
  })
  .delete((req, res, next) => {
    catQueue.dequeue();
    if (req.cat) {
      catsService.addAdoptedCat(req.cat);
    }
    return res.sendStatus(204);
  });

module.exports = catsRouter;