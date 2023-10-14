import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import * as momentZone from 'moment-timezone';
import * as Crypto from 'crypto-js';
import { ApiResponse } from 'src/app/types';

@Component({
  selector: 'app-form-efecty',
  templateUrl: './form-efecty.component.html',
  styleUrls: ['./form-efecty.component.css'],
})
export class FormEfectyNewComponent implements OnInit {
  public infoEfecty: any;
  public llave: string = '9GkrVV0JO9Sualop';

  public vads: any = {
    vads_action_mode: 'INTERACTIVE',
    vads_amount: '',
    vads_ctx_mode: 'PRODUCTION',
    vads_currency: '170',
    vads_cust_country: 'CO',
    vads_cust_email: '',
    vads_cust_first_name: '',
    vads_cust_last_name: '',
    vads_cust_phone: '',
    vads_page_action: 'PAYMENT',
    vads_payment_cards: 'EFECTY',
    vads_payment_config: 'SINGLE',
    vads_site_id: '57845002',
    vads_trans_date: '',
    vads_trans_id: '362824',
    s_order_id: '',
    vads_version: 'V2',
    signature: '',
  };

  constructor(
    private checkoutService: CheckoutService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    //console.log(this.checkoutService.dataCheckout)
    this.infoEfecty = this.checkoutService.dataCheckout;
  }

  pagar() {
   
  }
}
