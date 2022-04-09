import { Component, OnInit } from '@angular/core';
import { Constant } from '../../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  IMAGES: string = Constant.IMAGES;
  SALES: string = Constant.SALES;
  activateRole: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role')!;
  }
}
