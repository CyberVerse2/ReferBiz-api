function validateData(schema, req, res, next) {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
}

export default validateData;
