export class UpdateRoomType{
        id: number;
        name: string;
        pricePerNight: number;
        description: string;
        size: number;
        bedTypeId: number;
        viewTypeId: number;
        capacity: Uint8Array;
        display: boolean;
        currency: string = "TRY";
}