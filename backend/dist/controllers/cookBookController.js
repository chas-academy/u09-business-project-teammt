import { CookBook } from '../model/cookBook';
export const getCookBooks = async (req, res) => {
    try {
        const userCookbooks = await CookBook.find({ userId: req.user.googleId });
        res.status(200).json({
            message: 'get all cook books called',
            cookbooks: userCookbooks,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createCookBook = async (req, res) => {
    try {
        const cookbookData = {
            ...req.body,
            userId: req.user.googleId,
        };
        const savedResponse = await CookBook.create(cookbookData);
        res.status(200).json({
            message: 'create cook book called',
            saved: savedResponse,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateCookBook = async (req, res) => {
    try {
        const cookBookToUpdate = await CookBook.findOne({
            _id: req.params.id,
            userId: req.user.googleId
        });
        if (!cookBookToUpdate) {
            return res.status(404).json({
                error: 'Cookbook not found or unauthorized',
            });
        }
        if (req.body.operation === 'add') {
            const recipeExist = cookBookToUpdate.recipes.some((r) => r.id === req.body.recipe.id);
            if (recipeExist) {
                return res.status(400).json({
                    error: 'recipe is already in the cookbook',
                });
            }
            cookBookToUpdate.recipes.push(req.body.recipe);
        }
        else if (req.body.operation === 'remove') {
            const recipeExists = cookBookToUpdate.recipes.some((r) => r.id === req.body.recipe.id);
            if (!recipeExists) {
                return res.status(400).json({
                    error: 'recipe not found in cookbook',
                });
            }
            cookBookToUpdate.recipes = cookBookToUpdate.recipes.filter((r) => r.id !== req.body.recipe.id);
        }
        else {
            return res.status(400).json({
                error: 'operation should be add or remove',
            });
        }
        const savedCookBook = await cookBookToUpdate.save();
        res.status(200).json({
            message: 'Recipe updated successfully',
            cookbook: savedCookBook,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteCookBook = async (req, res) => {
    try {
        const cookBookToDelete = await CookBook.findOne({
            _id: req.params.id,
            userId: req.user.googleId
        });
        if (!cookBookToDelete) {
            return res.status(404).json({
                error: 'Cookbook not found or unauthorized',
            });
        }
        await cookBookToDelete.deleteOne();
        res.status(200).json({
            message: 'Cookbook deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getOneCookBook = async (req, res) => {
    try {
        const oneCookBook = await CookBook.findOne({
            _id: req.params.id,
            userId: req.user.googleId
        });
        if (!oneCookBook) {
            return res.status(404).json({
                error: 'Cookbook not found or unauthorized',
            });
        }
        res.status(200).json({
            message: 'get one cook book called',
            cookbooks: oneCookBook,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=cookBookController.js.map