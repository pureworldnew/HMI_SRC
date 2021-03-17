const ResponseFormat = require('../core').ResponseFormat;
const { DemoPresentation, DemoPresentation1 } = require('../enums/presentations.enum')


module.exports = {
  getPresentations(req, res) {

    return res.status(200).json(ResponseFormat.build(
      [DemoPresentation, DemoPresentation1],
      "Slide Information Reterive successfully",
      200,
      "success"
    ))
  },
}
