const userRouter = require("./userRoute");
const authRoute = require("./authRoute");


function routes(app) {
    app.use('/api/user',userRouter);
    app.use("/api/auth", authRoute);
}
module.exports = {routes};

