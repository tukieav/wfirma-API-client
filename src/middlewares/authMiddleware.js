module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token === process.env.AUTH_TOKEN) {
            return next();
        }
    }
    res.sendStatus(403);
};