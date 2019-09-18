import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';

import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { HttpClient } from 'selenium-webdriver/http';
import { FormsModule } from "@angular/forms"
import { ClienteServiceService } from './service/cliente-service.service';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { InvestimentoComponent } from './investimento/investimento.component';


import {NgxMaskModule, IConfig} from 'ngx-mask'
export let options: Partial<IConfig> | (() => Partial<IConfig>);


const appRoutes:Routes=[
  
    {path:'', component:ContentComponent},
    {path:'cadastro', component:FormClienteComponent},
    {path:'login',component: LoginComponent},
    {path:'investimento', component: InvestimentoComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    FormClienteComponent,
    LoginComponent,
    InvestimentoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),  
    NgxMaskModule.forRoot(options)

  ],
  providers: [
    ClienteServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
