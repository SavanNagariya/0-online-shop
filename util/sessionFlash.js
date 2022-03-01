getFlashSession = (req) => {
  const authData = req.session.authData;

  req.session.authData = null;

  return authData;
};

errorFlashSessionData = (req, data, action) => {
  req.session.authData = data;
  req.session.save(action);
};

module.exports = {
  getFlashSession: getFlashSession,
  errorFlashSessionData: errorFlashSessionData,
};
