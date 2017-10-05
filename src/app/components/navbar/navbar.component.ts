import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

	@Output() onToggleSidebar = new EventEmitter<boolean>();
	
	constructor(private modalService: ModalService, public afAuth: AngularFireAuth) { }

	ngOnInit() {
		
	}

	// Open signup modal
	onOpenSignupModal () {
		this.modalService.openSignupModal();
	}

	// Open signup modal
	onOpenLoginModal () {
		this.modalService.openLoginModal();
	}

}
