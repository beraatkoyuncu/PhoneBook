import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneComponent } from './components/phone/phone.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PhoneComponent },
  { path: 'phones', component: PhoneComponent },
  { path: 'phones/add', component: PhoneComponent },
  { path: 'phones/update', component: PhoneComponent },
  { path: 'phones/delete', component: PhoneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
