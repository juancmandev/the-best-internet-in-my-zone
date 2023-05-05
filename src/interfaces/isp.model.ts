import ReviewProps from './review.model';

export default interface IspProps {
  id: number;
  name: string;
  urlImage: string;
  availableIn: string[];
  reviews?: ReviewProps[] | [];
}
