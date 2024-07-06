import { ListImage } from "../images/list-image";
import { ListRoomTypeDetailSelection } from "../room-type-detail-selections/list-room-type-detail-selection";
import { ListRoom } from "../rooms/list-room";

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
    roomTypeImages?: ListImage[];
    roomTypeFacilityDetailSelections?: ListRoomTypeDetailSelection[];
    rooms: ListRoom[];
}