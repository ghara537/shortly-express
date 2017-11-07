const parseCookies = (req, res, next) => {
  console.log('REQHEADERS = ', req.headers);
  if (req.headers.cookie) {
    var stringCookies = req.headers.cookie.toString();
    console.log('STRING COOKIES = ', stringCookies);
    var cookieArr = stringCookies.split('; ');
    var cookies = {};
    cookieArr.forEach(function(element) {
      var tuple = element.split('=');
      cookies[tuple[0]] = tuple[1];
    });
    console.log('DEM COOKIES = ', cookies);
    req.cookies = cookies;
  }
  //return cookies;
  next();
};

module.exports = parseCookies;