'use strict';

const serverless = require('serverless-http');
const app = express();
module.exports.handler = serverless(app);