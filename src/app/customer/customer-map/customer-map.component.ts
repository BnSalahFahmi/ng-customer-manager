/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';

import {debounceTime} from 'rxjs/operators';
import {GoogleMapsPointComponent} from './google-maps-point.component';

@Component({
  selector: 'ng-cm-customer-google-maps',
  templateUrl: './customer-map.component.html',
  styleUrls: ['./customer-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerMapComponent implements OnInit, AfterContentInit {

  private isEnabled: boolean;
  private loadingScript: boolean;
  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  mapHeight = '500px';
  mapWidth = '45vw';

  @Input() height: number;
  @Input() width: number;
  @Input() latitude = 48.866667;
  @Input() longitude = 2.333333;
  @Input() markerText = 'Your Location';
  @Input() zoom = 5;
  private _dataPoints: MapDataPoint[] = null;
  @Input()
  public get dataPoints() {
    return this._dataPoints;
  }

  public set dataPoints(value: any[]) {
    this._dataPoints = value;
    this.renderMapPoints();
  }

  @Input() get enabled(): boolean {
    return this.isEnabled;
  }

  set enabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
    this.init();
  }

  @ViewChild('mapContainer', {static: true}) mapDiv: ElementRef;
  @ContentChildren(GoogleMapsPointComponent) mapPoints: QueryList<GoogleMapsPointComponent>;

  constructor() {
  }

  ngOnInit() {
    /*if (this.latitude && this.longitude) {
      if (this.mapHeight && this.mapWidth) {
        this.mapHeight = this.height + 'px';
        this.mapWidth = this.width + 'px';
      } else {
        const hw = this.getWindowHeightWidth(this.mapDiv.nativeElement.ownerDocument);
        this.mapHeight = hw.height / 2 + 'px';
        this.mapWidth = hw.width + 'px';
      }
    }*/
  }

  ngAfterContentInit() {
    this.mapPoints.changes
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        if (this.enabled) {
          this.renderMapPoints();
        }
      });
  }

  init() {
    setTimeout(() => {
      this.ensureScript();
    }, 200);
  }

  private getWindowHeightWidth(document: HTMLDocument) {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    const height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    if (width > 900) {
      width = 900;
    }

    return {height: height, width: width};
  }

  private ensureScript() {
    this.loadingScript = true;
    const document = this.mapDiv.nativeElement.ownerDocument;
    const script = <HTMLScriptElement> document.querySelector('script[id="googlemaps"]');
    if (script) {
      if (this.isEnabled) {
        this.renderMap();
      }
    } else {
      const mapsScript = document.createElement('script');
      mapsScript.id = 'googlemaps';
      mapsScript.type = 'text/javascript';
      mapsScript.async = true;
      mapsScript.defer = true;
      mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1KDldeF_2GzaTXrEHR0l6cyCS7AnmBw';
      mapsScript.onload = () => {
        this.loadingScript = false;
        if (this.isEnabled) {
          this.renderMap();
        }
      };
      document.body.appendChild(mapsScript);
    }
  }

  private renderMap() {
    const latlng = this.createLatLong(this.latitude, this.longitude);
    const options = {
      zoom: this.zoom,
      center: latlng,
      mapTypeControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapDiv.nativeElement, options);

    if ((this.mapPoints && this.mapPoints.length) || (this.dataPoints && this.dataPoints.length)) {
      this.renderMapPoints();
    } else {
      this.createMarker(latlng, this.markerText);
    }
  }

  private createLatLong(latitude: number, longitude: number) {
    return (latitude && longitude) ? new google.maps.LatLng(latitude, longitude) : null;
  }

  private renderMapPoints() {
    if (this.map) {
      this.clearMapPoints();

      const mapPoints = (this.mapPoints && this.mapPoints.length) ? this.mapPoints : this.dataPoints;

      if (mapPoints) {
        for (const point of mapPoints) {
          let markerText = (point.markerText) ? point.markerText : `<h3>${point.firstName} ${point.lastName}</h3>`;
          const mapPointLatlng = this.createLatLong(point.latitude, point.longitude);
          this.createMarker(mapPointLatlng, markerText);
        }
      }
    }
  }

  private clearMapPoints() {
    this.markers.forEach((marker: google.maps.Marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  private createMarker(position: google.maps.LatLng, title: string) {
    const infowindow = new google.maps.InfoWindow({
      content: title
    });

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: title,
      animation: google.maps.Animation.DROP
    });

    this.markers.push(marker);

    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
    });
  }
}
