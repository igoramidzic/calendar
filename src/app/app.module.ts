import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// Material Theme
import { MatButtonModule, MatSidenavModule, MatDialogModule, MatListModule,
	MatInputModule, MatCheckboxModule } from '@angular/material';

// Modules
import { AppRoutingModule } from "./app-routing.module";

// Services
import { ModalService } from './services/modal.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { CheckmarkComponent } from './components/animations/checkmark/checkmark.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		SidebarComponent,
		PageNotFoundComponent,
		LoginModalComponent,
		SignupModalComponent,
		CheckmarkComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,
		HttpModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatSidenavModule,
		MatDialogModule,
		MatListModule,
		MatInputModule,
		MatCheckboxModule
	],
	entryComponents: [
		SignupModalComponent,
		LoginModalComponent
	],
	providers: [ ModalService, AuthService, AuthGuardService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
