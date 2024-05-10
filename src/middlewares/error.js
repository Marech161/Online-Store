export function errorHandler(err, req, res) {
  let { message, statusCode } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  if (statusCode >= 500) {
    message = 'Internal Server Error';
  }
  res.status(statusCode).json({ message });
}
