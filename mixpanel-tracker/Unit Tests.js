/**
 * Copyright 2019 Yuhui. All Rights Reserved.
 *
 * Licensed under the GNU General Public License, Version 3 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file Contains unit test methods for the library.
 */

var TEST_DISTINCT_ID_ = 'abc12345';
var TEST_TOKEN_ = 'get-this-from-project-settings';
var TEST_PAYLOAD_ = {
  'foo': 'Lorem ipsum dolor sit amet',
  'bar': 42,
};

function runUnitTests_() {
  testEncodePayload_();

  testIdentify_();
  testRegister_();
  testRegisterOnce_();
  testTrack_();

  Logger.log('All unit tests passed!');
}

function testEncodePayload_() {
  var encodedPayload = encodePayload_(TEST_PAYLOAD_);

  if (encodedPayload !== Utilities.base64Encode(JSON.stringify(TEST_PAYLOAD_)))
    throw new Error('testEncodePayload_() failure: payload not encoded correctly.');

  Logger.log('testEncodePayload_() passed!');
}

function testInit_() {
  var mixpanel = setupMixpanel_();

  if (mixpanel.token() !== TEST_TOKEN_)
    throw new Error('testInit_() failure: token does not match.');

  Logger.log('testInit_() passed!');
}

function testIdentify_() {
  var mixpanel = setupMixpanel_();

  if (mixpanel.distinctId() !== TEST_DISTINCT_ID_)
    throw new Error('testIdentify_() failure: distinctId does not match.');

  Logger.log('testIdentify_() passed!');
}

function testRegister_() {
  var mixpanel = setupMixpanel_();

  var properties = {
    'currentDate': new Date().toDateString(),
  };

  try {
    var trackerStatus = mixpanel.register(properties);
    if (trackerStatus !== 1)
      throw new Error('testRegister_() failure: Mixpanel did not report success.');
  } catch (e) {
    throw new Error('testRegister_() failure: ' + e.message);
  }

  Logger.log('testRegister_() passed!');
}

function testRegisterOnce_() {
  var mixpanel = setupMixpanel_();

  var properties = {
    'scriptId': ScriptApp.getScriptId(),
  };

  try {
    var trackerStatus = mixpanel.registerOnce(properties);
    if (trackerStatus !== 1)
      throw new Error('testRegisterOnce_() failure: Mixpanel did not report success.');
  } catch (e) {
    throw new Error('testRegisterOnce_() failure: ' + e.message);
  }

  Logger.log('testRegisterOnce_() passed!');
}

function testTrack_() {
  var mixpanel = setupMixpanel_();

  var event = 'unit test';
  var properties = {
    'currentTime': new Date().toString(),
  };

  try {
    var trackerStatus = mixpanel.track(event, properties);
    if (trackerStatus !== 1)
      throw new Error('testTrack_() failure: Mixpanel did not report success.');
  } catch (e) {
    throw new Error('testTrack_() failure: ' + e.message);
  }

  Logger.log('testTrack_() passed!');
}

function setupMixpanel_() {
  var mixpanel = init(TEST_TOKEN_);
  mixpanel.identify(TEST_DISTINCT_ID_);
  return mixpanel;
}
