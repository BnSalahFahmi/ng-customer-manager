import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class PreloadModulesStrategy implements PreloadingStrategy {

  preloadedModules: string[] = [];

  constructor() {
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    debugger;
    if (route.data && route.data['preload']) {
      this.preloadedModules.push(route.path);
      console.log('Preloaded: ' + route.path);
      return load();
    } else {
      return of(null);
    }
  }

}
