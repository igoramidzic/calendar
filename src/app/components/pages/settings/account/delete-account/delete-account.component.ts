import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../services/modal.service';

@Component({
	selector: 'app-delete-account',
	templateUrl: './delete-account.component.html',
	styleUrls: ['./delete-account.component.sass']
})
export class DeleteAccountComponent implements OnInit {

	constructor(private modalService: ModalService) { }

	ngOnInit() {
	}

	onOpenDeleteAccountModal () {
		this.modalService.openDeleteAccountModal();
	}

}
