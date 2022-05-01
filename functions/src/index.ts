import * as functions from "firebase-functions";
const admin = require('firebase-admin');
admin.initializeApp()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.createUserRecords = functions.region('europe-west1').auth.user().onCreate((user) => {
  const uid = user.uid;
  const email = user.email;
  const claims = user.customClaims;
  if (claims && claims.recruiter){
    return admin.firestore().collection('Users').doc(uid).set({
      email: email
  })
  }
  else if (claims && claims.recruiter){
    return admin.firestore().collection('Recruiters').doc(uid).set({
      email: email
    })
  }
  else {
    console.log('No role detected. Document not created.')
  }
});

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
