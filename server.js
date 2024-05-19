const favicon = require ('serve-favicon');
const path = require ('path');

let express = require ("express");

let app = express();

// Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

const routes = require ('./routes.js');

app.use(express.static('css'));

app.set('view engine', 'pug') // Set template engine -> Pug
app.set("views", path.join(__dirname, 'public/views'));
app.use(favicon(path.join(__dirname,'public','spinny.ico'))); // Custom favicon

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("mainpage");
});

routes(app);

app.listen(8080, "127.0.0.1");
console.log("web server running @ http://localhost:8080");