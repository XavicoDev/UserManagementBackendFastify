import mongoose from "mongoose";

mongoose.set("strictQuery", false)

export const connectDB = (uri) => {
    mongoose.connect(uri)
        .then(() => console.log(`Conectado a la base de datos`))
        .catch((e) => console.log(`No se pudo conectar a la base de datos: ${e}`))
}