const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const {connectDB} = require('./config/db.js')
const cors = require('cors')
const {Server} = require('socket.io')
const userRoutes = require('./routes/userRoutes.js')
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const connectSocket = require('./config/socket.js')

// const __dirname = path.resolve()

dotenv.config()

connectDB()
connectSocket();

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes) 


// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join( __dirname, '/frontend/build')))
    
//     app.get("*", (req,res) => res.sendFile(path.resolve( __dirname, 'frontend', 'build', 'index.html')))
// }else{
//     app.get('/', (req,res) => {
//         res.send('API is running.....')
//     })
    
// }

app.get('/', (req,res)=>{
    res.send("API is runnning.......")
})

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))