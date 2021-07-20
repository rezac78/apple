const mongoose=require('mongoose');

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useFindAndModify:true,
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`MongoConected ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDB