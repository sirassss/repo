import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-sidebar-in-nav',
  templateUrl: './sidebar-in-nav.component.html',
  styleUrls: ['./sidebar-in-nav.component.scss'],
})
export class SidebarInNavComponent implements OnInit {
  abc: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.abc = 0;
  }
}
