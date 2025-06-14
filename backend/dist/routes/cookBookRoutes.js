import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getCookBooks, createCookBook, updateCookBook, deleteCookBook, getOneCookBook, } from '../controllers/cookBookController.js';
const router = express.Router();
router.use(authMiddleware);
router.route('/').get(getCookBooks).post(createCookBook);
router.route('/:id').get(getOneCookBook).put(updateCookBook).delete(deleteCookBook);
export default router;
//# sourceMappingURL=cookBookRoutes.js.map