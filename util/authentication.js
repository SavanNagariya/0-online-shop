createAuthSession = (req, user, save) => {
  req.session.user = user._id.toString();
  req.session.save(save);
};

module.exports = {
  createAuthSession: createAuthSession,
};
