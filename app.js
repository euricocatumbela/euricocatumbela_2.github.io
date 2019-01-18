const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Staatliches
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(express.static("views"));

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())


app.get('/',(req,res) => {
  res.render('Contact');
});

app.post('/send', (req,res) =>{
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Pickup: ${req.body.Pickup}</li>
    <li>Destination: ${req.body.destination}</li>
    <li>Name: ${req.body.Name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Number Of Passangers: ${req.body.Passangers}</li>
    <li>Number of Begs: ${req.body.bags}</li>
    <li>Flight Number: ${req.body.flight}</li>
    <li>Airline Company: ${req.body.arline}</li>
  </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'ejctechnolgychannel', // generated ethereal user
      pass: 'Cat47306' // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Joshua Organization 👻" <ejctechnolgychannel', // sender address
    to: "joshuaorganisation@hotmail.com, joshuaorganisation@hotmail.com", // list of receivers
    subject: "Booking Request✔", // Subject line
    text: "Hello Visitor", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  // let info = await
  const info = transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //res.render('contact',{msg: "Email has been sent"});
  res.sendFile(__dirname + "/success.html");


  transporter.sendMail(mailOptions, function (error, info){
    console.log(error,info);
  });

});
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});
