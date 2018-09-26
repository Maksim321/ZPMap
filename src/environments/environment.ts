// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
		apiKey: "AIzaSyAyN_dzKAZEeIuc71cS5JJCCgDz7m2CqUg",
		authDomain: "zpmap-108c4.firebaseapp.com",
		databaseURL: "https://zpmap-108c4.firebaseio.com",
		projectId: "zpmap-108c4",
		storageBucket: "zpmap-108c4.appspot.com",
		messagingSenderId: "330404897435"
    }
};