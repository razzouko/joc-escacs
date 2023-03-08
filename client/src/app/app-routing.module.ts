import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JocComponent } from './projecte/components/joc/joc.component';
import { LoginEquipsComponent } from './projecte/components/login-equips/login-equips.component';

const routes: Routes = [{path: '' , component : LoginEquipsComponent} , 
                        {path: 'joc' , component : JocComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
