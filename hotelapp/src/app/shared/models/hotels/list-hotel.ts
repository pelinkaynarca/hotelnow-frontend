import { ListMainFacilitySelection } from "../main-facility-selections/list-main-facility-selection";

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
    mainFacilitySelection: ListMainFacilitySelection[];
    //facilityDetailSelection: ListFacilityDetailSelection[];
    //hotelPhone?: ListHotelPhone[];
    //hotelImage?: ListImage[];
    //roomType: ListRoomType[];
    //review: ListReview[];
}