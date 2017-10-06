import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
	
	constructor(private authService: AuthService) { }

	ngOnInit() {
	}
	
}
