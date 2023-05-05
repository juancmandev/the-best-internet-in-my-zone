import IspProps from './isp.model';

export default interface ReviewProps {
  id: number;
  review: string;
  rating: number;
  geometry: {
    type: string;
    coordinates: number[];
  };
  isp: IspProps;
}
