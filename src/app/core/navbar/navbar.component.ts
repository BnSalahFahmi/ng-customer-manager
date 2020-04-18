import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-cm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginLogoutText = 'Login';

  constructor() { }

  ngOnInit(): void {
  }

}
