const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error.middleware');
const fileRouter = require('./routes/file.routes');
const fileUpload = require('express-fileupload')

//middlewares
app.use(cors({origin: [process.env.CLIENT_URL], credentials: true}));
app.use(express.json());
app.use(cookieParser())
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/files', fileRouter)

app.use(errorMiddleware)

async function startServer() {
    try {
        await mongoose.connect(process.env.DB_URL_LOCAL).then(() => console.log('db connected')).catch(err => console.log(err));
        app.listen(PORT, () => {
            console.log('Server started on port ' + PORT);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()