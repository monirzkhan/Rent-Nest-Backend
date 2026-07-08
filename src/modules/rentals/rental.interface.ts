import { PropertyStatus, RentalRequestStatus } from "../../../generated/prisma/enums";

export interface IRentalRequest {
    propertyId: string;
    moveInDate: Date;
    durationMonths: number;
    status?: RentalRequestStatus;
    message?: string;
}