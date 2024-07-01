export class UpdateHotel {
    id: number;
    name: string;
    stars?: number;
    address: string;
    description: string;
    active?: boolean;
    checkInTime: string;
    checkOutTime: string;
    neighborhoodId: number;
}