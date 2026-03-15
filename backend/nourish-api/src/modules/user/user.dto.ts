interface IUserDto {
    id: number;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IPublicUserDto {
    id: number;
    email: string;
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

// user preference
interface IUserPreferenceDto {
    id?: number;
    userId: number;
    allergies?: string[];
    dietType?: string;
}

interface ICreateUserPreferenceDto {
    userId: number;
    allergies?: string[];
    dietType?: string;
}

interface IUpdateUserPreferenceDto {
    allergies?: string[];
    dietType?: string;
}

// user profile
interface IUserProfileDto {
    id: number;
    userId: number;
    displayName?: string;
    cookingTimePreference?: string;
    budgetStyle?: number;
}

interface ICreateUserProfileDto {
    userId: number;
    displayName?: string;
    cookingTimePreference?: string;
    budgetStyle?: number;
}

interface IUpdateUserProfileDto {
    displayName?: string;
    cookingTimePreference?: string;
    budgetStyle?: number;
}

export type {
    IUserDto,
    IPublicUserDto,
    ICreateUserDto,
    IUpdateUserDto,
    IUserPreferenceDto,
    ICreateUserPreferenceDto,
    IUpdateUserPreferenceDto,
    IUserProfileDto,
    ICreateUserProfileDto,
    IUpdateUserProfileDto
};

