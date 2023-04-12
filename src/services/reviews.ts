import { db } from '@/firebase';
import ReviewProps from '@/interfaces/review.model';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export const addReview = (reviewData: ReviewProps) =>
  new Promise(async (resolve) => {
    await addDoc(collection(db, 'reviews'), reviewData);

    resolve(true);
  });

export const getReviews = () =>
  new Promise(async (resolve) => {
    const reviewsSnapshot = await getDocs(collection(db, 'reviews'));

    resolve(reviewsSnapshot.docs.map((doc) => doc.data()));
  });
