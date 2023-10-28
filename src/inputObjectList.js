var emailConstraints = [
  createConstraint(
    "typeMismatch",
    "Email must have an @ between the username and the email host.",
  ),
  createConstraint("valueMissing", "Email is required."),
];
var zipCodeConstraints = [
  createConstraint("patternMismatch", "The format must be: "),
  createConstraint("valueMissing", "Zip Code is required"),
];
var passwordConstraints = [
  createConstraint(
    "patternMismatch",
    "password must contain 1 number (0-9) \
  password must contain 1 uppercase letters \
  password must contain 1 lowercase letters \
  password must contain 1 non-alpha numeric number \
  password is 8-16 characters with no space",
  ),
  createConstraint("valueMissing", "Password is Required"),
];
var passwordConfirmationConstraints = [
  createConstraint("notSamePassword", "Password do not match"),
  createConstraint("valueMissing", "Password confirmation is Required"),
];
var emailObject = createInputObject(
  "email",
  createConstraintsObject(emailConstraints),
);

var zipCodeObject = createInputObject(
  "zip_code",
  createConstraintsObject(zipCodeConstraints),
);

var passwordObject = createInputObject(
  "password",
  createConstraintsObject(passwordConstraints),
);

var passwordConfirmationObject = createInputObject(
  "password_confirmation",
  createConstraintsObject(passwordConfirmationConstraints),
);
function createInputObject(name, constraints) {
  var inputObject = {
    name,
    constraints,
  };

  return inputObject;
}

function createConstraintsObject(constraints) {
  var constraintsObject = {};
  constraints.forEach((constraint) => {
    constraintsObject[Object.keys(constraint)[0]] =
      Object.values(constraint)[0];
  });
  return constraintsObject;
}

function createConstraint(constraint, errorMessage) {
  return {
    [constraint]: {
      errorMessage,
    },
  };
}

var inputObjectList = [
  emailObject,
  zipCodeObject,
  passwordObject,
  passwordConfirmationObject,
];
export default inputObjectList;
