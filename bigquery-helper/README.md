# bigquery-helper

Run queries in BigQuery without scripting for the API's nuances.

Project key: `MG-UJ6t99zBUuQwj93KG-bstILCH4r83t`

Refer to the [repository README](https://github.com/yuhui/google-apps-script-libraries) for instructions to add this library to your script.

## Available functions

 (Assumes that the library has been imported as `BigQueryHelper`.)

### `runQuery()`

Run a query in BigQuery.

```javascript
// run a SELECT query
var projectId = 'my-project-id'; // replace with an actual BigQuery project ID
var query = 'SELECT * FROM `bigquery-public-data.samples.wikipedia` WHERE id >= 12437607 ORDER BY id LIMIT 1';
var result = BigQueryHelper.runQuery(query, projectId);

 /**
 * result.rows contains an array of the results, e.g.:
 * 
 * [
 *   {
 *     title: 'File talk:Replace this image male.svg',
 *     id: 12437607,
 *     language: '',
 *     wp_namespace: 7,
 *     ...
 *   }
 * ] 
 */
```

```javascript
// run a DML query, e.g. DELETE
var projectId = 'my-project-id'; // replace with an actual BigQuery project ID
var query = 'DELETE `my-dataset.my-table` WHERE marked_delete = 1;';
var result = BigQueryHelper.runQuery(query, projectId);

 /**
 * result.numDmlAffectedRows contains the number of affected rows, e.g.:
 * 
 * 42
 * 
 */
```
