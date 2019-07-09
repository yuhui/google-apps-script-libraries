# mixpanel-tracker

Track requests to Mixpanel from within Google Apps Script.

Project key: `M2Yzdq9J0WSDE83F9hyHYjctILCH4r83t`

Refer to the [repository README](https://github.com/yuhui/google-apps-script-libraries) for instructions to add this library to your script.

## Available functions

### `init()`

Initialise a MixpanelTracker object.

```javascript
var token = 'foo-bar-12345'; // get this from your project settings "Overview"
var mixpanel = MixpanelTracker.init(token); // assumes that the library has been imported as "MixpanelTracker"
```

### `identify()`

Set a user ID.

```javascript
var distinctId = 'abc7890';
mixpanel.identify(distinctId);
```

### `track()`

Track an event with custom properties.

```javascript
var event = 'my-event';
var properties = {
    'foo': 'bar',
    'lorem': 'ipsum',
};
var trackerStatus = mixpanel.track(event, properties);
```

### `register()`

Track a profile update.

```javascript
// a user ID should have been set already with identify()
var profile = {
    'address': '101 Main Street',
    'occupation': 'programmer',
};
var trackerStatus = mixpanel.register(profile);
```

### `registerOnce()`

Track a one-time profile update.

```javascript
// a user ID should have been set already with identify()
var oneTimeProfile = {
    'national id': 'super-secret-xyz444',
};
var trackerStatus = mixpanel.registerOnce(oneTimeProfile);
```
