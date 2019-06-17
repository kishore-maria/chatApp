import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChatBoxComponent } from './components/chat-room/components/chat-box/chat-box.component';
import { ChatEffects } from './store/effects/chat.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ChatRoomComponent,
    SnackBarComponent,
    NavBarComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([ AuthEffects, ChatEffects ]),
    StoreDevtoolsModule .instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [
    SnackBarComponent,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
