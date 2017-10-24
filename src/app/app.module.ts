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
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from "./app-routing.module";
import { TruncateModule } from 'ng2-truncate';
import { environment } from '../environments/environment';

// Material Theme
import { MatButtonModule, MatSidenavModule, MatDialogModule, MatListModule,
	MatInputModule, MatCheckboxModule, MdExpansionModule } from '@angular/material';

// Services
import { ModalService } from './services/modal.service';
import { StoreService } from './services/store.service';
import { AuthService } from './services/auth.service';
import { AccountsService } from './services/accounts.service';
import { TransactionsService } from './services/transactions.service';
import { AuthGuard } from './services/auth-guard.service';
import { NotAuthGuard } from './services/not-auth-guard.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { SignupModalComponent } from './components/modals/signup-modal/signup-modal.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CheckmarkComponent } from './components/animations/checkmark/checkmark.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AccountComponent } from './components/pages/settings/account/account.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotificationsComponent } from './components/pages/settings/notifications/notifications.component';
import { ProfileComponent } from './components/pages/settings/profile/profile.component';
import { UpdateEmailComponent } from './components/pages/settings/account/update-email/update-email.component';
import { UpdatePasswordComponent } from './components/pages/settings/account/update-password/update-password.component';
import { UpdateDisplaynameComponent } from './components/pages/settings/profile/update-displayname/update-displayname.component';
import { DeleteAccountComponent } from './components/pages/settings/account/delete-account/delete-account.component';
import { DeleteAccountModalComponent } from './components/modals/delete-account-modal/delete-account-modal.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { AccountsComponent } from './components/pages/dashboard/accounts/accounts.component';
import { TransactionsComponent } from './components/pages/dashboard/transactions/transactions.component';

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
		DeleteAccountComponent,
		DeleteAccountModalComponent,
		UpdateEmailComponent,
		UpdatePasswordComponent,
		UpdateDisplaynameComponent,
		ForgotPasswordComponent,
		AccountsComponent,
		TransactionsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFirestoreModule,
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
		TruncateModule,
		MdExpansionModule
	],
	entryComponents: [
		SignupModalComponent,
		LoginModalComponent,
		DeleteAccountModalComponent
	],
	providers: [ ModalService, AuthService, AuthGuard, NotAuthGuard, StoreService,
							AccountsService, TransactionsService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
