import { ListImage } from "../images/list-image";

export class ListRoomType{
    id: number;
    name: string;
    pricePerNight: number;
    description: string;
    capacity: number;
    display: boolean;
    currency: string = "TRY";
    photos?: ListImage[];
}