interface IUserDto {
    id: number;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ICreateUserDto {
    email: string;
    passwordHash: string;
}

interface IUpdateUserDto {
    email?: string;
    passwordHash?: string;
}

export type {IUserDto, ICreateUserDto, IUpdateUserDto};

