import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { CheckoutService } from 'src/app/services/checkout.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ItemPayment, PaymentMethod } from 'src/app/types';
import { ApiService } from './api.service';
import { AlertService } from '../../services/alert.service';
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
    private route: ActivatedRoute,
    private http: ApiService,
    private alertService: AlertService
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

  async selectPaymentMethods(item: PaymentMethod) {

    const card = document.querySelector<any>(`#card-item-${item.id}`);

    card.classList.add('animate__animated');
    // card.classList.add('animate__zoomOut');
    const formData = {
      id: this.checkoutService.dataCheckout.id,
      user_doc: this.checkoutService.dataCheckout.user_doc,
      bank: 0,
    };

    if (item.id == 8 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* PSE */
      this.loading = true;

      await this.http.viewCobre({ bank: "", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.loading = false;
          this.alertService.toastMessage("Datos incompletos")
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }
      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 11 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* DAVIPLATA */
      this.loading = true;

      await this.http.viewCobre({ bank: "1551", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.loading = false;
          this.alertService.toastMessage("Datos incompletos")
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }
      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 10 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* NEQUI */
      this.loading = true;

      await this.http.viewCobre({ bank: "1507", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.loading = false;
          this.alertService.toastMessage("Datos incompletos")
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }


      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 13 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* BANCOLOMBIA */
      this.loading = true;

      await this.http.viewCobre({ bank: "1007", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.loading = false;
          this.alertService.toastMessage("Datos incompletos")
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }

      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 14 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* DAVIVIENDA */
      this.loading = true;

      await this.http.viewCobre({ bank: "1051", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.loading = false;
          this.alertService.toastMessage("Datos incompletos")
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }

      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 15 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* AVVILLAS */
      this.loading = true;

      await this.http.viewCobre({ bank: "1052", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.loading = false;
          this.alertService.toastMessage("Datos incompletos")
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }

      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 16 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* BANCOBOGOTA */
      this.loading = true;

      await this.http.viewCobre({ bank: "1001", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.alertService.toastMessage("Datos incompletos")
          this.loading = false;
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }

      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 17 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* COLPATRIA */
      this.loading = true;

      await this.http.viewCobre({ bank: "1019", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.loading = false;
          this.alertService.toastMessage("Datos incompletos")
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }

      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    } else if (item.id == 18 && (this.m_id == 29 || this.m_id == 3 || this.m_id == 42 || this.m_id == 54 || this.m_id == 105 )) {
      /* OCCIDENTE */
      this.loading = true;

      await this.http.viewCobre({ bank: "1023", token: this.token }).subscribe((res: any) => {

        if (res.error) {
          this.alertService.toastMessage("Datos incompletos")
          this.loading = false;
        } else {
          setTimeout(() => {
            window.location.href = res.url;
          }, 500);
        }

      },
        (err: any) => {
          console.log(err);
          const { error } = err;
          const { message } = error;
          this.loading = false;
          this.alertService.toastMessage(message);
        });

    }
    // else if (item.name == 'ACH-EFECTY') {

    //   this.loading = true;
    //   this.checkoutService.chageTypeTransaction(this.token, 3, 'TUP_EFECTY');
    //   setTimeout(() => {
    //     const pay = this.checkoutService.pay(formData);
    //     pay.then((response: any) => {

    //       if (response.success) {
    //         setTimeout(() => {

    //           window.location.href = response.data;
    //         }, 500);
    //         setTimeout(() => {
    //           // card.classList.remove('animate__zoomOut');
    //           // card.classList.add('animate__zoomIn');
    //           this.loading = false;
    //         }, 1500);
    //       } else {
    //         this.loading = false;
    //         this.alertService.toastMessage('NO se completó la operación');
    //       }
    //     });
    //     pay.catch(() => {
    //       this.loading = false;
    //       this.alertService.toastMessage('Ocurrio un error :(');
    //     });
    //   }, 1000);
    // }
    else {
      setTimeout(() => {
        this.checkoutService.selectedPaymentMethodSubject.next(item);
      }, 500);
    }

  }
}
