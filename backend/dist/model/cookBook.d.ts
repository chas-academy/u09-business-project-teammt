import mongoose, { Document } from 'mongoose';
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
export declare const CookBook: mongoose.Model<ICookBook, {}, {}, {}, mongoose.Document<unknown, {}, ICookBook, {}> & ICookBook & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=cookBook.d.ts.map