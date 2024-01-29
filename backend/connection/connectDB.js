const mongoose = require('mongoose')
9
const ConnectToDB = async ()=>{
    try {
        mongoose.set('strictQuery',false)
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = ConnectToDB
