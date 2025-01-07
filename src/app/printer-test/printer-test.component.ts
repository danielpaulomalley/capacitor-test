import { Component, NgZone } from "@angular/core";
import { CapacitorThermalPrinter } from "capacitor-thermal-printer";

@Component({
  standalone: true,
  templateUrl: './printer-test.component.html',
  styleUrl: './printer-test.component.scss',

})
export class PrinterTestComponent {
  busy = false
  messages: string[] = []
  devices: {name: string, address: string}[] = []

  constructor(
    private zone: NgZone
  ) {
    try {
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
    } catch (e) {
      this.messages.push(String(e))
    }
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