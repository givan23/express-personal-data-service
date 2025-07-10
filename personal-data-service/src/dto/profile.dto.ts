interface IProfileDto {
    id: number;
    userId: number;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    phoneNumber?: string;
}

interface ICreateProfileDto {
    userId: number;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    phoneNumber?: string;
}

interface IUpdateProfileDto {
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    phoneNumber?: string;
}

export type {
    IProfileDto,
    ICreateProfileDto,
    IUpdateProfileDto
};
