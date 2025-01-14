import { connect } from "mongoose";
export function connectToDb() {
    connect("mongodb+srv://avital0583:Avital10@cluster0.9qyhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(con => console.log("mogo Db connected"))
        .catch(err => {
            console.log("cannot connect mongo db", err);
            process.exit(1)
        })
}