const User = require("../models/user");

module.exports.pickup_post = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((result) => {
      const pickup = !result.pickup;

      User.findByIdAndUpdate(id, { pickup })
        .then((result) => {
          res.json({ redirect: "/" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.track = (req, res) => {
  res.render("track", {
    title: "Track",
  });
};

module.exports.pickup_get = (req, res) => {
  res.render("preference", {
    title: "Preference",
  });
};

module.exports.track_get = (req, res) => {
  res.render("adminTrack", {
    title: "Track",
  });
};
