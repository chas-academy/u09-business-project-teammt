import mongoose, { Document, Schema } from 'mongoose';

interface IRecipe {
  id: string;
  title: string;
  image: string;
}

export interface ICookBook extends Document {
  title: string;
  description: string;
  recipes: IRecipe[];
  userId: string;
}

// Reusable schema for individual recipes
const RecipeSchema: Schema = new Schema({
  id: String,
  title: String,
  image: String,
});

// Main schema for a cookbook
const CookBookSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export const CookBook = mongoose.model<ICookBook>('CookBook', CookBookSchema);
