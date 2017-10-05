import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./components/pages/page-not-found/page-not-found.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { AuthGuard } from "./services/auth-guard.service";
import { AccountComponent } from "./components/pages/account/account.component";
import { NotAuthGuard } from "./services/not-auth-guard.service";

// Routes
const appRoutes: Routes = [
	{ path: '', component: AppComponent, canActivate: [ NotAuthGuard] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
	{ path: 'account', component: AccountComponent, canActivate: [ AuthGuard ] },
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