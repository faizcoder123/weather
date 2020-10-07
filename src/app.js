const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')



const port = process.env.PORT ||3000 //huroku
//heroku deploy

// ssh -secure shell communicate with other machine

const forecast = require('../utils/forecast')

console.log(__dirname)//path
console.log(path.join(__dirname,'../public'))// .. to get back dir then go in to pub folder
// console.log(__filename)
// hbs template for dynamic web
//The template engine combines the template and the context to produce a complete string of HTML. The job of a template engine is to interpret the template, replacing the dynamic pieces with real data.
//Template Engines for Node. js. Template engine helps us to create an HTML template with minimal code. Also, it can inject data into HTML template at client side and produce the final HTML. ... Each template engine uses a different language to define HTML template and inject data into it.

// view engine  which template engine
app.set('view engine','hbs')// set view engine as hbs -- handler bar View Engine is responsible for rendering the view into html form to the brow
//hbs-- using handler bar temp render dynamic web and and re use code (footer)
const p=path.join(__dirname,'../public')

app.set('views', path.join(__dirname, '../views'));

const partialpath=path.join(__dirname,'../src/partials')
// for template of header and footer
hbs.registerPartials(partialpath)
//console.log(partialpath)
//  : is used to give any name
// * for any else


//Middleware functions are functions that have access to the request object ( req ), the response object ( res ), and the next middleware function in the application's request-response cycle

app.use(express.static(p)) // find all html css js file first what route request we get
// auto connect all  html,css ,jss ,img  inside public folder
//app.use() loads a function to be used as middleware

app.get('/',(req,res)=>{ //home
    res.render('index',{// rendex index hbs view template
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
              forecast: forecastData,
               address: req.query.address
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
