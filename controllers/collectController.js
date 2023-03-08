const User = require("../models/user");
const Truck = require("../models/truck");

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

module.exports.updateCoordinates = (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  console.log(lat, lng);

  Truck.findOneAndUpdate({ _id: "639424f57f027956bf9334da" }, { lat, lng })
    .then((obj) => {
      console.log("Truck : ", obj);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getCoordinates = (req, res) => {
  Truck.findOne({ _id: "639424f57f027956bf9334da" })
    .then((result) => {
      console.log("getCoordinates", result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
