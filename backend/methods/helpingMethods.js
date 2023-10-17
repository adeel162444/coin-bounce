const jwt = require("jsonwebtoken");
exports.errorMessage = (res, status, message) => {
  res.status(status).json({
    success: false,
    error: message,
  });
};
exports.storeAcessToken = (res, user) => {
  const token = this.getAccessToken(user);
  res.cookie("access_token", token, {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  return token;
};
exports.storeRefreshToken = (res, user) => {
  const token = this.getRefreshToken(user);
  res.cookie("refresh_token", token, {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  return token;
};
exports.getAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_KEY, {
    expiresIn: "15m",
  });
};
exports.getRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_KEY, {
    expiresIn: "7d",
  });
};
//decoded User
exports.decodedUser = (req) => {
  const { refresh_token } = req.cookies;
  const decoded = jwt.verify(refresh_token, process.env.REFRESH_KEY);
  return decoded.id;
};
