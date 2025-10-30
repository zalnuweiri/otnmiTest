import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // demo-only: store password plainly so signup/login works locally.
    // Replace with bcrypt hashing in production.
    password: { type: String, required: false },
    publisherKey: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
