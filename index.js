var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

let pesan = [{pesan: "Masukkan pesan dibawah"}]
app.get('/', function(req, res){
  res.render('form', {
    pesan: pesan
  });
});

app.post('/', async function (req, res) {
   console.log(req.body)
   await(await fetch(`https://api.akuari.my.id/simi/simi?query=${req.body.pesan}`)).json()
   .then(jsonString => {
      try {
         console.log(jsonString.respon);
         pesan[0].pesan = jsonString.respon
         console.log(pesan)
         res.render("form", {
         pesan: pesan
    })
      } catch (error) {
         console.error('Invalid JSON:', error);
      }
   })
   .catch(error => {
      console.error('Fetch Error:', error);
   });
});

function updet(){
app.get('/', function(req, res){
  res.render('form', {
    pesan: pesan,
    title: "EJS example",
    header: "Some users"
  });
});
}

app.listen(3000);