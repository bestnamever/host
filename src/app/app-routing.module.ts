import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./features/pages/homepage/homepage.component";
import {PreviewComponent} from "./features/pages/preview/preview.component";

const routes: Routes = [

  { path: 'home', component: HomepageComponent },
  { path: 'preview', component: PreviewComponent },
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
