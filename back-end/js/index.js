const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require("sequelize");
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const sequelize = new Sequelize('master', 'SA', 'Aa100100', {
    dialect: 'mssql',
    host: 'localhost',
    dialectOptions: {
        encrypt: true
    }
});

const Department = sequelize.define("department", {
    DepartmentId: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },  
    DepartmentName: {
           type: DataTypes.STRING
       },
    a: {
        type:DataTypes.BOOLEAN
    },
    b: {
        type:DataTypes.BOOLEAN
    },
    c: {
        type:DataTypes.BOOLEAN
    },
    d: {
        type:DataTypes.BOOLEAN
    },
    DepartmentSec: {
        type:DataTypes.STRING
    }
  });


app.get('/api/Department',(req,res)=>{
    var departments;
    sequelize.authenticate()
    .then(() => {
        console.log('Connection successful');
        return Department.findAll()
    })
    .then((data)=>{
               departments = data;
               res.send(JSON.stringify(departments));
    })
    .catch((err) => {
        res.send(err);
    });
    
})


app.post('/api/Department',(req,res)=>{

    sequelize.authenticate()
    .then(() => {
        console.log('Connection successful');
        return Department.sync({ alter: true })
    })
    .then(()=>{
        console.log("created dept table successfully");
        return  Department.build({
            DepartmentName: req.body.DepartmentName,
            a : req.body.a,
            b: req.body.b,
            c: req.body.c,
            d: req.body.d,
            DepartmentSec: req.body.DepartmentSec
        })
    })
    .then((newDepartment)=>{
        return newDepartment.save();
    })
    .catch((err) => {
        console.log(err,"error ocuured");
        res.send(err);
    });
    
})
 app.put("/api/Department/",(req,res)=>{
     console.log(req.body);
    sequelize.authenticate()
    .then(() => {
        console.log('Connection successful');
        return Department.sync({ alter: true })
        })
    .then(()=>{
        console.log("created dept table successfully");
        return Department.update({DepartmentName:req.body.DepartmentName},{
            where:{
                   DepartmentId: req.body.DepartmentId
                 }
           })
        })
   .then(()=>{
        res.send("updated sucessfully");
    })
    .catch((err)=>{
            res.send(err);
    })
 })
 app.delete("/api/Department/:id",(req,res)=>{
    sequelize.authenticate()
    .then(() => {
        console.log('Connection successful');
        return Department.sync({ alter: true })
        })
    .then(()=>{
        console.log("created dept table successfully");
        return Department.destroy({
            where:{
                   DepartmentId: req.params.id
                 }
           })
        })
   .then(()=>{
        res.send("Deleted sucessfully");
    })
    .catch((err)=>{
            res.send(err);
    })
});

app.listen(53535,()=>{
    console.log("listening on port",53535);
})