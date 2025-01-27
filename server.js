import express from 'express';
import bodyparser from 'body-parser';
import sequelize from './util/db.js';
import User from './model/user-model.js';
import routes from './routes/user-routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Per form-urlencoded

// Middleware CORS (opzionale ma consigliato)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Debugging: logga tutte le richieste e i relativi body
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});

// CRUD ROUTES
app.use('/users', routes);

// test route
app.get('/', (req, res) => {
    res.send('Hello World');
});


// error handling
app.use((error, req, res, next) =>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
})

// sequelize sync
sequelize
.sync()
.then(result => {
    console.log("Database connected.")

})
.catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

