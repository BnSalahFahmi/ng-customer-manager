import {Component, OnInit} from '@angular/core';
import {ModalService} from './modal.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ng-cm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modal', [
      transition('void => *', [
        style({opacity: 0}),
        animate('300ms ease-in', style({opacity: 1})),
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {

  modalVisible = false;
  modalVisibleAnimate = false;
  modalContent: ModalContent = {};
  cancel: () => void;
  ok: () => void;
  defaultModalContent: ModalContent = {
    header: 'Please Confirm',
    headerVisible: true,
    body: 'Are you sure you want to continue?',
    cancelButtonText: 'Cancel',
    OKButtonText: 'OK',
    OKButtonVisible: true,
    cancelButtonVisible: true
  };

  constructor(private modalService: ModalService) {
    modalService.show = this.show.bind(this);
    modalService.hide = this.hide.bind(this);
  }

  ngOnInit() {

  }

  show(modalContent: ModalContent) {
    this.modalContent = Object.assign(this.defaultModalContent, modalContent);
    this.modalVisible = true;
    setTimeout(() => this.modalVisibleAnimate = true);

    const promise = new Promise<boolean>((resolve, reject) => {
      this.cancel = () => {
        this.hide();
        resolve(false);
      };
      this.ok = () => {
        this.hide();
        resolve(true);
      };
    });
    return promise;
  }

  hide() {
    this.modalVisibleAnimate = false;
    setTimeout(() => this.modalVisible = false, 300);
  }

}
