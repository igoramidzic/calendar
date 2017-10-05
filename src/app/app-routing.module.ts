import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./components/pages/page-not-found/page-not-found.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { AccountComponent } from "./components/pages/account/account.component";

// Routes
const appRoutes: Routes = [
	{ path: '', component: AppComponent, canActivate: [ AuthGuardService ] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] },
	{ path: 'account', component: AccountComponent, canActivate: [ AuthGuardService ] },
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