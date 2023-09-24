function appendObj(req, res, next) {
  console.log(res.statusCode);
  if (res.statusCode == 200 || 201) {
    const original = res.json;
    res.json = function (body) {
      body = {
        success: true,
        statusCode: res.statusCode,
        data: body
      };
      original.call(this, body);
    };
  }
  next();
}
export default appendObj;
