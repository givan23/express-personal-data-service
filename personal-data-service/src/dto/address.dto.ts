interface IAddressDto {
    id: number;
    userId: number;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

interface ICreateAddressDto {
    userId: number;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

interface IUpdateAddressDto {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

export type {IAddressDto, ICreateAddressDto, IUpdateAddressDto};