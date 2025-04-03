import { Driver } from "./driver";

export interface Car {
    driver: Driver;
    x: number;
    y: number;
    color: string;
    selected: boolean;
}