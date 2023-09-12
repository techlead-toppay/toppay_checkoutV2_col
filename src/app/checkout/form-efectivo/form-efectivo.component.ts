import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ApiResponse, Bank, FormPay, Transaction } from 'src/app/types';
declare const PDFObject: any;
@Component({
  selector: 'app-form-efectivo',
  templateUrl: './form-efectivo.component.html',
  styleUrls: ['./form-efectivo.component.css']
})
export class FormEfectivoComponent implements OnInit {

  private formData!: any;
  public token: string = '';
  public dataCheckout!: Transaction;
  public isLoading: boolean;
  public listBank: Array<Bank> = [];
  public dataView: any;
  public dataView2: any;
  public isLoadingDetails: boolean = true;
  public method: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService,
    private alertService: AlertService,
  ) {
    this.isLoading = false;
    this.route.queryParams.subscribe(params => this.token = params['token']);
  }

  ngOnInit(): void {
    this.start();
   
  }
  ngAfterViewInit(): void {
    // this.loadPdf();
    this.fillData();
  }

  async start() {
    this.dataCheckout = this.checkoutService.dataCheckout;
    this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
      this.dataCheckout = updateData;
      this.fillData();
    });
    this.dataCheckout = this.checkoutService.dataCheckout;
    this.formData = {
      id: this.dataCheckout.id,
      bank: '0',
      typeuser: '0',
      typedoc: this.dataCheckout.user_type,
      name: this.dataCheckout.user_name,
      numdoc: this.dataCheckout.user_doc,
      phone: this.dataCheckout.user_phone,
      email: this.dataCheckout.user_email,
      usernumaccount: '0',
      usertypeaccount: '0',
      address: 'c'
    }
    this.isLoading = true;
    setTimeout(() => {
      const pay = this.checkoutService.pay(this.formData);
      pay.then(response => {
        const infoResponse = response as ApiResponse;
        this.dataView = infoResponse.data
        if (infoResponse.success) {
          this.isLoading = false;

          if (this.dataView.statusCode != "03") {
            this.checkoutService.createPdf({ "reference": this.dataCheckout.reference, "urlPdf": this.dataView.data.url })
            this.loadPdf(this.dataView.data.url);
          } else {
            const response = this.checkoutService.searchPdf(this.dataCheckout.reference)
            response.then(response => {
              const temp = response as ApiResponse
              this.dataView2 = temp.data
              console.log(this.dataView2[0], "pdf")
              this.loadPdf(this.dataView2[0].url_pdf);

            })
            // this.alertService.toastMessage(infoResponse.message);
            this.isLoadingDetails = false
          }
        }
      });
      pay.catch(() => {
        alert('Ocurrio un error :(');
        this.isLoading = false;
        this.isLoadingDetails = false
      });
    }, 500)
  }
  loadPdf(url: string) {
    this.isLoadingDetails = false
    document.querySelector<any>('#pdfContainer').src = url;
  }

  fillData() {
    // document.querySelector<any>('#user_name').value = this.dataCheckout.user_name;
    // document.querySelector<any>('#user_doc').value = this.dataCheckout.user_doc;
    // document.querySelector<any>('#user_phone').value = this.dataCheckout.user_phone;
    // document.querySelector<any>('#user_email').value = this.dataCheckout.user_email;
    // document.querySelector<any>('#user_address').value = this.dataCheckout.user_address;
  }

}
