export type Alert ={
  id:string;
  severity:"low"|"mid"|"high";
  crossingName:string;
  webpId:string;
  imageUrl:string;
  address:string;
}