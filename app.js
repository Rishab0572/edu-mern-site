const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers.js");
const { json } = require("express");

const port = 3004;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register.hbs", (req, res) => {
    res.render("register")
});

// create new user in database
app.post("/register.hbs", async (req, res) => {
    try{

        const password = req.body.password;
        const cpassword = req.body.confirm_password;

        if(password === cpassword){

            const registerEmployee = new Register({
                fullname : req.body.fullname,
                email : req.body.email,
                phone : req.body.phone,
                password : password,
                confirm_password : cpassword
            })

            const registered = await registerEmployee.save();
            res.status(201).render("index"); 

        }else{
            res.send("passwords are not identical")
        }
        
    } catch(error){
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log('server is running at port no ',{port});
})