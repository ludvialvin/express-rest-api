
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task').del()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {
          title: 'Vaccuum the floors',
          description: 'Vaccum the living room and all bedroom',
          is_complete: false,
          user_id: 2
        },
        {
          title: 'Clean the car',
          description: 'Wash, wax and vacuum the car',
          is_complete: false,
          user_id: 1,
        },
        {
          title: 'Buy groceries',
          description: 'Milk, bread, cheese, eggs, flour',
          is_complete: true,
          user_id: 3,
        }
      ]);
    });
};
