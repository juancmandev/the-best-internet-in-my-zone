export default interface ReviewProps {
  city: string;
  country: string;
  isp: string;
  neighborhood: string;
  postalCode: string;
  rating: number;
  review: string;
  street: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
