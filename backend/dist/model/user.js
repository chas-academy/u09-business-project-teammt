import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
}, { timestamps: true });
export const User = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map