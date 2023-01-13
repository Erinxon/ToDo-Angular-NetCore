import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiUrlInterceptorInterceptor } from './core/interceptors/api-url-interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["*"],
        disallowedRoutes: ["*"],
      },
    }),
    ToastrModule.forRoot()
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiUrlInterceptorInterceptor,
    multi: true
  },
{
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
