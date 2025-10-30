const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const adminRoute = require('./adminRoute')


function routes(app) {
    app.use('/user',userRoute);
    app.use("/auth", authRoute);
    app.use('/admin',adminRoute)
}
module.exports = {routes};


