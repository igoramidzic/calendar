import {AfterContentChecked, Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import {LoaderService} from "./services/loader.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterContentChecked {

  showLoader: boolean;

	constructor (private loaderService: LoaderService) {}

	ngOnInit() {
    // this.loaderService.status.subscribe((val: boolean) => {
    //   this.showLoader = val;
    // });
    // this.loaderService.display(true);
	}

  ngAfterContentChecked () {
    // this.loaderService.display(false);
  }

}
