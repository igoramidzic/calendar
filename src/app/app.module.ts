import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from "./app-routing.module";
import { TruncateModule } from 'ng2-truncate';
import { environment } from '../environments/environment';

// Material Theme
import { MatButtonModule, MatSidenavModule, MatDialogModule, MatListModule,
	MatInputModule, MatCheckboxModule } from '@angular/material';

// Services
import { ModalService } from './services/modal.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { NotAuthGuard } from './services/not-auth-guard.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { CheckmarkComponent } from './components/animations/checkmark/checkmark.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AccountComponent } from './components/pages/settings/account/account.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotificationsComponent } from './components/pages/settings/notifications/notifications.component';
import { ProfileComponent } from './components/pages/settings/profile/profile.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		SidebarComponent,
		PageNotFoundComponent,
		LoginModalComponent,
		SignupModalComponent,
		CheckmarkComponent,
		DashboardComponent,
		AccountComponent,
		SettingsComponent,
		HomeComponent,
		NotificationsComponent,
		ProfileComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
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
		MatCheckboxModule,
		TruncateModule
	],
	entryComponents: [
		SignupModalComponent,
		LoginModalComponent
	],
	providers: [ ModalService, AuthService, AuthGuard, NotAuthGuard ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
