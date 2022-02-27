createAuthSession = (req, user, save) => {
  req.session.user = user._id.toString();
  req.session.isAdmin = user.isAdmin;
  req.session.save(save);
};

authLogout = (req) => {
  req.session.user = null;
  req.session.isAdmin = false;
};

module.exports = {
  createAuthSession: createAuthSession,
  authLogout: authLogout,
};
