interface IUserDto {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ICreateUserDto {
    username: string;
    email: string;
    passwordHash: string;
}

interface IUpdateUserDto {
    username?: string;
    email?: string;
    passwordHash?: string;
}

export type {IUserDto, ICreateUserDto, IUpdateUserDto};

