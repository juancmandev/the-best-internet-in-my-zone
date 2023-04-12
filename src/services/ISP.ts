import { db } from '@/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export const getISP = () =>
  new Promise(async (resolve) => {
    const docSnapshot = await getDocs(collection(db, 'ISP'));

    resolve(docSnapshot.docs.map((doc) => doc.data()));
  });

export const createISP = (data: any) =>
  new Promise(async (resolve) => {
    await addDoc(collection(db, 'ISP'), data);

    resolve(true);
  });
