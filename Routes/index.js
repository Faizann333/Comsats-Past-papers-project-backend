const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const adminRoute = require('./adminRoute')


function routes(app) {
    app.use('/api/user',userRoute);
    app.use("/api/auth", authRoute);
    app.use('/api/admin',adminRoute)
}
module.exports = {routes};


