const express = require('express')
const path = require('path')
const hbs  = require('hbs')

const app  = express()

const port = process.env.PORT || 3000 //huroku
//heroku deploy

// ssh -secure shell communicate with other machine

const forecast = require('../utils/forecast')

//console.log(__dirname)//path
// console.log(__filename)

// hbs  for dynamic web render html css

// view engine  which template engine

app.set('view engine', 'hbs') // set view engine as hbs  now dont need extension .hbs anymore

//hbs-- using handler bar temp render dynamic web and and re use code (footer)

const public = path.join(__dirname, '../public')// .. to get back dir then go in to pub folder

app.set('views', path.join(__dirname, '../views'));//if want to give ny other name to view

const partialpath = path.join(__dirname, '../src/partials')

// for template of header and footer
hbs.registerPartials(partialpath)

//:id is used to give any name req.params.id

// * for any else route

app.use(express.json())//express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object when get data from re.body. This method is called as a middleware in your application using the code: app. use(express

//Middleware functions are functions that have access to the request object ( req ), the response object ( res ), and the next middleware function in the application's request-response cycle

app.use(express.static(public)) // find all html css js file first what route request we get
// auto connect all  html,css ,jss ,img  inside public folder


app.get('/', (req, res)=>{ //home
    res.render('index' ,{// rendex index hbs view template
        // use name in index hml file pass object to html and create dynamic web page
    })
})


//http://localhost:3000/weather?address=lucknow
app.get('/weather', (req, res) => {
      if (!req.query.address) {
          res.send({
              error: 'You must provide an address!'
          })
      }

    forecast(req.query.address, (error, forecastData) => {
          if (error) {
              res.send({ error:"Location not found!" })
          }
          else{
          res.send({
               forecast: forecastData
          })
     }
      })

})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Contact : Email - faizhaq241@gmail.com'
    })
})


app.get('/about',(req,res)=>{
	res.render('about',{// rendex index hbs view template
	//	name:"faiz"// use name in index hml file pass object to html and create dynamic web page
	})
})


app.get('*',(req,res)=>{
  	res.render('404',{error:"error 404 page not found"
    })
})


app.listen(port,()=>{
	console.log("server started")
}) //starting server
