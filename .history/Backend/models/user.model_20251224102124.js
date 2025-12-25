import mongoose from "mongoose"

const userSchema= new mongoose.Schema({

fullname:{
    type: String,
    required:true

},
username:{
    type: String,
    required:true,
unique:true
},password:{
    type: String,
    required:true,
minlenth:6
},

gendar:{
    type: String,
    required:true,
enum:['male','female']
}

})