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
    res.render('index', {restaurantList: restaurantList.results})
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    if (!req.query.keyword.trim()) {
        return res.redirect("/")
      }
    const filterData = restaurantList.results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        || restaurant.category.includes(keyword)
      )
    res.render('index', {restaurantList: filterData, keyword: keyword})
})

app.get('/:restaurant_id', (req, res) => {
    const restaurants = restaurantList.results.find(
        restaurant => restaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', {restaurantList: restaurants})
})



app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})
