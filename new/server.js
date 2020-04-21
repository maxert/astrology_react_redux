    

const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:8100',
  "http://1690550.masgroup.web.hosting-test.net"
  
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  } 
}


app.use(express.static(path.join(__dirname, 'build')));
app.set('port', process.env.PORT || 8080);
app.options('*', cors(corsOptions));
app.get('/*', cors(corsOptions), (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
// app.use((req, res, next) => { if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) req.url = '/'; next() });
var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});