createAuthSession = (req, user, save) => {
  req.session.user = user._id.toString();
  req.session.save(save);
};

authLogout = (req) => {
  req.session.uid = null;
  req.session.isAuth = false;
};

module.exports = {
  createAuthSession: createAuthSession,
  authLogout: authLogout,
};
