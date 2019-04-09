require('dotenv').config()
const knex = require('knex')
// console.log(process.env)
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

// console.log('connection successful');

const getAllItems = function(searchTerm){
    knexInstance.select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}

// getAllItems('tofurkey')

const paginateItems= function(pageNumber){
    const itemsPerPage = 6;
    const offset = itemsPerPage * (pageNumber - 1)
    knexInstance.select('name')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log('PAGINATE ITEMS', { pageNumber })
      console.log(result)
    })
}
// paginateItems(3)

function productsAddedAfter(days) { 
    knexInstance .select('id', 'name', 'price', 'date_added', 'checked', 'category') 
    .from('shopping_list') 
    .where( 'date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, days) ) 
    .then(results => { 
        console.log(results) }) }

// productsAddedAfter(9)


function costPerCategory() {
    knexInstance
      .select('category')
      .count('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('COST PER CATEGORY')
        console.log(result)
      })
  }
  
  costPerCategory()