import { CarPosition } from "./location";

export interface Car {
    driver_number: number;
    positions: CarPosition[];
}
