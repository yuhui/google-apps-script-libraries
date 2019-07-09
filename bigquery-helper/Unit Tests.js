function testRunQuery_() {
  var projectId = 'i-dont-exist';
  var query = 'SELECT * FROM `bigquery-public-data.samples.wikipedia` LIMIT 1';

  var result = runQuery(query, projectId);

  if (result.rows.length !== 1)
    throw new Error('testRunQuery_() failure: did not get back expected results');

  Logger.log('testRunQuery_() passed!');
};
