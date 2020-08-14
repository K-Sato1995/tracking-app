import { db } from "firebaseConfig";

const addDataToFirestore = (collection: FirestoreCollection, data: Object) => {
  const uid = new Date().getTime().toString();

  db.collection(collection)
    .doc(uid)
    .set(data)
    .then(function () {
      alert("Document successfully written!");
    })
    .catch(function (error: any) {
      alert(`Error writing document: ${error}`);
    });
};

export { addDataToFirestore };
