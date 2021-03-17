const { authJwt } = require("../middleware");
const presentationController = require('../controllers').presentations;


module.exports = function (app) {
    app.get('/presentations', [authJwt.verifyToken], presentationController.getPresentations);
};
