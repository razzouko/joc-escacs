import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JocComponent } from './projecte/components/joc/joc.component';
import { LoginEquipsComponent } from './projecte/components/login-equips/login-equips.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

let config : SocketIoConfig = {url: 'http://localhost:4000', options: {}};


@NgModule({
  declarations: [
    AppComponent,
    JocComponent,
    LoginEquipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
