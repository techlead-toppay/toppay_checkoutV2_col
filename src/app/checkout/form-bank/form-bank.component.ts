import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { CheckoutService } from 'src/app/services/checkout.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ItemPayment, PaymentMethod } from 'src/app/types';

@Component({
  selector: 'app-form-bank',
  templateUrl: './form-bank.component.html',
  styleUrls: ['./form-bank.component.css'],
})
export class FormBankComponent implements OnInit {
  public paymentMethods!: Array<ItemPayment>;
  public merchantId: any;
  public typeTra: any;
  public m_id: any;
  public t_t: any;
  public efec: boolean = true;
  public token: string = '';
  public loading: boolean = false;

  constructor(
    public checkoutService: CheckoutService,
    public localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(
      (params) => (this.token = params['token'])
    );
  }

  ngOnInit(): void {
    this.m_id = this.localStorageService.get('M_id');
    this.t_t = this.localStorageService.get('T_t');
    this.start();
    //  esta validacion aplica para los merchantid 57 y 67
    // adicional se valida por el tipo de transaccion si es 1
    // muestra pago online y si es 3 muesta pago en efectivo
    if (this.m_id == 57) {
      this.typeTra = this.t_t;
      this.merchantId = this.m_id;
    } else if (this.m_id == 67) {
      this.merchantId = this.m_id;
      this.typeTra = this.t_t;
    } /* else if (this.m_id == 3) {
      this.merchantId = this.m_id;
      this.typeTra = this.t_t;
    } */ else if (this.m_id == 17) {
      this.merchantId = false;
      this.typeTra = false;
      this.efec = true;
    } else {
      this.merchantId = false;
      this.typeTra = false;
    }
  }

  async start() {
    this.checkoutService.paymentMethodsSubject.subscribe(
      (updateData) => (this.paymentMethods = updateData)
    );
    this.checkoutService.getPaymentMethods();
  }

  selectPaymentMethods(item: PaymentMethod) {
    const card = document.querySelector<any>(`#card-item-${item.id}`);
    card.classList.add('animate__animated');
    card.classList.add('animate__zoomOut');
    const formData = {
      id: this.checkoutService.dataCheckout.id,
      user_doc: this.checkoutService.dataCheckout.user_doc,
      bank: 0,
    };
    if (item.name == 'ACH-EFECTY') {
      this.loading = true;
      this.checkoutService.chageTypeTransaction(this.token, 3, 'TUP_EFECTY');
      setTimeout(() => {
        const pay = this.checkoutService.pay(formData);
        pay.then((response: any) => {
          console.log(response);
          if (response.success) {
            setTimeout(() => {
              window.location.href = response.data;
            }, 500);
          } else {
            alert('NO se completó la operación');
          }
        });
        pay.catch(() => {
          alert('Ocurrio un error :(');
        });
      }, 1000);
    } else {
      setTimeout(() => {
        this.checkoutService.selectedPaymentMethodSubject.next(item);
      }, 500);
    }
    console.log(item.name);
  }
}
