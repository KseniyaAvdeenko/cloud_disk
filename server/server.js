const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const authRoutes = require('./routes/auth.routes')


//middlewares
app.use(cors({origin: '*'}));
app.use(express.json());

app.use('/api', authRoutes)



async function startServer(){
    try {
        await mongoose.connect(process.env.DB_URL_LOCAL).then(()=>console.log('db connected')).catch(err => console.log(err));
        app.listen(PORT, ()=>{
            console.log('Server started on port ' + PORT);
        })
    } catch (error) {
        console.log(error);
    }
}
startServer()