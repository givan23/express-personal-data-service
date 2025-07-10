interface IPreferenceDto {
    id?: number;
    userId: number;
    preferenceKey: string;
    preferenceValue?: string;
}

interface ICreatePreferenceDto {
    userId: number;
    preferenceKey: string;
    preferenceValue?: string;
}

interface IUpdatePreferenceDto {
    preferenceKey?: string;
    preferenceValue?: string;
}

export type {IPreferenceDto, ICreatePreferenceDto, IUpdatePreferenceDto};