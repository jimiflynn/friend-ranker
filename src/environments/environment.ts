// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAwJ7dBTnZNvxuFre0hYwo0zuUZZk2oMn8",
    authDomain: "friendranker.firebaseapp.com",
    databaseURL: "https://friendranker.firebaseio.com",
    projectId: "friendranker",
    storageBucket: "",
    messagingSenderId: "427084427016"
  },
  fbInitParams: {
    appId: '142033489896905',
    status: true,
    cookie: true,
    autoLogAppEvents : true,
    xfbml            : false,
    version          : 'v2.12'
  }
};
