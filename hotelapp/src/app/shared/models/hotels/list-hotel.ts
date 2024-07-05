import { ListMainFacilitySelection } from "../main-facility-selections/list-main-facility-selection";
import { ListImage } from "../images/list-image";

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
    //facilityDetailSelection: ListFacilityDetailSelection[];
    //hotelPhone?: ListHotelPhone[];
    hotelImages: ListImage[];
    //roomType: ListRoomType[];
    //review: ListReview[];
}