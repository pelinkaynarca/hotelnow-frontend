import { ListMainFacilitySelection } from "../main-facility-selections/list-main-facility-selection";
import { ListImage } from "../images/list-image";
import { ListFacilityDetailSelection } from "../facility-detail-selections/list-facility-detail-selection";
import { ListRoomType } from "../room-types/ListRoomType";

export class ListHotel {
    id: number;
    name: string;
    stars: number;
    address: string;
    description: string;
    active: boolean;
    checkInTime: string;
    checkOutTime: string;
    neighborhoodName: string;
    mainFacilitySelections: ListMainFacilitySelection[];
    facilityDetailSelections: ListFacilityDetailSelection[];
    //hotelPhone?: ListHotelPhone[];
    hotelImages: ListImage[];
    roomTypes: ListRoomType[];
    //review: ListReview[];
}