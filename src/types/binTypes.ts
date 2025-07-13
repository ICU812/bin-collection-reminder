export interface BinCollection {
  service: string; // "Food Waste Collection Service"
  round: string; // "FOOD5"
  schedule: string; // "Mon"
  day: string; // "Monday"
  date: string; //"04/08/2025 00:00:00",
  read_date: string; // "Monday 4th of August"
  jsDate?: Date; // Parsed `date` string property into a JS Date
}
