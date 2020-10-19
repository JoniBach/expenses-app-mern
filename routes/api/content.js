const express = require("express");
const router = express.Router();
const Content = require("../../models/Content");
 // @route POST api/users/upload
// @desc Update user
// @access Public
router.post("/upload", (req, res) => {
  var _id = req.body._id;
  console.log('body: ',req.body._id)

  Content.findByIdAndUpdate(_id, { new: true }, function(
    err,
    userInfo
  ) {
    // console.log('user info',userInfo)
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      const info = {
        // name: req.body.name,
        // sName: req.body.sName,
        // dob: req.body.dob,
        // mob: req.body.mob,
        // email: req.body.email,
        uploadData: [{
          processedText: req.body.processedText,
          storeName: req.body.storeName,
          totalAmount: req.body.totalAmount,
        }],
  };


      console.log("package retrieved, sending: ", info);
      // Sign token
    
      info
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
      
    }
  });
});

  module.exports = router;
