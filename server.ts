import app from "./src/app.js";

const startServer = (): void => {
    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`Server is running on ${port}`)
}

startServer()