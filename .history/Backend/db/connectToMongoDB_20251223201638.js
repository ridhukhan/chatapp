import mongoose from "mongoose"

const connectToMongoDB=()=>{


    try {
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log('CONNECTED TO MONODB')
    } catch (error) {
        console.log("not coonected to db",error.message)
    }
}
export default connectToMongoDB;