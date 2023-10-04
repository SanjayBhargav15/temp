const mongoose = require('mongoose');
const Loc = mongoose.model('menu');

// EXPOSED METHODS

const reviewsCreate = function (req, res) {
  const menuid = req.params.menuid;
  if (menuid) {
    Loc
      .findById(menuid)
      .select('reviews')
      .exec((err, menu) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          _doAddReview(req, res, menu);
        }
      }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, menuid required"
      });
  }
};

const reviewsReadOne = function (req, res) {
  if (req.params && req.params.menuid && req.params.reviewid) {
    Loc
      .findById(req.params.menuid)
      .exec((err, menu) => {
        if (!menu) {
          res	
            .status(404) 
            .json({	
              "message": "menuid not found"
            });	 
          return;
        } else if (err) {
          res	
            .status(404) 
            .json(err); 
          return; 	
        }
        if (menu.reviews && menu.reviews.length > 0) {
          const review = menu.reviews.id(req.params.reviewid);
          if (!review) {
            res
              .status(404)
              .json({
                "message": "reviewid not found"
            });
          } else {
            response = {
              menu : {
                name : menu.name,
                id : req.params.menuid
              },
              review : review
            };
            res
              .status(200)
              .json(response);
          }
        } else {
          res
            .status(404)
            .json({
              "message": "No reviews found"
          });
        } 
      });
  } else {		
    res		
      .status(404) 	
      .json({	
        "message": "Not found, menuid and reviewid are both required"
      });		
  }
};

const reviewsUpdateOne = function (req, res) {
  if (!req.params.menuid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, menuid and reviewid are both required"
      });
    return;
  }
  Loc
    .findById(req.params.menuid)
    .select('reviews')
    .exec((err, menu) => {
      if (!menu) {
        res
          .status(404)
          .json({
            "message": "menuid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (menu.reviews && menu.reviews.length > 0) {
        let thisReview = menu.reviews.id(req.params.reviewid);
        if (!thisReview) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          menu.save((err, menu) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(menu._id);
              res
                .status(200)
                .json(thisReview);
            }
          });
        }
      } else {
        res
          .status(404)
          json({
            "message": "No review to update"
          });
      }
    }
  );
};

const reviewsDeleteOne = function (req, res) {
  if (!req.params.menuid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, menuid and reviewid are both required"
      });
    return;
  }
  Loc
    .findById(req.params.menuid)
    .select('reviews')
    .exec((err, menu) => {
      if (!menu) {
        res
          .status(404)
          .json({
            "message": "menuid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (menu.reviews && menu.reviews.length > 0) {
        if (!menu.reviews.id(req.params.reviewid)) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          menu.reviews.id(req.params.reviewid).remove();
          menu.save((err) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              updateAverageRating(menu._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No review to delete"
          });
      }
    }
  );
};

// PRIVATE HELPER METHODS

const _doAddReview = function(req, res, menu) {
  if (!menu) {
    res
      .status(404)
      .json({
        "message": "menuid not found"
      });
  } else {
    menu.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    menu.save((err, menu) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json(err);
      } else {
        _updateAverageRating(menu._id);
        let thisReview = menu.reviews[menu.reviews.length - 1];
         res
           .status(201)
           .json(thisReview);
      }
    });
  }
};

const _updateAverageRating = function(menuid) {
  Loc
    .findById(menuid)
    .select('rating reviews')
    .exec((err, menu) => {
      if (!err) {
        _doSetAverageRating(menu); 
      }
    });
};

const _doSetAverageRating = function(menu) {
  if (menu.reviews && menu.reviews.length > 0) {
    const reviewCount = menu.reviews.length;
    let ratingTotal = 0;
    for (let i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + menu.reviews[i].rating;
    }
    let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    menu.rating = ratingAverage;
    menu.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};


module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};