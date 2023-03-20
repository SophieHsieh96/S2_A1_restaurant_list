const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// require express-handlebars here
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
    res.render('index', {restaurant: restaurantList.results})
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      })
    res.render('index', {restaurant: restaurants, keyword: keyword})
})

app.get('/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(
        restaurant => restaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', {restaurant: restaurant})
})



app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})