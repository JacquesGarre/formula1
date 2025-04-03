import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TrackViewerComponent } from "../../components/track-viewer/track-viewer.component";
import { Car } from '../../interfaces/car';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, TrackViewerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cars: Car[] = [
    {
      driver: {
        name: 'Verstappen',
      },
      x: 100,
      y: 200,
      color: '#ff0000',
      selected: true,
    },
    {
      driver: {
        name: 'Hamilton',
      },
      x: 200,
      y: 250,
      color: '#0000ff',
      selected: true,
    },
    {
      driver: {
        name: 'Leclerc',
      },
      x: 150,
      y: 180,
      color: '#00cc00',
      selected: true,
    },
  ];

  toggleCar(driverName: string) {
    this.cars = this.cars.map(car =>
      car.driver.name === driverName
        ? { ...car, selected: !car.selected }
        : car
    );
  }


}
