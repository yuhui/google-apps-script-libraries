/**
 * @file Contains the Mixpanel_ class.
 */

/**
 * Global initialisation function create a new Mixpanel object.
 * @param {string} token The token for a Mixpanel project.
 * @return {Mixpanel_} The Mixpanel object.
 */
function init(token) {
  return new Mixpanel_(token);
}

/**
 * Creates a new Mixpanel service.
 * @param {string} token The token for a Mixpanel project.
 * @constructor
 */
var Mixpanel_ = function(token) {
  validate_({
    'token': token,
  });

  this.token_ = token;
  this.distinctId_ = '';
};

/**
 * The domain of the Mixpanel endpoint.
 * @type {string}
 * @private
 */
Mixpanel_.ENDPOINT_DOMAIN_ = 'https://api.mixpanel.com';

/**
 * The paths of the Mixpanel endpoints.
 * @type {Object<string, string>}
 * @private
 */
Mixpanel_.ENDPOINTS_ = {
  'engage': '/engage',
  'track': '/track',
};

/**
 * Get the currently set distinct ID.
 * @return {string} The distinct ID that has been set currently.
 */
Mixpanel_.prototype.distinctId = function () {
  return this.distinctId_;
};

/**
 * Get the token being used.
 * @return {string} The Mixpanel token being used.
 */
Mixpanel_.prototype.token = function () {
  return this.token_;
};

/**
 * Set an ID for the current user.
 * @param {string} distinctId The ID to set for the current user.
 * @return {Mixpanel} This service, for chaining.
 * @see https://developer.mixpanel.com/docs/javascript#section-managing-user-identity
 */
Mixpanel_.prototype.identify = function (distinctId) {
  this.distinctId_ = distinctId;
  return this;
};

/**
 * Registers user profile properties.
 * @param {Object<string, string>} properties The properties for the user profile.
 * @return {integer} 1 if the requested succeeded.
 * @see https://developer.mixpanel.com/docs/http#section--set
 * @see https://developer.mixpanel.com/docs/javascript#section-super-properties
 */
Mixpanel_.prototype.register = function (properties) {
  return this.sendEngageRequest_('set', properties);
};

/**
 * Registers user profile properties without overwriting existing property values.
 * @param {Object<string, string>} properties The one-time properties for the user profile.
 * @return {integer} 1 if the requested succeeded.
 * @see https://developer.mixpanel.com/docs/http#section--set_once
 * @see https://developer.mixpanel.com/docs/javascript#section-setting-super-properties-only-once
 */
Mixpanel_.prototype.registerOnce = function (properties) {
  return this.sendEngageRequest_('set_once', properties);
};

/**
 * Track an event with optional properties.
 * @param {string} event A name for the event.
 * @param {Object<string, string>} optProperties A collection of properties associated with this event.
 * @return {integer} 1 if the requested succeeded.
 * @see https://developer.mixpanel.com/docs/http#section-tracking-events
 * @see https://developer.mixpanel.com/docs/javascript#section-sending-events
 */
Mixpanel_.prototype.track = function (event, optProperties) {
  var properties = extend_({}, optProperties);

  return this.sendTrackRequest_(event, properties);
};

/**
 * Track a user profile with the specified properties.
 * @param {string} operation The type of user profile properties to track: "set" or "set_once".
 * @param {Object<string, string>} properties A collection of properties associated with this user profile.
 * @return {integer} 1 if the requested succeeded.
 * @throw {Error} 'operation' is not valid.
 * @private
 */
Mixpanel_.prototype.sendEngageRequest_ = function (operation, properties) {
  validate_({
    'operation': operation,
  });

  if (!properties || Object.keys(properties).length === 0)
    return;

  var payload = {
    '$token': this.token_,
  };

  if (this.distinctId_)
    payload['$distinct_id'] = this.distinctId_;

  var setKey;
  switch (operation) {
    case 'set':
      setKey = '$set';
      break;
    case 'set_once':
      setKey = '$set_once';
      break;
    default:
      throw new Error('/engage does not support "' + operation + '" operation.');
      break;
  }
  payload[setKey] = properties;

  return this.sendRequest_('engage', payload);
};

/**
 * Track an event with the specified properties.
 * @param {string} event The name of the event.
 * @param {Object<string, string>} properties A collection of properties associated with this event.
 * @return {integer} 1 if the requested succeeded.
 * @private
 */
Mixpanel_.prototype.sendTrackRequest_ = function (event, properties) {
  properties = extend_(properties, { 'token': this.token_ });

  if (this.distinctId_)
    properties = extend_(properties, { 'distinct_id': this.distinctId_ });

  var payload = {
    'event': event,
    'properties': properties,
  };

  return this.sendRequest_('track', payload);
};

/**
 * Send a request to a Mixpanel endpoint.
 * @param {string} type The type of endpoint to send the request to: "engage" or "track".
 * @param {Object<string, string>} payload The collection of token, distinct ID and properties to send to the endpoint.
 * @return {integer} 1 if the requested succeeded.
 * @throw {Error} 'type' is not valid.
 * @throw {Error} Mixpanel returned a HTTP response code greater or equal to 400.
 * @throw {Error} Mixpanel returned an error status.
 * @private
 */
Mixpanel_.prototype.sendRequest_ = function (type, payload) {
  validate_({
    'type': type,
  });

  if (Object.keys(Mixpanel_.ENDPOINTS_).indexOf(type) === -1)
    throw new Error('Trying to send unknown type "' + type + '".');

  if (!payload || Object.keys(payload).length === 0)
    return;

  var endpoint = Mixpanel_.ENDPOINT_DOMAIN_ + Mixpanel_.ENDPOINTS_[type];
  var encodedPayload = encodePayload_(payload);
  var params = {
    'data': encodedPayload,
    'verbose': 1,
  };
  var url = buildUrl_(endpoint, params);

  var response = UrlFetchApp.fetch(url);
  var responseCode = response.getResponseCode();
  if (responseCode >= 400)
    throw new Error('Got HTTP status ' + responseCode);

  var contentText = response.getContentText();
  var content = JSON.parse(contentText);

  var trackingStatus = content.status;
  var trackingError = content.error;
  if (trackingStatus === 0 && trackingError)
    throw new Error(trackingError);

  return trackingStatus;
};
