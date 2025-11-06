const mongoose = require('mongoose')
main().catch(err => console.log(err));


async function main() {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const dbName = process.env.DB_NAME;
    const connect_test = `mongodb://${host}:${port}/${dbName}`;
    console.log('host :>> ', host);
    console.log('dbName :>> ', dbName);
    // console.log(process.env.DB_HOST);
    await mongoose.connect(connect_test)
    console.log("Connected to MongoDB");
}