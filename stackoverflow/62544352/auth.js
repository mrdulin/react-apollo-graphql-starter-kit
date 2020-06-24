const jwksClient = require('./jwks');

function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, function (err, key) {
    console.log('inside getSigningKey');
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(err, signingKey);
  });
}

exports.getKey = getKey;
