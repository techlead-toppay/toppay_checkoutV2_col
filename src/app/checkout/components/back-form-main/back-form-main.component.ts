import { Component, OnInit } from '@angular/core';

import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'back-form-main',
  templateUrl: './back-form-main.component.html',
  styleUrls: ['./back-form-main.component.css']
})
export class BackFormMainComponent implements OnInit {

  constructor(public checkoutService: CheckoutService) { }

  ngOnInit(): void {
  }

  backForm() {
    localStorage.setItem('step', "1");
    this.checkoutService.selectedView.next('main');
  }

}
