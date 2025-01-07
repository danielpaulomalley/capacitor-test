import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BluetoothPrinter } from '@kduma-autoid/capacitor-bluetooth-printer';

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
  async handleClick() {
    if (this.busy) return
    this.busy = true
    this.devices = []
    this.message = "looking for printers"
    try {
      const data = await BluetoothPrinter.list()
      for (const d of data.devices) {
        this.devices.push({name: d.name, address: d.address})
      }
      this.message = this.devices.length ? "" : "no devices found"
    } catch(e) {
      this.message = String(e)
    }


    this.busy = false
  }
}
