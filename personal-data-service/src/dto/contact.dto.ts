interface IContactDto {
    id: number;
    userId: number;
    contactType?: string | null;
    contactValue?: string | null;
}

interface ICreateContactDto {
    userId: number;
    contactType?: string | null;
    contactValue?: string | null;
}

interface IUpdateContactDto {
    contactType?: string | null;
    contactValue?: string | null;
}

export type {IContactDto, ICreateContactDto, IUpdateContactDto};