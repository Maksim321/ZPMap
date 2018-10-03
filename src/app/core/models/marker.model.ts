import { Point } from './point.model';

export interface Marker { 
  uidCategory: string;
  uidSubcategory: string;
  NameCreator: string;
  Title: string;
  Description: string;
  Point: Point;
  Image:string;
  Date:any;
}