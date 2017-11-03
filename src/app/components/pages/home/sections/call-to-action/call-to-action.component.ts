import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../../../services/modal.service";

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.sass']
})
export class CallToActionComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
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
    this.modalService.openLoginModal()
      .afterClosed().subscribe(res => {
      if (res === "signupModal") {
        this.onOpenSignupModal();
      }
    })
  }
}
