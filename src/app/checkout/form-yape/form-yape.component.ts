import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import * as moment from 'moment';
import * as momentZone from 'moment-timezone';
import * as Crypto from 'crypto-js'

@Component({
  selector: 'app-form-yape',
  templateUrl: './form-yape.component.html',
  styleUrls: ['./form-yape.component.css']
})
export class FormYapeComponent implements OnInit {

  public infoYape:any;
  public llave: string = '01jFOGo42J3rTSKY';

  public vads:any = {
    vads_action_mode:'INTERACTIVE',
    vads_amount:'',
    vads_ctx_mode:'PRODUCTION',
    vads_currency:'170',
    vads_cust_country:'CO',
    vads_cust_email:'',
    vads_cust_first_name:'',
    vads_cust_last_name:'',
    vads_cust_phone:'',
    vads_page_action:'PAYMENT',
    vads_payment_cards:'YAPE',
    vads_payment_config:'SINGLE',
    vads_site_id:'21385672',
    vads_trans_date:'',
    vads_trans_id:'362824',
    vads_order_id:'',
    vads_version:'V2',
    signature:''
  }

  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {

    //console.log(this.checkoutService.dataCheckout)
    this.infoYape = this.checkoutService.dataCheckout;
  }


  pagar(){

    let fecha = momentZone().tz("America/Bogota").add(5, 'hours').format('YMDDHHmmss');
  /*   let fecha = moment().add(5, 'hours').format('Y-M-DD HH:mm:ss'); */

    this.vads.vads_amount  = this.checkoutService.dataCheckout.amount+'00';
    this.vads.vads_cust_email  = this.checkoutService.dataCheckout.user_email;
    this.vads.vads_cust_first_name  = this.checkoutService.dataCheckout.user_name;
    this.vads.vads_cust_phone  = this.checkoutService.dataCheckout.user_phone;
    this.vads.vads_order_id  = this.checkoutService.dataCheckout.reference;
    this.vads.vads_trans_id = this.checkoutService.dataCheckout.reference.substr(-6);
    this.vads.vads_trans_date  = fecha;
    let siganture = `${this.vads.vads_action_mode}+${this.vads.vads_amount}+${this.vads.vads_ctx_mode}+${this.vads.vads_currency}+${this.vads.vads_cust_country}+${this.vads.vads_cust_email}+${this.vads.vads_cust_first_name}+${this.vads.vads_cust_last_name}+${this.vads.vads_cust_phone}+${this.vads.vads_order_id}+${this.vads.vads_page_action}+${this.vads.vads_payment_cards}+${this.vads.vads_payment_config}+${this.vads.vads_site_id}+${this.vads.vads_trans_date}+${this.vads.vads_trans_id}+${this.vads.vads_version}+${this.llave}`;
    this.vads.signature  = this.utf8_to_b64(siganture);

    let form = document.createElement('form');
    form.target = "_blank";
    form.action = 'https://secure.payty.com/vads-payment/';
    form.method = 'POST';

    form.innerHTML = `<input  type="hidden" name="signature" value="${this.vads.signature}">`;
    form.innerHTML += `<input  type="hidden" name="vads_action_mode" value="${this.vads.vads_action_mode}">`;
    form.innerHTML += `<input  type="hidden" name="vads_amount" value="${this.vads.vads_amount}">`;
    form.innerHTML += `<input  type="hidden" name="vads_ctx_mode" value="${this.vads.vads_ctx_mode}">`;
    form.innerHTML += `<input  type="hidden" name="vads_currency" value="${this.vads.vads_currency}">`;
    form.innerHTML += `<input  type="hidden" name="vads_cust_country" value="${this.vads.vads_cust_country}">`;
    form.innerHTML += `<input  type="hidden" name="vads_cust_email" value="${this.vads.vads_cust_email}">`;
    form.innerHTML += `<input  type="hidden" name="vads_cust_first_name" value="${this.vads.vads_cust_first_name}">`;
    form.innerHTML += `<input  type="hidden" name="vads_cust_last_name" value="${this.vads.vads_cust_last_name}">`;
    form.innerHTML += `<input  type="hidden" name="vads_cust_phone" value="${this.vads.vads_cust_phone}">`;
    form.innerHTML += `<input  type="hidden" name="vads_order_id" value="${this.vads.vads_order_id}">`;
    form.innerHTML += `<input  type="hidden" name="vads_page_action" value="${this.vads.vads_page_action}">`;
    form.innerHTML += `<input  type="hidden" name="vads_payment_cards" value="${this.vads.vads_payment_cards}">`;
    form.innerHTML += `<input  type="hidden" name="vads_payment_config" value="${this.vads.vads_payment_config}">`;
    form.innerHTML += `<input  type="hidden" name="vads_site_id" value="${this.vads.vads_site_id}">`;
    form.innerHTML += `<input  type="hidden" name="vads_trans_date" value="${this.vads.vads_trans_date}">`;
    form.innerHTML += `<input  type="hidden" name="vads_trans_id" value="${this.vads.vads_trans_id}">`;
    form.innerHTML += `<input  type="hidden" name="vads_version" value="${this.vads.vads_version}">`;

    document.body.append(form);
 /*  console.log(form) */
    form.submit();
  }

   utf8_to_b64( str:any ) {
   
    let hsh = Crypto.HmacSHA256(str,this.llave);
    let base = Crypto.enc.Base64.stringify(hsh);
    return base
  }
}
