import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-notification',
  templateUrl: './top-notification.component.html',
  styleUrls: ['./top-notification.component.scss']
})
export class TopNotificationComponent implements OnInit, OnChanges {

  @Input() isSuccess: boolean;
  @Input() message: string;
  @Input() showNotification = false;
  @Output() messageHidden = new EventEmitter<boolean>();
  displayTopNotification = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes::", changes);
    if (this.showNotification) {
      this.displayNotification();
    }
  }

  displayNotification() {
    this.displayTopNotification = true;
    setTimeout(() => {
      this.displayTopNotification = false;
      this.showNotification = false;
      this.messageHidden.emit(true);
    }, 3000);
  }
}
