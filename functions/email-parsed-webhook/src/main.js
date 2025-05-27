export default async ({ req, res, log, error }) => {
  log(req.body);

  return res.json({
    success: true,
  });
};
