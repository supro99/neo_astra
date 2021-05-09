var config = require('../config/config');
var response = require('../config/responses');
var commonHelpers = require('../helpers/commonHelpers');
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();


const employeeSignup = async (req, res) => {
    // name (Full name)
    // password
    // email
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.neo_astra_db);

        // request parameters
        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
        let mobile = req.body.mobile;

        // validating request parameters
        let isEmailValid = await commonHelpers.validateEmail(email);
        let isNameValid = await commonHelpers.validateName(name);
        let isMobileValid = await commonHelpers.validateMobile(mobile);
        // if want can add formatting to use entered value. i.e. can make its first letter capital and other small of name. (example - entered value -> 'suprIYa paTil' format to -> 'Supriya Patil')

        if (isEmailValid && isNameValid && password && isMobileValid) {
            let dataObj = {
                email,
                name,
                password: bcrypt.hashSync(password, 8),
                mobile
            }
        
            // inserting employee details into database
            let result = await dba.collection(config.employeesCollection).insertOne(dataObj);
            if (result.insertedCount) {
                res.status(200).send(response.successful_signup)
            } else {
                res.status(400).send(response.failed_to_signup)
            }
        } else {
            res.status(400).send(response.invalid_parameters)

        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        })
    }
}

module.exports.employeeSignup = employeeSignup;

const employeeLogin = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.neo_astra_db);

        var email = req.body.email;
        var password = req.body.password;

        if (email && password) {
            //retrieving data from db
            let result = await dba.collection(config.employeesCollection).find({
                email: req.body.email
            }).project({
                password: 1
            }).toArray();

            if (result.length) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);

                if (!passwordIsValid) return res.status(401).send({
                    auth: false,
                    token: null
                });

                let token = jwt.sign({
                    id: result[0]._id
                }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                app.locals.email = email;

                res.status(200).send({
                    auth: true,
                    token: token
                });
            } else {
                res.status(400).send(response.invalid_loggin_credentials);
            }
        } else {
            res.status(400).send(response.invalid_loggin_credentials);
        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });
    }

}

module.exports.employeeLogin = employeeLogin;


//Creation of an expense 
const createExpense = async (req, res) => {
    try {

        // request parameters
        let submitDate = req.body.submitDate;
        let employeeId = req.body.employeeId;
        let itemType = req.body.itemType;
        let type = req.body.type;
        let amount = req.body.amount;
        let description = req.body.description;
        let status = req.body.status;
        

        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.neo_astra_db);

        var data_obj = {submitDate, employeeId, itemType, type, amount, description,status}
        var result = await dba.collection(config.expensesCollection).insertOne(data_obj);
        if (result.insertedCount) {
            res.status(200).send(response.successful_insert)
        } else {
            res.status(400).send(response.failed_to_insert)
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.errmsg })
    }
}

module.exports.createExpense = createExpense;

const getAllExpenses = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.neo_astra_db);

        // retrieving all expenses' data from database
        let result = await dba.collection(config.expensesCollection).find().toArray();
        if (result.length) {
            res.status(200).send({ data: result });
        } else {
            res.status(400).send(response.no_data_found);
        }
    } catch (error) {
        res.status(400).send({ msg: error.errmsg });
    }

}

module.exports.getAllExpenses = getAllExpenses;

const updateExpense = async (req, res) => {
    // data_to_update
    // expenseId
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.neo_astra_db);

        // request params
        let expenseId = req.body.expenseId;
        let dataToUpdate = req.body.dataToUpdate;

        if (expenseId) {
            // update the database
            let result = await dba.collection(config.expensesCollection).updateOne({ _id: ObjectId(expenseId) }, {$set: dataToUpdate});
            if (result.modifiedCount) {
                res.status(200).send(response.successful_update);
            } else {
                res.status(400).send(response.no_data_found);
            }
        } else {
            res.status(400).send(response.invalid_parameters)
        }
    } catch (error) {
        res.status(400).send({ msg: error });
    }

}

module.exports.updateExpense = updateExpense;


//Delete an expense by expenseId
const deleteExpense = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.neo_astra_db);

        // request params
        let expenseId = req.body.expenseId;

        if (expenseId) {
            // retrieve from database
            let result = await dba.collection(config.expensesCollection).deleteOne({ _id: ObjectId(expenseId) });
            if (result.deletedCount) {
                res.status(200).send(response.successful_delete);
            } else {
                res.status(400).send(response.no_data_found);
            }
        } else {
            res.status(400).send(response.invalid_parameters)
        }
    } catch (error) {
        res.status(400).send({ msg: error.errmsg });
    }
}

module.exports.deleteExpense = deleteExpense;