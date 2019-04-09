require('dotenv').config()
const knex = require('knex')
console.log(process.env)
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

console.log('connection successful');

const getAllItems = function(searchTerm){
    knexInstance.select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}

getAllItems('tofurkey')