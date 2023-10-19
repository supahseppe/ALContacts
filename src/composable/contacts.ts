import { find } from 'lodash';
import { faker } from '@faker-js/faker/locale/en';
import { type Contact, type PhoneEntry, PHONE_TYPE } from '@/types/Contact';

const createContact: () => Contact = () => {
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    return {
        id: faker.string.uuid(),
        firstName: fname,
        lastName: lname,
        email: faker.internet.email({ firstName: fname, lastName: lname }),
        phone: [createPhone({
            type: PHONE_TYPE.MOBILE,
            isDefault: true
        })],
        avatar: faker.image.avatar(),
    };
};

const createPhone = (options = {
    type: PHONE_TYPE.MOBILE,
    isDefault: false
}) => {
    return {
        number: faker.helpers.replaceSymbolWithNumber("+1 (###) ###-####"),
        type: options.type ?? PHONE_TYPE.MOBILE,
        default: options.isDefault,
    } as PhoneEntry;
};

const getDefaultNumber = function (contact: Contact) {
    return find(contact.phone, (p: PhoneEntry) => p.default) as PhoneEntry;
};

const getFullName = (contact: Contact) => {
    let res = '';
    if (contact?.salutation) { res+= `${contact.salutation} `};
    if (contact?.firstName) { res+= `${contact.firstName} `};
    if (contact?.lastName) { res+= contact.lastName };
    return res;
};

const phoneFactory: () => PhoneEntry = () => ({
    name: '',
    number: '',
    type: PHONE_TYPE.MOBILE,
    default: false,
});

const contactFactory: () => Contact = () => ({
    id: faker.string.uuid(),
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: faker.image.avatar(),
    phone: [],
    companyName: '',
    address: {
        street: '',
        city: '',
        state: '',
        zip: '',
    },
});

export { createContact, createPhone, getDefaultNumber, getFullName, phoneFactory, contactFactory }