import { ListImage } from "../images/list-image";

export class ListRoomType{
    id: number;
    name: string;
    pricePerNight: number;
    description: string;
    size: number;
    bedTypeName: number;
    viewTypeName: number;
    capacity: Uint8Array;
    display: boolean;
    currency: string = "TRY";
    photos?: ListImage[];
}