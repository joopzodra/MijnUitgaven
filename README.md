in /src/assets is csv bestand, is alleen voor development. Hoe te voorkomen dat dit meegaat met app build?

in www is de pre-populated database, maar www is in .gitignore; gaat dus niet meer github > how to exclude?

Building for production Android:

debug version:
ionic build android --prod

release version, unsigned
ionic build android --prod --release

Find the build in platforms > android > build > outputs > apk > xxx.apk

## Database uses callbacks
Contrary to what Ionic's documentation says, the database.executeSql function in database.transaction doesn't return a promise. Instead it uses callback functions.