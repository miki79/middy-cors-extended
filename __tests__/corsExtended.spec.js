const middy = require('middy');
const corsExtended = require('../index');


describe('Middleware CORS Extended', () => {
  test('Access-Control-Allow-Origin header should default to "*"', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    handler.use(corsExtended());

    const event = {
      httpMethod: 'GET',
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        },
      });
    });
  });

  test('It should not override already declared Access-Control-Allow-Origin header', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    // other middleware that puts the cors header
    handler.use({
      after: (handlerJs, next) => {
        handlerJs.response = {
          headers: {
            'Access-Control-Allow-Origin': 'https://example12.com',
          },
        };
        next();
      },
    });
    handler.use(corsExtended());

    const event = {
      httpMethod: 'GET',
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Origin': 'https://example12.com',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        },
      });
    });
  });

  test('It should use origin specified in options', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    handler.use(corsExtended({
      origin: 'https://example2.com',
    }));

    const event = {
      httpMethod: 'GET',
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Origin': 'https://example2.com',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        },
      });
    });
  });

  test('It should add headers even onError', () => {
    const handler = middy(() => {
      throw new Error('');
    });

    handler.use(corsExtended({
      origin: 'https://example3.com',
    }));

    const event = {
      httpMethod: 'GET',
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Origin': 'https://example3.com',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        },
      });
    });
  });

  test('It should not override already declared Access-Control-Allow-Headers header', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    // other middleware that puts the cors header
    handler.use({
      after: (handlerJs, next) => {
        handlerJs.response = {
          headers: {
            'Access-Control-Allow-Headers': 'x-example-2',
          },
        };
        next();
      },
    });
    handler.use(corsExtended());

    const event = {
      httpMethod: 'GET',
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'x-example-2',
        },
      });
    });
  });

  test('It should use allowed headers specified in options', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    handler.use(corsExtended({
      headers: 'x-example-1',
    }));

    const event = {
      httpMethod: 'GET',
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'x-example-1',
        },
      });
    });
  });

  test('It should not override already declared Access-Control-Allow-Credentials header as false', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    // other middleware that puts the cors header
    handler.use({
      after: (handlerJs, next) => {
        handlerJs.response = {
          headers: {
            'Access-Control-Allow-Credentials': 'false',
          },
        };
        next();
      },
    });
    handler.use(corsExtended({
      credentials: true,
    }));

    const event = {
      httpMethod: 'GET',
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Credentials': 'false',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        },
      });
    });
  });

  test('It should not override already declared Access-Control-Allow-Credentials header as true', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    // other middleware that puts the cors header
    handler.use({
      after: (handlerJs, next) => {
        handlerJs.response = {
          headers: {
            'Access-Control-Allow-Credentials': 'true',
          },
        };
        next();
      },
    });
    handler.use(corsExtended({
      credentials: false,
    }));

    const event = {
      httpMethod: 'GET',
      headers: {
        Origin: 'http://example.com',
      },
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://example.com',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        },
      });
    });
  });

  test('It should use change credentials as specified in options (true)', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    handler.use(corsExtended({
      credentials: true,
    }));

    const event = {
      httpMethod: 'GET',
      headers: {
        Origin: 'http://example3.com',
      },
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://example3.com',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
        },
      });
    });
  });

  test('It should not change anything if HTTP method is not present in the request', () => {
    const handler = middy((event, context, cb) => {
      cb(null, {});
    });

    handler.use(corsExtended());

    const event = {
    };

    handler(event, {}, (_, response) => {
      expect(response).toEqual({});
    });
  });
});

