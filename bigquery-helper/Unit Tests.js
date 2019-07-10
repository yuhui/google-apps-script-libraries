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

function testRunQuery_() {
  var projectId = 'i-dont-exist';
  var query = 'SELECT * FROM `bigquery-public-data.samples.wikipedia` LIMIT 1';

  var result = runQuery(query, projectId);

  if (result.rows.length !== 1)
    throw new Error('testRunQuery_() failure: did not get back expected results');

  Logger.log('testRunQuery_() passed!');
};
