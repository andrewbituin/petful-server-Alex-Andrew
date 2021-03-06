const { cats } = require('./store-cats');

const catsService = {
  addAdoptedCat(name, adoptedBy) {
    const newCat = cats.find(item => item.name === name);
    newCat.adoptedBy = adoptedBy;
  }
};

module.exports = catsService;