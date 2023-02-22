export interface MapStatusAndFirms {
    displayMap: boolean;
    firms: Firm[];
}

export interface Firm {
    id: string;
    name: string;
    shortName: string;
    image: any;
    englishDescription: string;
    estonianDescription: string;
    gridMapColumn: string;
    gridMapRow: string;
    key: string;
}

export interface FirmValidation {
    Name: string;
    Image: string;
    ShortName: string;
    EnglishDescription: string;
    EstonianDescription: string;
    title: string;
    GridMapRow: string;
}
