const express = require('express')
const res = require('express/lib/response')
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.json())

const knex = require('knex')
    ({

        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'rexweb@123',
            database: 'employeeDB'
        }

    })

knex.schema.hasTable("Product").then((exist) => {
    if (!exist) {
        return knex.schema.createTable("Product", (table) => {
            table.increments("id").primary()
            table.string("pName", 100)
            table.string("BrandName", 100)
            table.integer("Price", 100)
            table.integer("Quantity", 100)
            table.string("Model", 100)

        })
    }
})


//API to insert values into table("Product")
app.post("/producttable", (req, res) => {
    const data = {
        pName: req.body.pName,
        BrandName: req.body.BrandName,
        Price: req.body.Price,
        Quantity: req.body.Quantity,
        Model: req.body.Model

    }
    knex("Product").insert(data).then((a) => {
        res.send(data)
        // res.send("Values Inserted Successfuly")

    }).catch((err) => {
        console.log(err)
    })


})


//API to view whole "product" table
app.get("/viewProduct", (req, res) => {
    knex.select().table("Product").then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to update data
app.patch("/updateProduct/:id", (req, res) => {
    // res.send(req.body)
    knex("Product").where('id', req.params.id).update(req.body).then((data) => {
        res.send("Updated")
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
})


//API to view specific data 
app.get("/viewData/:id", (req, res) => {

    knex.select().table("Product").where("id", req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to drop table
app.delete("/drop", (req, res) => {
    knex.schema.dropTableIfExists("Product").then(() => {
        console.log("table dropped")
    }).catch((err) => {
        console.log(err)
    })
})

//API to delete table
app.delete("/delProduct/:id", (req, res) => {
    knex.select().table("Product").where("id", req.params.id).del().then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to register 
knex.schema.hasTable("User").then((exist) => {
    if (!exist) {
        return knex.schema.createTable("User", (table) => {
            table.increments("id").primary()
            table.string("Name", 100)
            table.integer("Age", 100)
            table.string("Gender", 100)
            table.string("email", 100)
            table.string("password", 100)
            table.string("confirm_password", 100)


        })
    }
})


//API to insert values into table("Product")
app.post("/usertable", (req, res) => {
    const data = {
        Name: req.body.Name,
        Age: req.body.Age,
        Gender: req.body.Gender,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password


    }
    knex("User").insert(data).then((a) => {
        res.send(data)
        // res.send("Values Inserted Successfuly")

    }).catch((err) => {
        console.log(err)
    })


})

//API to get table "User"
app.get("/user", (req, res) => {
    knex.select("*").table("User").then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})


app.post("/1/login", (req, res) => {
    // res.send(req.body)
    knex.select("*").from('User').then((data) => {
        // res.send(data);
        var a = false;
        let email = req.body.email
        let password = req.body.password
        for (i of data) {
            if (i.email == email && i.password == password) {
                a = true
            }

        }
        if (a) {
            res.send("loging sucess");
        }
        else {
            res.send("your email or password is wrong");
        }
    })


})

//API to create table Product
knex.schema.hasTable("cart").then((exist) => {
    if (!exist) {
        return knex.schema.createTable("cart",(table) => {
            table.increments("id").primary()
            table.string("pName", 100)
            table.string("BrandName", 100)
            table.integer("Price", 100)
            table.integer("Quantity", 100)
            table.string("Model", 100)

        })
    }
})

//API to purchase product
app.post("/purchase", (req, res) => {
    const add_data = {
        "id": req.body.id,
        "pName": req.body.pName,
        "BrandName": req.body.BrandName,
        "Price": req.body.Price,
        "Quantity": req.body.quantity,
        "Model": req.body.Model
    }
    knex("cart").insert(add_data).then(() => {
        knex.select("cart.id", "pName", "BrandName", "Price", "Quantity", "Model").from("cart")
            .join("Product", function (){
                this.on("cart.id", "=", "Product.id")
            }).then((data) => {
                res.send(data)
            }).catch((err)=>{
                console.log(err)
    })
    })
})


app.listen(4300, () => {
    console.log("Server running at Port https://localhost:4300")
})