import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    refreshToken: { type: String }

})


const User = mongoose.model('User', userSchema);

export default User;