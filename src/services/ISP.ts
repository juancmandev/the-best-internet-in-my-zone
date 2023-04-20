import { db } from '@/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export const getISP = () =>
  new Promise(async (resolve) => {
    const docSnapshot = await getDocs(collection(db, 'ISP'));

    const array: any = [];

    docSnapshot.forEach((doc) => {
      array.push({ ...doc.data(), id: doc.id });
    });

    resolve(array);
  });

export const getISPByName = (name: string) =>
  new Promise(async (resolve) => {
    const q = query(collection(db, 'ISP'), where('name', '==', name));
    const docSnapshot = await getDocs(q);

    const array: any = [];

    docSnapshot.forEach((doc) => {
      array.push({ ...doc.data(), id: doc.id });
    });

    resolve(array);
  });

export const createISP = (data: any) =>
  new Promise(async (resolve) => {
    await addDoc(collection(db, 'ISP'), data);

    resolve(true);
  });
