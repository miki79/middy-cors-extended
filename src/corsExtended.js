const defaults = {
  origin: '*',
  headers: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
  credentials: false,
};

const addCorsHeaders = (opts, handler, next) => {
  const options = Object.assign({}, defaults, opts);

  if (Object.prototype.hasOwnProperty.call(handler.event, 'httpMethod')) {
    handler.response = handler.response || {};
    handler.response.headers = handler.response.headers || {};
    let corsAllowed = false;
    if (!Object.prototype.hasOwnProperty.call(handler.response.headers, 'Access-Control-Allow-Origin')) {
      if (options.origin instanceof RegExp) {
        if (handler.event.headers.Origin.match(options.origin)) {
          corsAllowed = true;
          handler.response.headers['Access-Control-Allow-Origin'] = handler.event.headers.Origin;
        }
      } else if (options.credentials) {
        corsAllowed = true;
        handler.response.headers['Access-Control-Allow-Origin'] = handler.event.headers.Origin;
      } else {
        corsAllowed = true;
        handler.response.headers['Access-Control-Allow-Origin'] = options.origin;
      }
    }
    if (corsAllowed && !Object.prototype.hasOwnProperty.call(handler.response.headers, 'Access-Control-Allow-Credentials') && options.credentials) {
      handler.response.headers['Access-Control-Allow-Credentials'] = 'true';
    }
    if (corsAllowed && !Object.prototype.hasOwnProperty.call(handler.response.headers, 'Access-Control-Allow-Headers')) {
      handler.response.headers['Access-Control-Allow-Headers'] = options.headers;
    }
  }
  next();
};

module.exports = opts => ({
  after: addCorsHeaders.bind(null, opts),
  onError: addCorsHeaders.bind(null, opts),
});

