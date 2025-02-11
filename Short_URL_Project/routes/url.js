import express from "express";
import { handleRedirect,handleGenerateNewShortURL , handleGetAnalytics} from '../controllers/url.js'
const router = express.Router();

router.get('/:shortId',handleRedirect);
router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics);

export default router;