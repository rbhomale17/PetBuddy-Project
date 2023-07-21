let mongoose=require("mongoose")
require("dotenv").config()

let connection=mongoose.connect("mongodb+srv://sourabhdhanarajan:sourabhdhanarajan@cluster0.1rj0rxh.mongodb.net/petbuddyproject?retryWrites=true&w=majority")

module.exports={connection}
