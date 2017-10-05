import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { AuthGuardService } from "./services/auth-guard.service";

// Routes
const appRoutes: Routes = [
	{ path: '', component: AppComponent },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] },
	{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {

}