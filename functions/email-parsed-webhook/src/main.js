export default async ({ req, res, log, error }) => {
  const { method, url } = req;

  if (method != 'POST' || url !== '/parse-email') {
    error('Invalid request: ' + method + ' ' + url);
    return res.json({
      success: false,
      message: 'Invalid request',
    });
  }

  log(req.body);

  return res.json({
    success: true,
  });
};
