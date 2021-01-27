const express=require('express');
const app=express();
const port=process.env.port || 3000;
const fs =require('fs')
const nodemailer=require('nodemailer')
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

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );


app.get('/',(req,res)=>{
  
    res.render('home');

})

app.get('/portfolio',(req,res)=>{
  
    res.render('portfolio');

})

app.get('/resume', function (req, res) {
    var filePath = "/files/GODBLESSUMUKORO.pdf";

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


app.post('/send',(req,res)=>{
    const output=`
    <p>You hav a new contact request</p>
    <h3>Contact Details </h3>
    <ul>
        <li> Name: ${req.body.name}</li>
        <li> Name: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p> ${req.body.message} </p>

    ` ;
    // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }


   
})



app.listen(port, (req,res) =>{
    console.log(`Serving on port ${port}`)
})
