const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true,
        unique:true
    },
    confirm_password : {
        type:String,
        required:true,
        unique:true
    }
})

//creating collections now

const Register = new mongoose.model("Registers",employeeSchema);

module.exports = Register;