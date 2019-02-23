import { Component, OnInit, Input } from '@angular/core';
import { HttpRequestService } from '../services/http-request.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  clickedButton: any = 0;
  withdrawMoney: any = '';
  closeResult: string;
  withhdrawError: any;
  withdrawBoolean: boolean;
  constructor(private httpRequest: HttpRequestService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  clickedNumber(e) {

    if(e === 'X') {

      this.clickedButton = this.clickedButton.slice(0, -1);

      this.clickedButton = this.clickedButton.replace(/,/g, '');

      this.clickedButton = Number(this.clickedButton);

      this.clickedButton = this.clickedButton.toLocaleString(undefined, {maximumFractionDigits:2});

    } else {

      this.clickedButton += e;

      this.clickedButton = this.clickedButton.replace(/,/g, '');

      this.clickedButton = Number(this.clickedButton);

      this.clickedButton = this.clickedButton.toLocaleString(undefined, {maximumFractionDigits:2})

    }
  }

  // OPEN POP UP
  open(content) {
  this.httpRequest.requestCash(this.clickedButton)
                  .subscribe(
                    res => {
                      this.withdrawBoolean = true;
                      this.withdrawMoney = res
                      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                      this.closeResult = `Closed with: ${result}`;

                      }, (reason) => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                      });
                    },
                    error => {
                      this.withdrawBoolean = false;
                      this.withhdrawError = error.error;
                      console.log(error);
                      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                        this.closeResult = `Closed with: ${result}`;
                      }, (reason) => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                      });
                    }
                  );
  }
  // CLOSE POP UP
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  pointerAnimation(e) {
    const d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";
    d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
  }

}
