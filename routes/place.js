"use strict";

const { Router } = require("express");
const router = Router();
const Place = require("../models/place");

// Create a Place
router.get("/create", (req, res, next) => {
  res.render("places/create");
});

router.post("/create", (req, res, next) => {
  Place.create({
    name: req.body.name,
    type: req.body.type
  })
    .then(place => {
      res.redirect(`/place/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

//Edit a place
router.get("/:id/edit", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Place.findById(id)
    .then(place => {
      res.render("places/edit", { place });
    })
    .catch(error => {
      next(error);
    });
});

//Load a place list
router.get("/list", (req, res, next) => {
  Place.find({})
    .then(places => {
      console.log(places);
      res.render("places/list", { places });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/:id/edit", (req, res, next) => {
  const id = req.params.id;

  Place.findOneAndUpdate(id, {
    name: req.body.name,
    type: req.body.type
  })
    .then(place => {
      res.redirect(`/place/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

// Load a single place
router.get("/:id", (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
      res.render("places/single", { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/:id/delete", (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndDelete(id)

    .then(() => {
      res.redirect(`/place/list`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
