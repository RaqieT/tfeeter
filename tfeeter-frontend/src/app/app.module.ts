import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TfeetDetailComponent } from './tfeet-detail/tfeet-detail.component';
import { TfeetsComponent } from './tfeets/tfeets.component';
import { TfeetAddComponent } from './tfeet-add/tfeet-add.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import appConfig from '../assets/app-config.json';
import { ToastrModule } from 'ngx-toastr';
import {RegisterComponent} from './register/register.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: appConfig.keycloakUrl,
        realm: appConfig.keycloakRealm,
        clientId: appConfig.keycloakClient,
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    ToastrModule.forRoot(),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  declarations: [
    AppComponent,
    TfeetsComponent,
    TfeetAddComponent,
    TfeetDetailComponent,
    RegisterComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
