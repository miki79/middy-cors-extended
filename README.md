[![NPM version](https://img.shields.io/npm/v/middy-cors-extended.svg?style=flat-square)](https://www.npmjs.com/package/middy-cors-extended)
[![CircleCI](https://circleci.com/gh/miki79/middy-cors-extended.svg?style=shield)](https://circleci.com/gh/miki79/middy-cors-extended)
[![Test Coverage](https://api.codeclimate.com/v1/badges/37f15eba5cacdf29b1c9/test_coverage)](https://codeclimate.com/github/miki79/middy-cors-extended/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/miki79/middy-cors-extended/badge.svg?targetFile=package.json)](https://snyk.io/test/github/miki79/middy-cors-extended?targetFile=package.json)

Middleware for [Middy](https://github.com/middyjs/middy), extends the [CORS](https://github.com/middyjs/middy/blob/master/docs/middlewares.md#cors) middleware adding extra options.

Sets CORS headers (Access-Control-Allow-Origin, Access-Control-Allow-Headers and Access-Control-Allow-Credentials).

Sets headers in after and onError phases.

### Options

- origin (string) (optional): origin to put in the header (default: "*")
- headers (string) (optional): comma list of headers to put in Access-Control-Allow-Headers (default: "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent")
- credentials (boolean) (optional): if true, set Access-Control-Allow-Credentials to true, and put Access-Control-Allow-Origin as the Origin request header.


### Sample usage
```javascript
const middy = require('middy');
const { cors } = require('middy/middlewares');

const handler = middy((event, context, callback) => {
  callback(null, {});
})

handler.use(cors({origin:'http://www.google.co.uk',credentials:true}));

```