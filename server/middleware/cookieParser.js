const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    var stringCookies = req.headers.cookie.toString();
    var cookieArr = stringCookies.split('; ');
    var cookies = {};
    cookieArr.forEach(function(element) {
      var tuple = element.split('=');
      cookies[tuple[0]] = tuple[1];
    });
    req.cookies = cookies;
  }
  next();
};

module.exports = parseCookies;