import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

	@Output() onToggleSidebar = new EventEmitter<boolean>();
	user: Object;
	
	constructor(private modalService: ModalService, private authService: AuthService) { }

	ngOnInit() {
		this.authService.afAuth.authState.subscribe(user => {
			this.user = user;
		})
	}

	onOpenSignupModal () {
		this.modalService.openSignupModal()
			.afterClosed().subscribe(res => {
				if (res === "loginModal") {
					this.onOpenLoginModal();
				}
			})
	}

	onOpenLoginModal () {
		this.modalService.openLoginModal();
	}

}
