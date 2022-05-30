import { storage } from '../../services/firebaseconfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const fileToStorage = async (f: File, bucket: string): Promise<string> => {
  const storageRef = ref(storage);

  const bucketRef = ref(storageRef, bucket);

  const fileRef = ref(bucketRef, f.name);

  const fileSnap = await uploadBytes(fileRef, f);

  return getDownloadURL(fileSnap.ref);
};

export default fileToStorage;
