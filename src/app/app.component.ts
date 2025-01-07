import { Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { BluetoothPrinter } from '@kduma-autoid/capacitor-bluetooth-printer';
//import { Printer } from "@awesome-cordova-plugins/printer";
import { CapacitorThermalPrinter } from 'capacitor-thermal-printer';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


}
