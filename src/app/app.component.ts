import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { BluetoothPrinter } from '@kduma-autoid/capacitor-bluetooth-printer';
//import { Printer } from "@awesome-cordova-plugins/printer";
import EscPosEncoder from 'esc-pos-encoder-ionic';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'capacitor-test';
  busy = false
  message = ""
  devices: {name: string, address: string}[] = []

  constructor(
    private btService: BluetoothSerial
  ) {}
  async handleClick() {

    if (this.busy) return
    this.busy = true
    this.devices = []
    this.message = "looking for printers"
    try {
      const devices = await this.btService.list()
      for (const d of devices) {
        this.devices.push({
          name: d.name,
          address: d.id
        })
      }
      this.message = "think it worked"
    } catch(e) {
      this.message = String(e)
    }


    /*try {
      const data = await BluetoothPrinter.list()
      for (const d of data.devices) {
        this.devices.push({name: d.name, address: d.address})
      }
      this.message = this.devices.length ? "" : "no devices found"
    } catch(e) {
      this.message = String(e)
    }*/


    this.busy = false
  }
}
