import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrinterTestComponent } from './printer-test/printer-test.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "printer", component: PrinterTestComponent }
];
