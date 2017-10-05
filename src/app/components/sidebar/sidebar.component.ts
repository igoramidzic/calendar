import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

	@Output() onToggleSidebar = new EventEmitter<boolean>();
	user: Object;
	
	constructor(private modalService: ModalService, private authService: AuthService) { }

	ngOnInit() {
		this.authService.afAuth.authState.subscribe(user => {
			this.user = user;
		})
	}

	onOpenSignupModal () {
		this.modalService.openSignupModal();
		this.onToggleSidebar.emit();
	}

	onOpenLoginModal () {
		this.modalService.openLoginModal();
		this.onToggleSidebar.emit();
	}

	onLogout () {
		this.authService.logoutUser();
		this.onToggleSidebar.emit();
	}

}
