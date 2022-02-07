import { ICountry } from "./ICountry";

export interface IGroupCountries {
    label: string;
    value: string;
    items: ICountry[];
}
