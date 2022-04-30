import * as functions from "firebase-functions";
const admin = require('firebase-admin');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.setRecruiter = functions.region('europe-west1').https.onCall((data, context) => {
  if (context.auth) {
    const uid = context.auth.uid;
    return admin.auth.setCustomUserClaims(uid, {
      recruiter: true
    }).then(() => {
      return {
        message: 'Success! User has been set to Recruiter'
      }
    }).catch((err: any) =>{
      return err;
    })
    }
});
