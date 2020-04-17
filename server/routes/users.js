var express = require('express');
var router = express.Router();

const db = require("../db");
const dbName = "data";
const collectionName = "users";

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback

    // CREATE new item
    router.post("/", (req, res) => {
        const item = req.body;
        console.log(item);
        dbCollection.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                res.json(_result);
            });
        });
    });

    // READ all items
    router.get("/", (req, res) => {
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            res.json(result);
        });
    });

    // READ specific item
    router.get("/:id", (req, res) => {
        const itemId = parseInt(req.params.id);
        dbCollection.findOne({ id: itemId }, (error, result) => {
            if (error) throw error;
            // return item
            res.json(result);
        });
    });

    // UPDATE specific item
    router.put("/:id", (req, res) => {
        const itemId = parseInt(req.params.id);
        const item = req.body;
        console.log(item);
        dbCollection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                res.json(_result);
            });
        });
    });

    // DELETE specific item
    router.delete("/:id", (req, res) => {
        const itemId = parseInt(req.params.id);

        dbCollection.deleteOne({ id: itemId }, function(error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                res.json(_result);
            });
        });
    });

}, function(err) { // failureCallback
    throw (err);
});

module.exports = router;
