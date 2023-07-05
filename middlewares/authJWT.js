const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req,res,next)=>{
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
          if (err) req.user = undefined;
          User.findOne({
              _id: decode.id
            })
            .exec((err, user) => {
              if (err) {
                res.status(500)
                  .send({
                    message: err
                  });
              } else {
                req.user = user;
                next();
              }
            })
        });
      } else {
        req.user = undefined;
        next();
      }
};
module.exports = verifyToken ;


// router.get("/hiddencontent", verifyToken, function (req, res) {
//     if (!user) {
//       res.status(403)
//         .send({
//           message: "Invalid JWT token"
//         });
//     }
//     if (req.user == "admin") {
//       res.status(200)
//         .send({
//           message: "Congratulations! but there is no hidden content"
//         });
//     } else {
//       res.status(403)
//         .send({
//           message: "Unauthorised access"
//         });
//     }
//   });