import mongoose from "mongoose"

const connectDb = async() =>{
    try {
        const conn = await mongoose.connect (process.env.MONGODB_URI)
        console.log(`Mongo Db connected ${conn.connection.host}`);
        
        
    } catch (error) {
        console.log("Error:",error);
        process.exit(1)
        
        
    }
}

export default connectDb