
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'jake', password: '$2a$10$Btn9IxpDz4MFiaS3LYQNx.M.wNQQ6bI4HQ5znpRJiy3gd.HNjXEpi'},
        {id: 2, username: 'jacob', password: '$2a$10$blUx.N6d/uGs1z7.DXj8F.BbJMI4jlxE4Qj1azFP2xiDRV8C8ZTja'},
        {id: 3, username: 'zechariah', password: '$2a$10$Tot5CPuiqb/VMzDG7hWneey8THOqS24tYOK2R7pU4kgl1IEqL5/fO'},
        {id: 4, username: "homer", password: "$2a$10$OctwL4Gkz3GocAXoio8KeeinEjTHaGumCW1S9UGRboSMGmCznHVjm", name: "Homer Simpson", email: "hsimpson@gmail.com"},
        {id: 5, username: "arthur", password: "$2a$10$vhFr7GWmaIBxIGOTNHJSv.u9KzI8mot9JcHH3jCkkSfCKP65FJp4a", name: "Arthur Weasley", email: "aweasley@gmail.com"},
        {id: 6, username: 'anakin', password: "$2a$10$2hCTHf89aemnVsi3ghPfDeyyEoyonccf6MSD0oZeEv/Qnp2G6mhC6", name: "Anakin Skywalker", email: "askywalker@gmail.com"}
      ]);
    });
};
