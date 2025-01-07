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
  title = 'capacitor-test';

  busy = false
  messages: string[] = []
  devices: {name: string, address: string}[] = []

  constructor(
    private zone: NgZone
  ) {
    CapacitorThermalPrinter.addListener("discoverDevices", ({devices}) => {
      zone.run(() => {
        this.devices = []
        for (const d of devices) {
          this.devices.push({
            name: d.name,
            address: d.address
          })
        }
      })
    })
    CapacitorThermalPrinter.addListener("connected", () => {
      zone.run(() => {
        this.messages.push("connected")
      })
    })
    CapacitorThermalPrinter.addListener("disconnected", () => {
      zone.run(() => {
        this.messages.push("disconnected")
      })
    })
    CapacitorThermalPrinter.addListener("discoveryFinish", () => {
      zone.run(() => {
        this.messages.push("discoveryFinish")
      })
    })
  }
  async handleClick() {
    if (this.busy) return
    this.busy = true
    this.devices = []
    this.messages.push("looking for printers")
    try {
      await CapacitorThermalPrinter.startScan()
      this.messages.push("think it worked")
    } catch(e) {
      this.messages.push(String(e))
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
