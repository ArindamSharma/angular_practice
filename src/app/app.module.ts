import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { fakeBackendProvider3 } from './task3/post.service';
import { fakeBackendProvider3help } from './task3help/server.service';
import { fakeBackendProvider4 } from './task4/server.service';
import { fakeBackendProvider456 } from './task456merge/server.service';

import { Task1Component } from './task1/task1.component';
import { Task2Component } from './task2/task2.component';
import { Task3Component } from './task3/task3.component';
import { Task4Component } from './task4/task4.component';
import { Task3helpComponent } from './task3help/task3help.component';
import { Task5Component } from './task5/task5.component';
import { Task6Component } from './task6/task6.component';
import { Task456mergeComponent } from './task456merge/task456merge.component';


@NgModule({
  declarations: [
    AppComponent,
    Task1Component,
    Task2Component,
    Task3Component,
    Task3helpComponent,
    Task4Component,
    Task5Component,
    Task6Component,
    Task456mergeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    fakeBackendProvider3,
    fakeBackendProvider3help,
    fakeBackendProvider4,
    fakeBackendProvider456,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
