const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!!!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmialId is not valid!!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong passowrd!!");
  }
};

const validateEditProfileData = (req) => {
  const allowdEditField = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photoUrl",
    "skill",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowdEditField.includes(field)
  );
  return isEditAllowed;
};
module.exports = {
  validateSignupData,
  validateEditProfileData,
};
