import { nanoid } from "nanoid";
import URL from '../models/url.js';

const handleRedirect = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortID: shortId,
    });
    const click = result.totalClicks + 1;
    console.log(click);
    await URL.findOneAndUpdate({ shortID: shortId, }, {
        $push: {
            visitHistory: { timestamp: Date.now() },
        }
    });
    res.redirect(result.redirectURL);
}
const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    const shortID = await nanoid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home.ejs", { id: shortID });
};
const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortID: shortId,
    });
    res.json({
        webURL: result.redirectURL,
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
};
export { handleRedirect, handleGenerateNewShortURL, handleGetAnalytics };