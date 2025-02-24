require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb',extended: true}))

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}))

const blogRoutes = require('./src/routes/blog.route');
const blogRoute = require('./src/routes/blogRoute');
const commentRoutes = require('./src/routes/comment.route');
const userRoutes = require("./src/routes/auth.user.route")

app.use("/api/blogs",blogRoutes);
app.use("/api/blogs",blogRoute);
app.use("/api/comments",commentRoutes);
app.use("/api/auth",userRoutes);

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);

    app.get('/', (req, res) => {
        res.send('Hello Worlddd!')
    })
}

main().then(() => console.log("Mongodb oke")).catch(err => console.log(err));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


//baotran667773
//SR6hNe4EASZ74lpf