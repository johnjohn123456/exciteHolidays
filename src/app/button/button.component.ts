import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() number : number | string;
  @Output() clickedNumber: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  clicked(e) {
    this.clickedNumber.emit(e.target.value);
  }

}
