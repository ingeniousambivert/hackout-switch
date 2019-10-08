const express = require("express");
const indexRouter = express.Router();
const methodOverride = require("method-override");

// Override to REST Methods
indexRouter.use(methodOverride(req => req.body._method));
//Middlewares for Auth
const checkAuth = require("../middlewares/checkAuth");
const checkLogin = require("../middlewares/checkLogin");

const Request = require("../models/request.model.js");
const Partner = require("../models/partner.model.js");
const Consumer = require("../models/consumer.model.js");

indexRouter.get("/", (req, res) => {
  res.render("pages/index", {});
});
indexRouter.get("/contactUs", (req, res) => {
  res.render("pages/contactUs", {});
});

indexRouter.use((req, res, next) => {
  if (req.cookies.user_key && !req.session.user) {
    res.clearCookie("user_key");
  }
  next();
});

indexRouter.post("/partnerLogin", (req, res) => {
  const { email, password } = req.body;
  Partner.findOne(
    {
      email: email,
      password: password
    },
    (err, Partner) => {
      if (Partner) {
        let loginValues = [
          {
            email: email
          }
        ];
        const PartnerValues = Partner;
        const session = req.session;
        req.session.user = loginValues;
        res.render("pages/partnerDashboard", {
          partnerObject: PartnerValues
        });
      } else {
        res.render("pages/partnerLogin", {
          succ: false,
          err: true
        });
      }
    }
  );
});

indexRouter.post("/consumerLogin", (req, res) => {
  const { email, password } = req.body;

  Consumer.findOne(
    {
      email: email,
      password: password
    },
    (err, Consumer) => {
      if (Consumer) {
        let loginValues = [
          {
            email: email
          }
        ];
        const ConsumerValues = Consumer;
        req.session.user = loginValues;
        Partner.find({}, function(err, partners) {
          res.render("pages/consumerDashboard", {
            consumerObject: ConsumerValues,
            partners: partners
          });
        });
      } else {
        res.render("pages/consumerLogin", {
          succ: false,
          err: true
        });
      }
    }
  );
});

indexRouter.get("/consumerLogin", (req, res) => {
  Partner.find({}, function(err, partners) {
    res.render("pages/consumerLogin", {
      consumerObject: "",
      partners: partners
    });
  });
});

indexRouter.get("/speak", (req, res) => {
  Partner.find({}, function(err, partners) {
    res.render("pages/speak");
  });
});

indexRouter.get("/partnerLogin", (req, res) => {
  res.render("pages/partnerLogin", {
    partnerObject: ""
  });
});

indexRouter.get("/upload", (req, res) => {
  res.render("pages/upload", { filename: "" }), { parsedText: Text };
});

indexRouter.get("/partnerDashboard/", checkAuth, (req, res) => {
  Partner.find({}, function(err, partners) {
    res.render("pages/partnerDashboard", {
      partnerObject: partners
    });
  });
  //   const email = req.params.email;
  //   Partner.findOne(
  //     {
  //       email: email
  //     },
  //     (err, Partner) => {
  //       if (Partner) {
  //         let loginValues = [
  //           {
  //             email: email
  //           }
  //         ];
  //         const PartnerValues = Partner;
  //         res.render("pages/partnerDashboard", {
  //           partnerObject: PartnerValues
  //         });
  //       } else {
  //         res.render("pages/partnerLogin", {
  //           succ: false,
  //           err: true
  //         });
  //       }
  //     }
  //   );
});

// indexRouter.get("/consumerDashboard", checkAuth, (req, res) => {
//   res.render("pages/consumerDashboard");
// });

indexRouter.get("/partnerActivities", checkAuth, (req, res) => {
  res.render("pages/partnerActivities");
});

indexRouter.get("/consumerNeeds", checkAuth, (req, res) => {
  Request.find({}, function(err, requests) {
    res.render("pages/consumerNeeds", {
      needObject: requests
    });
  });
});

indexRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = indexRouter;
