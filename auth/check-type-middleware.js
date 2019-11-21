module.exports = (req, res, next) => {
    const { type } = req.decodedJwt;
    // console.log(req);
    next();
}