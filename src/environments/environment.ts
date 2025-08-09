// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // domainUrl: 'http://localhost:51268/',
  // apiEndPoint: 'http://localhost:51268/api/v1/internal/'
  domainUrl: 'https://adminapi.azadhinda.com',
  apiEndPoint: 'https://adminapi.azadhinda.com/api/v1/internal/'
};
