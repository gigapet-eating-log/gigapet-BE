
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('children').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('children').insert([
        {id: 1, fullName: 'Bart Simpson', parentId: 4},
        {id: 2, fullName: 'Maggie Simpson', parentId: 4},
        {id: 3, fullName: 'Lisa Simpson', parentId: 4},
        {id: 4, fullName: 'George Weasley', parentId: 5},
        {id: 5, fullName: 'Fred Weasley', parentId: 5},
        {id: 6, fullName: 'Ron Weasley', parentId: 5},
        {id: 7, fullName: 'Luke Skywalker', parentId: 6},
        {id: 8, fullName: 'Leia Skywalker', parentId: 6},
      ]);
    });
};
