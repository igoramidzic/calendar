import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../../../services/modal.service";

@Component({
  selector: 'app-attention-grabber',
  templateUrl: './attention-grabber.component.html',
  styleUrls: ['./attention-grabber.component.sass']
})
export class AttentionGrabberComponent implements OnInit {

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
