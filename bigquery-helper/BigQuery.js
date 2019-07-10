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
 * Runs a query in BigQuery (without writing to any permanent destination), and returns the result.
 * Queries are always run with Standard SQL, and using the query cache.
 * Supports Data Manipulation Language (DML): https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language
 * DOES NOT support:
 * - query parameters
 * - BATCH priority
 * - maximum billing tier
 * - maximum bytes billed
 *
 * Throws an exception when any error is returned by BigQuery. Error messages are concatenated with new-lines.
 *
 * @param {string} query The query to run.
 * @param {string} projectId ID of the Google Cloud project to use (i.e. get billed).
 * @return {object} Result of the query: { projectId: string, query: string, rows: array of objects, numDmlAffectedRows: int }, where row object is { field: value, ... }.
 */

function runQuery(query, projectId) {
  var queryRequest = createQueryRequest_(query);

  var queryResponse = getQueryResponse_(queryRequest, projectId);

  var result = {
    projectId: queryResponse.jobReference.projectId,
    query: query,
    rows: [],
    numDmlAffectedRows: 0,
  };

  if (queryResponse.numDmlAffectedRows) {
    result.numDmlAffectedRows = parseInt(queryResponse.numDmlAffectedRows);
  } else {
    result.rows = compileQueryResultRows_(queryResponse);
  }

  return result;
}

function createQueryRequest_(query) {
  var queryRequest = BigQuery.newQueryRequest();

  queryRequest.dryRun = false;
  queryRequest.query = query;
  queryRequest.useLegacySql = false;
  queryRequest.useQueryCache = true;

  return queryRequest;
}

function getQueryResponse_(queryRequest, projectId) {
  var queryResponse = BigQuery.Jobs.query(queryRequest, projectId);
  var jobId = queryResponse.jobReference.jobId;

  // Check on status of the Query Job.
  var sleepTimeMs = 500;
  while (!queryResponse.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResponse = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  if (queryResponse.errors) {
    var errorMessages = queryResponse.errors.map(function (error) {
      return error.message;
    });
    throw new Exception(errorMessages.join('\n'));
  }

  return queryResponse;
}

function compileQueryResultRows_(queryResponse) {
  var projectId = queryResponse.jobReference.projectId;
  var jobId = queryResponse.jobReference.jobId;

  // Get the results headers.
  var tableFieldSchema = queryResponse.schema.fields;
  var tableFieldNames = tableFieldSchema.map(function (field) {
    return field.name;
  });

  // Get all the rows of results.
  var tableRows = queryResponse.rows;
  while (queryResponse.pageToken) {
    queryResponse = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResponse.pageToken
    });
    tableRows = tableRows.concat(queryResponse.rows);
  }

  var rows = tableRows.map(function (tableRow) {
    var fields = tableRow.f;
    var row = {};
    for (var i = 0, j = fields.length; i < j; i++) {
      var fieldName = this.tableFieldNames[i];
      var field = fields[i];
      var value = field.v;
      row[fieldName] = value;
    }
    return row;
  }, { tableFieldNames: tableFieldNames });

  return rows;
}
