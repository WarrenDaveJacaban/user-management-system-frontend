module.exports = validateRequest;

function validateRequest(req, next, schema) {  // Fix parameter order
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true // remove unknown props
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  } else {
    req.body = value;
    next();
  }
}