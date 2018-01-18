module.exports = {
    development : {
        secret: 'JIKSAW',
        dbUrl: process.env.MONGO_URL,
        port: process.env.PORT || 3000
    }
};