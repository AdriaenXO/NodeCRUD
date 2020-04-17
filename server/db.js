// mongodb driver
const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://adriaen:acc3ss@wust-rest-api-52q8h.mongodb.net/test?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true},function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection to ${dbName}.${dbCollectionName}] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log(`[MongoDB connection to ${dbName}.${dbCollectionName}] SUCCESS`);

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};