# google-apps-script-libraries

A collection of libraries to simplify interacting with Google's Advanced Services and other 3rd party services that can be included in Google Apps Script. The main idea is to remove the "plumbing" so that you can focus on code to do your work, rather than to grapple with Google's services.

## How to use

1. Get the project key for the library that you want to use.
    - The project key is available in the library's README.
2. Inside your Apps Script script, go to **Resources > Libraries...**.
3. Paste the above project key into the **Add a Library** text box.
4. Click **Add** to add the library to your project.
5. Click the **Version** dropdown and choose the latest version of this library to use. 
6. (optional) Change the **Identifier** name to what you would like to use to identify this library in your script.
7. Click **Save** to save the libraries you have added and close the dialog box.

Complete instructions are available from [Google Developers](https://developers.google.com/apps-script/guides/libraries#managing_libraries).

## Available libraries

- `bigquery-helper`: run queries in BigQuery.
- `mixpanel-tracker`: track usage to Mixpanel.
