const express=require('express');
const app=express();
const fs =require('fs')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//static files(css and js)
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public'))//css file
app.use('/js', express.static(__dirname + 'public'))//js file
app.use('/webfonts', express.static(__dirname + 'public'))//css file
app.use('/images', express.static(__dirname + 'public'))//css file


app.set('views','./views')
app.set('view engine','ejs')
app.use(mongoSanitize({
    replaceWith: '_'
}))


app.use(helmet());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://api.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://api.mapbox.com",
    "https://api.tiles.mapbox.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
];
const connectSrcUrls = [
    "https://api.mapbox.com",
    "https://*.tiles.mapbox.com",
    "https://events.mapbox.com",
];


const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:", 
                "https://images.unsplash.com",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


app.get('/',(req,res)=>{
  
    res.render('home');

})

app.get('/portfolio',(req,res)=>{
  
    res.render('portfolio');

})

app.get('/resume', function (req, res) {
    var filePath = "/files/GODBLESS_UMUKORO.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});


app.get('/research', function (req, res) {
    var filePath = "/files/Research.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, (req,res) =>{
    console.log(`Serving on port ${port}`)
})
