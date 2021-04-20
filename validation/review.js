const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateReviewInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : "";
  data.rating = validText(data.rating) ? data.rating : "";
//   data.date = validText(data.date) ? data.date : "";
    // data.author = validText(data.author) ? data.author : "";

  if (Validator.isEmpty(data.body)) {
    errors.body = "body field is required";
  }
  if (Validator.isEmpty(data.rating)) {
    errors.rating = "rating field is required";
  }
  if (!Validator.isMongoId(data.author)) {
    errors.author = "author field is required";
  }
   if (!Validator.isInt(data.rating, { max: 5, min: 1 })) {
    errors.rating = "Must be within 1 to 5";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};