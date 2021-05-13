const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const CastType = db.castType;
var admin = require("firebase-admin");
var serviceAccount = require("./avshannondh-3c325-firebase-adminsdk-cvz1n-3910fc1f53.json");

const app = express();

var corsOptions = {
    origin: "*"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
app.use(cors(corsOptions));
app.use('/images', express.static('images')); 
// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '10mb', extended: true}))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

// function initial() {
//     CastType.create({
//         id: 1,
//         name: "Prajapti"
//     });

//     CastType.create({
//         id: 2,
//         name: "Patel"
//     });

//     CastType.create({
//         id: 3,
//         name: "Solanki"
//     });
// }

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/castType.routes')(app);
require('./routes/feeds.routes')(app);
require('./routes/images.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});