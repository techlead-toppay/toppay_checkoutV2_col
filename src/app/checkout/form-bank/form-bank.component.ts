import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ApiResponse, ItemPayment, PaymentMethod, Transaction } from 'src/app/types';

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
    private router: Router,
    private alertService: AlertService,
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
    const formData2 = {
      id: this.checkoutService.dataCheckout.id,
      bank: '0',
      typeuser: '0',
      typedoc:this.checkoutService.dataCheckout.user_type,
      address:this.checkoutService.dataCheckout.user_address,
      name:this.checkoutService.dataCheckout.user_name,
      numdoc:this.checkoutService.dataCheckout.user_doc,
      phone:this.checkoutService.dataCheckout.user_phone,
      email:this.checkoutService.dataCheckout.user_email,
      usernumaccount: '0',
      usertypeaccount: '0'

    };

    const formData3 = {
      id: this.checkoutService.dataCheckout.id,
      typedoc:this.checkoutService.dataCheckout.user_type,
      address:this.checkoutService.dataCheckout.user_address,
      name:this.checkoutService.dataCheckout.user_name,
      numdoc:this.checkoutService.dataCheckout.user_doc,
      phone:this.checkoutService.dataCheckout.user_phone,
      email:this.checkoutService.dataCheckout.user_email,
      typeuser:this.checkoutService.dataCheckout.user_type,
      usernumaccount:"",
      usertypeaccount:"",
      bank:"0"

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
            setTimeout(() => {
              card.classList.remove('animate__zoomOut');
              card.classList.add('animate__zoomIn');
              this.loading = false;
            }, 1500);
          } else {
            this.loading = false;
            alert('NO se completó la operación');
          }
        });
        pay.catch(() => {
          this.loading = false;
          alert('Ocurrio un error :(');
        });
      }, 1000); 

    } else if(item.name=='ACH-PSE'  &&  this.checkoutService.dataCheckout.merchant_id=='3'){
      this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_PSE');
       this.loading = true; 
       setTimeout(() => {
        const pay = this.checkoutService.pay(formData2);
        pay.then((response: any) => {
          console.log(response);
          if (response.success) {
            setTimeout(() => {
              
              window.location.href = response.data;
            }, 500);
            setTimeout(() => {
              card.classList.remove('animate__zoomOut');
              card.classList.add('animate__zoomIn');
              this.loading = false;
            }, 1500);
          } else {
            this.loading = false;
            alert('NO se completó la operación');
          }
        });
        pay.catch(() => {
          this.loading = false;
          alert('Ocurrio un error :(');
        });
      }, 1000); 



    }  else if(item.name=='NEQUI' && this.checkoutService.dataCheckout.merchant_id== '3'){


      this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_NEQUI');
      this.loading = true;

      setTimeout(() => {   
        const pay = this.checkoutService.pay(formData3);
        pay.then(response => {

          const infoResponse = response as ApiResponse;
          console.log(infoResponse)
          if (infoResponse.success) {
            if (infoResponse.data == 'NEQUI') {
          this.router.navigateByUrl(`/checkout/app/nequi?token=${this.token}`, { replaceUrl: true }); 

            } else {
              const url: any = infoResponse.data;
              window.location.href = url;
            }
          } else {
            this.alertService.toastMessage(infoResponse.message);
          }
    
          this.loading = false;
    
        });
        pay.catch(() => {
          alert('Ocurrio un error :(');
          this.loading = false;
        });

         }, 1000); 
	



    } else if(item.name=='DAVIPLATA' && this.checkoutService.dataCheckout.merchant_id=='3'){
      this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_DAVIPLATA');
      this.loading = true;
    



      setTimeout(() => {     

        const pay = this.checkoutService.pay(formData3);
        pay.then(response => {
    
          const infoResponse = response as ApiResponse;
          if (infoResponse.success) {
            if (infoResponse.data == 'DAVIPLATA') {
              this.router.navigateByUrl(`/checkout/app/daviplata?token=${this.token}`, { replaceUrl: true });
            } else {
              const url: any = infoResponse.data;
              window.location.href = url;
            }
          } else {
            this.alertService.toastMessage(infoResponse.message);
          }
    
          this.loading = false;
    
        });
        pay.catch(() => {
          alert('Ocurrio un error :(');
          this.loading = false;
        });

        }, 1000); 
    
    
     



    }else {
      setTimeout(() => {
        this.checkoutService.selectedPaymentMethodSubject.next(item);
      }, 500);
    }
    console.log(item.name);
  }
}
