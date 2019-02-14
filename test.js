'use strict';
const path = require('path');
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'data.sqlite'),
  },
  useNullAsDefault: true,
});

knex.schema.hasTable('things').then(exists => {
  if (!exists) {
    return knex.schema.createTable('things', table => {
      table.increments();
      table.string('name');
    });
  }
})
  .then(() => {

    const parameterizedKnex1 = knex.withUserParams({ thisInstance: 1 });
    const parameterizedKnex2 = knex.withUserParams({ thisInstance: 2 });
    
    parameterizedKnex1.on('query-response', (response, obj, builder) => {
      console.log('parameterizedKnex1 handler');
    });
    
    knex('things').then(res => console.log('knex query result', res));
    parameterizedKnex2('things').then(res => console.log('parameterizedKnex2 query result', res));
  })
  .catch(error => {
    console.log(error);
  });
