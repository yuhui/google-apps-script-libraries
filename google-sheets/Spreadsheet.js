/**
 * @preserve Copyright 2016 Yuhui. All Rights Reserved.
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * Refer to LICENSE.html for more information.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Contains the methods exposed by the library, and performs
 * any required setup.
 *
 * @author yuhuibc@gmail.com (Yuhui)
 *
 * To utilize this library, select Resources > Libraries... and enter the following project key:
 * MGR0GJhioQrTFq7tZFERy0stILCH4r83t
 */

/**
 * Get the active spreadsheet.
 *
 * @return {Spreadsheet} Active spreadsheet.
 */
function getActiveSpreadsheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet;
}

/**
 * Get the active spreadsheet's name.
 *
 * @return {string} Active spreadsheet's name.
 */
function getActiveSpreadsheetName() {
  var spreadsheetName;
  var spreadsheet = getActiveSpreadsheet();
  if (spreadsheet) spreadsheetName = spreadsheet.getName();
  return spreadsheetName;
}

/**
 * Get the active spreadsheet's URL.
 *
 * @return {string} Active spreadsheet's URL.
 */
function getActiveSpreadsheetUrl() {
  var spreadsheetUrl;
  var spreadsheet = getActiveSpreadsheet();
  if (spreadsheet) spreadsheetUrl = spreadsheet.getUrl();
  return spreadsheetUrl;
}

/**
 * Get a sheet.
 *
 * @param {String} sheetName (optional) The name of the sheet to get. Default: active sheet.
 *
 * @return {Sheet} Sheet.
 */
function getSheet(sheetName) {
  var sheet;
  var spreadsheet = getActiveSpreadsheet();
  if (spreadsheet) sheet = sheetName ? spreadsheet.getSheetByName(sheetName) : spreadsheet.getActiveSheet();
  return sheet;
}

/**
 * Get a sheet's name.
 *
 * @param {String} sheetName (optional) The name of the sheet to get its name. Default: active sheet.
 *
 * @return {string} Sheet's name.
 */
function getSheetName(sheetName) {
  var theSheetName;
  var sheet = getSheet(sheetName);
  if (sheet) theSheetName = sheet.getsheetName();
  return theSheetName;
}

/**
 * Get a sheet's ID.
 *
 * @param {String} sheetName (optional) The name of the sheet to get its ID. Default: active sheet.
 *
 * @return {Integer} Sheet's ID.
 */
function getSheetId(sheetName) {
  var sheetId;
  var sheet = getSheet(sheetName);
  if (sheet) sheetId = sheet.getSheetId();
  return sheetId;
}

/**
 * Get a sheet's URL.
 *
 * @param {String} sheetName (optional) The name of the sheet to get its URL. Default: active sheet.
 *
 * @return {string} Sheet's URL.
 */
function getSheetUrl(sheetName) {
  var sheetUrl;
  var spreadsheetUrl = getActiveSpreadsheetUrl(),
      sheetId = getSheetId(sheetName);
  if (spreadsheetUrl && sheetId) sheetUrl = spreadsheetUrl + '#' + sheetId;
  return sheetUrl;
}

/**
 * Get a data range.
 *
 * @param {String} rangeName (optional) The name of the range to get. Default: sheet's active range.
 * @param {String} sheetName (optional) The name of the sheet to get its selected range. Default: active sheet.
 * @param {Integer} firstRowIndex (optional) Row index of the first cell.
 * @param {Integer} firstColumnIndex (optional) Column index of the first cell.
 * @param {Integer} numRows (optional) Number of rows to get, starting from firstRowIndex.
 * @param {Integer} numColumns (optional) Number of columns to get, starting from firstColumnIndex.
 *
 * @return {Range} Data range.
 */
function getRange(rangeName, sheetName, firstRowIndex, firstColumnIndex, numRows, numColumns) {
  var range;
  if (rangeName) {
    var spreadsheet = getActiveSpreadsheet();
    if (spreadsheet) range = spreadsheet.getRangeByName(rangeName);
  } else {
    var sheet = getSheet(sheetName);
    if (sheet) {
      if (firstRowIndex && firstColumnIndex && numRows && numColumns) {
        range = sheet.getRange(firstRowIndex, firstColumnIndex, numRows, numColumns);
      } else {
        range = sheet.getActiveRange();
      }
    }
  }
  return range;
}

/**
 * Get the first cell of a data range.
 *
 * @param {String} rangeName (optional) The name of the range to get. Default: sheet's active range.
 * @param {String} sheetName (optional) The name of the sheet to get its selected range. Default: active sheet.
 *
 * @return {Array} [row, column] of first cell in the data range.
 */
function getRangeFirstCell(rangeName, sheetName) {
  var firstCell;
  var range = getRange(rangeName, sheetName);
  if (range) {
    var row = range.getRow(),
        column = range.getColumn();
    firstCell = [row, column];
  }
  return firstCell;
}

/**
 * Get the number of rows of a data range.
 *
 * @param {String} rangeName (optional) The name of the range to get. Default: sheet's active range.
 * @param {String} sheetName (optional) The name of the sheet to get its selected range. Default: active sheet.
 *
 * @return {Integer} Number of rows in the data range.
 */
function getRangeRows(rangeName, sheetName) {
  var rangeRows = getRangeHeight_(rangeName, sheetName);
  return rangeRows;
}
/**
 * @private
 * Get the height of a data range.
 *
 * @param {String} rangeName (optional) The name of the range to get. Default: sheet's active range.
 * @param {String} sheetName (optional) The name of the sheet to get its selected range. Default: active sheet.
 *
 * @return {Integer} Height of the data range.
 */
function getRangeHeight_(rangeName, sheetName) {
  var rangeHeight;
  var range = getRange(rangeName, sheetName);
  if (range) rangeHeight = range.getHeight();
  return rangeHeight;
}

/**
 * Get the number of columns of a data range.
 *
 * @param {String} rangeName (optional) The name of the range to get. Default: sheet's active range.
 * @param {String} sheetName (optional) The name of the sheet to get its selected range. Default: active sheet.
 *
 * @return {Integer} Number of columns in the data range.
 */
function getRangeColumns(rangeName, sheetName) {
  var rangeColumns = getRangeWidth_(rangeName, sheetName);
  return rangeColumns;
}
/**
 * @private
 * Get the width of a data range.
 *
 * @param {String} rangeName (optional) The name of the range to get. Default: sheet's active range.
 * @param {String} sheetName (optional) The name of the sheet to get its selected range. Default: active sheet.
 *
 * @return {Integer} Width of the data range.
 */
function getRangeWidth_(rangeName, sheetName) {
  var rangeWidth;
  var range = getRange(rangeName, sheetName);
  if (range) rangeWidth = range.getWidth();
  return rangeWidth;
}

/**
 * Select a data range.
 *
 * @param {String} sheetName (optional) The name of the sheet to set its selected range. Default: active sheet.
 * @param {Integer} firstRowIndex (optional) Row index of the first cell.
 * @param {Integer} firstColumnIndex (optional) Column index of the first cell.
 * @param {Integer} numRows (optional) Number of rows to get, starting from firstRowIndex.
 * @param {Integer} numColumns (optional) Number of columns to get, starting from firstColumnIndex.
 */
function selectRange(sheetName, firstRowIndex, firstColumnIndex, numRows, numColumns) {
  var rangeName = undefined;
  var range = getRange(rangeName, sheetName, firstRowIndex, firstColumnIndex, numRows, numColumns);
  if (range) sheet.setActiveSelection(range);
}

/**
 * Insert a sheet into the active spreadsheet.
 *
 * @param {String} sheetName (optional) The name of the sheet to inserted.
 * @param {Integer} sheetIndex (optional) The index of an existing sheet that this new sheet should be inserted after. Default: none.
 * @param {Integer} maxNumColumns (optional) The number of columns that the inserted sheet should have. Default: 1,000.
 * @param {Array} sheetHeader (optional) 1 row of cells to be the sheet's header. Default: none.
 *
 * @return {Sheet} The sheet that has been inserted.
 */
function insertSheet(sheetName, sheetIndex, maxNumColumns, sheetHeader) {
  var sheet;
  var spreadsheet = getActiveSpreadsheet();
  if (spreadsheet) {
    sheet = sheetIndex ? spreadsheet.insertSheet(sheetName, sheetIndex) : spreadsheet.insertSheet(sheetName);
    if (sheet) {
      // delete unneeded columns
      var maxNumColumns = maxNumColumns || 1000;
      var sheetMaxColumns = sheet.getMaxColumns();
      if (sheetMaxColumns > maxNumColumns) sheet.deleteColumns(maxNumColumns, sheetMaxColumns - maxNumColumns);

      // start from scratch
      sheet.clear();

      if (sheetHeader) {
        sheet.appendRow(sheetHeader);

        for (var i = 1, j = sheetHeader.length; i <= j; i++) {
          sheet.getRange(1, i).setFontWeight('bold');
        }

        sheet.setFrozenRows(1);
      }
    }
  }

  return sheet;
}

/**
 * Add 1,000 blank rows to the bottom of a sheet.
 *
 * @param {Boolean} ifNoMoreRows Whether to add the rows if all of the sheet's rows have data. Default: false.
 * @param {String} sheetName (optional) The name of the sheet to add rows to. Default: active sheet.
 */
function add1000Rows(ifNoMoreRows, sheetName) {
  var ifNoMoreRows = ifNoMoreRows || false;
  var sheet = getSheet(sheetName);
  if (sheet) {
    if (!ifNoMoreRows || sheet.getLastRow() == sheet.getMaxRows()) {
      sheet.insertRowsAfter(sheet.getMaxRows(), 1000);
    }
  }
}

/**
 * Delete rows at the bottom of a sheet that don't have any data.
 *
 * @param {String} sheetName (optional) The name of the sheet to delete rows from. Default: active sheet.
 */
function deleteUnusedRows(sheetName) {
  var sheet = getSheet(sheetName);
  if (sheet) {
    var sheetLastRow = sheet.getLastRow();
    var sheetMaxRows = sheet.getMaxRows();
    var deleteRowIndex = sheetLastRow + 1;
    var deleteNumRows = sheetMaxRows - deleteRowIndex + 1;
    if (deleteNumRows > 0) sheet.deleteRows(deleteRowIndex, deleteNumRows);
  }
}

/**
 * Sort all of the data in a sheet by the given specification.
 *
 * @param {Integer or Object} sortSpecObj Refer to https://developers.google.com/apps-script/reference/spreadsheet/range#sortsortspecobj. Default: 1 (column A ascending).
 * @param {Boolean} firstRowIsHeader (optional) Whether the first row of the sheet is a header row. Default: false.
 * @param {String} sheetName (optional) The name of the sheet to get its selected range. Default: active sheet.
 */
function sortRange(sortSpecObj, sheetName) {
  var sortSpecObj = sortSpecObj || 1;
  var firstRowIsHeader = firstRowIsHeader || false;

  var sheet = getSheet(sheetName);
  if (sheet) {
    var sheetLastColumn = sheet.getLastColumn();
    var sheetLastRow = sheet.getLastRow();
    var firstRowIndex = firstRowIsHeader ? 2 : 1;
    var range = sheet.getRange(firstRowIndex, 1, sheetLastRow, sheetLastColumn);

    if (range) range.sort(sortSpecObj);
  }
}