import mongoose, { Schema } from 'mongoose';
// Reusable schema for individual recipes
const RecipeSchema = new Schema({
    id: String,
    title: String,
    image: String,
});
// Main schema for a cookbook
const CookBookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    recipes: {
        type: [RecipeSchema],
        default: [],
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export const CookBook = mongoose.model('CookBook', CookBookSchema);
//# sourceMappingURL=cookBook.js.map