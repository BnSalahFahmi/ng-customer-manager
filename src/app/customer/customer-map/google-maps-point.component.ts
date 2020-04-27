import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cm-google-maps-point',
  template: ``
})
export class GoogleMapsPointComponent implements OnInit {

  @Input() longitude: number;
  @Input() latitude: number;
  @Input() markerText: string;

  constructor() {
  }

  ngOnInit() {

  }

}
