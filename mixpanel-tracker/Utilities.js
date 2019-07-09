/**
 * @file Contains utility methods used by the library.
 */

/**
 * Builds a complete URL from a base URL and a map of URL parameters.
 * @param {string} url The base URL.
 * @param {Object.<string, string>} params The URL parameters and values.
 * @return {string} The complete URL.
 * @private
 */
function buildUrl_(url, params) {
  var paramString = Object.keys(params).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  return url + (url.indexOf('?') >= 0 ? '&' : '?') + paramString;
}

/**
 * Encode the payload with base64.
 * @param {Object<string, string>} payload The payload to encode.
 * @return {string} The base64-encoded payload.
 * @private
 */
function encodePayload_(payload) {
  var payloadString = JSON.stringify(payload);
  var encodedPayloadString = Utilities.base64Encode(payloadString);
  return encodedPayloadString;
}

/**
 * Copy all of the properties in the source objects over to the destination object, and return the destination object.
 * @param {Object} destination The combined object.
 * @param {Object} source The object which properties are copied to the destination.
 * @return {Object} A combined object with the desination and source properties.
 * @see http://underscorejs.org/#extend
 */
function extend_(destination, source) {
  var keys = Object.keys(source);
  for (var i = 0, j = keys.length; i < j; ++i) {
    destination[keys[i]] = source[keys[i]];
  }
  return destination;
}

/**
 * Validates that all of the values in the object are non-empty. If an empty value is found, an error is thrown using the key as the name.
 * @param {Object.<string, string>} params The values to validate.
 * @throw {Error} A key has an empty value.
 * @see https://github.com/gsuitedevs/apps-script-oauth2/blob/master/src/Utilities.js
 * @private
 */
function validate_(params) {
  Object.keys(params).forEach(function (name) {
    var value = params[name];
    if (!value)
      throw new Error(name + ' is required.');
  });
}
