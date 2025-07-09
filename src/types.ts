export interface BinCollection {
    service: string;
    round: string;
    schedule: string;
    day: string;
    date: string;
    read_date: string;
    jsDate?: Date;
}

export enum BinType {
    Food = "Food Waste Collection Service",
    Recycling = "Recycling Collection Service",
    Domestic = "Domestic Waste Collection Service",
    Garden = "Garden Waste Collection Service"
}

