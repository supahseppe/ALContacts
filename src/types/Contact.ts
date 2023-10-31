export enum PHONE_TYPE {
    MOBILE = "Mobile",
    WORK = "Work",
    HOME = "Home"
}

export type PhoneType = PHONE_TYPE.MOBILE | PHONE_TYPE.WORK | PHONE_TYPE.HOME;

export type PhoneEntry = {
    name?: string,
    number: string,
    type: PhoneType,
    default: boolean,
}

export type PhoneUpdatePayload = {
    phone: PhoneEntry,
    key: number,
}

export type Contact = {
    id: string;
    salutation?: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    phone: Array<PhoneEntry>;
    companyName?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
};