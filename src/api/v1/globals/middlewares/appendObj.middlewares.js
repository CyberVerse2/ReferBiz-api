function appendObj(req, res, next) {
  if (res.statusCode === 200 || res.statusCode === 201) {
    const original = res.json;
    res.json = function (body) {
      body = {
        success: body.stack ? false : true,
        statusCode: res.statusCode,
        message: body.message,
        stack: body.stack,
        data: body.data
      };
      original.call(this, body);
    };
  }
  next();
}
export default appendObj;
