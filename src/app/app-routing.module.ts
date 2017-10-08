import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./components/pages/page-not-found/page-not-found.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { AuthGuard } from "./services/auth-guard.service";
import { AccountComponent } from "./components/pages/settings/account/account.component";
import { NotAuthGuard } from "./services/not-auth-guard.service";
import { SettingsComponent } from "./components/pages/settings/settings.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { ProfileComponent } from "./components/pages/settings/profile/profile.component";
import { NotificationsComponent } from "./components/pages/settings/notifications/notifications.component";

// Routes
const appRoutes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [ ] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
	{ path: 'settings', data: { title: 'Settings' }, component: SettingsComponent, canActivateChild: [ AuthGuard ], children: [
		{ path: '', pathMatch: 'full', redirectTo: 'profile' },
		{ path: 'profile', data: { title: 'Profile' }, component: ProfileComponent },
		{ path: 'account',	data: { title: 'Account' }, component: AccountComponent },
		{ path: 'notifications',	data: { title: 'Notifications' }, component: NotificationsComponent },
	] },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {

}