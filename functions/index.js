// firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// algolia
const algoliasearch = require('algoliasearch');
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = 'SHU9ZMHYCW';
const ALGOLIA_SEARCH_KEY = '291e943309e59bc498b4e6460f162d8c';
const ALGOLIA_ADMIN_KEY = 'cfe182197b6989d34e8765a5f6163ada';
const ALGOLIA_INDEX_NAME = 'dev_misoten';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.onGroupCreated = functions.firestore.document('groups/{groupId}').onCreate((snap, context) => {
  const group = snap.data();
  group.objectID = `groups-${context.params.groupId}-${Date.now()}`;
  group.documentId = context.params.groupId;
  group.type = 'group';

  return index.saveObject(group);
});
exports.onUserCreated = functions.firestore.document('users/{userId}').onCreate((snap, context) => {
  const user = snap.data();
  user.objectID = `users-${context.params.userId}-${Date.now()}`;
  user.documentId = context.params.userId;
  user.type = 'user';

  return index.saveObject(user);
});