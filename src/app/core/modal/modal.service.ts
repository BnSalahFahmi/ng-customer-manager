import {Injectable} from '@angular/core';

@Injectable()
export class ModalService {

  constructor() {
  }

  show: (modalContent: ModalContent) => Promise<boolean>;
  hide: () => void;

}
