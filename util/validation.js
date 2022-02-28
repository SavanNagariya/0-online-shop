isEmpty = (valid) => {
  return !valid || valid.trim() === "";
};

isFilled = (email, password) => {
  return (
    email && email.includes("@") && password && password.trim().length >= 6
  );
};

userInputValid = (email, password, name, postcode, street, city) => {
  return (
    isFilled(email, password) &&
    !isEmpty(name) &&
    !isEmpty(postcode) &&
    !isEmpty(street) &&
    !isEmpty(city)
  );
};

confirmationEmail = (email, confirmEmail) => {
  return email === confirmEmail;
};

module.exports = {
  userInputValid: userInputValid,
  confirmationEmail: confirmationEmail,
};
