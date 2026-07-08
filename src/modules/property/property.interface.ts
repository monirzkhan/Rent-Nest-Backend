import { PropertyScalarWhereInput } from "../../../generated/prisma/models";

export interface IPropertyQuery extends PropertyScalarWhereInput {
    searchTerm?: string
    page?: string
    limit?: string
    sortOrder?: string
    sortBy?: string
    
}