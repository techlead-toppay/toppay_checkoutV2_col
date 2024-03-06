import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { PaymentMethod, ItemPayment, Transaction } from '../types';
import { ApiService } from './api.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  public isLoadingDetails: boolean = true;
  public isLoadingPaymentMethods: boolean = true;
  public dataCheckout!: Transaction;
  public idPaymentMethod: Array<number> = [3, 7, 8, 10];
  public paymentMethods: Array<PaymentMethod> = [];
  public selectedPaymentMethod!: PaymentMethod;

  public dataCheckoutSubject = new Subject<Transaction>();
  public paymentMethodsSubject = new Subject<Array<ItemPayment>>();
  public selectedPaymentMethodSubject = new Subject<PaymentMethod>();
  public selectedView = new Subject<string>();
  public infoprueba!: Transaction;

  constructor(private router: Router, private apiService: ApiService,public localStorageService: LocalStorageService,) {}

  /* ***********************ESTE LO ESTA UTILIZANDO COBRE******************** */
  async getPaymentMethods() {
    let m_id = this.localStorageService.get('M_id');
    
    const paymentMethods: Array<ItemPayment> = [
      {
        name: 'Pago online',
        list: [
          {
            id: 8,
            name: 'ACH-PSE',
            type: 'LINK',
            icons: {
              url: 'pse.png',
              width: 140,
            },
          },
          {
            id: 10,
            name: 'NEQUI',
            type: 'LINK',
            icons: {
              url: 'nequi.svg',
              width: 150,
            },
          },
          {
            id: 11,
            name: 'DAVIPLATA',
            type: 'LINK',
            icons: {
              url: 'daviplata.png',
              width: 140,
            },
          },
          {
            id: 13,
            name: 'BANCOLOMBIA',
            type: 'LINK',
            icons: {
              url: 'bancolombia.svg',
              width: 220,
            },
          },
          {
            id: 14,
            name: 'DAVIVIENDA',
            type: 'LINK',
            icons: {
              url: 'davivienda.png',
              width: 220,
            },
          },
          {
            id: 15,
            name: 'AVVILLAS',
            type: 'LINK',
            icons: {
              url: 'avvillas.svg',
              width: 220,
            },
          },
          {
            id: 16,
            name: 'BANCOBOGOTA',
            type: 'LINK',
            icons: {
              url: 'bancobogota.svg',
              width: 220,
            },
          },
          {
            id: 17,
            name: 'COLPATRIA',
            type: 'LINK',
            icons: {
              url: 'colpatria.svg',
              width: 220,
            },
          },
          {
            id: 18,
            name: 'OCCIDENTE',
            type: 'LINK',
            icons: {
              url: 'occidente.svg',
              width: 220,
            },
          },
        ],
      },
      {
        name: 'Pago efectivo',
        list: [
          {
            id: 12,
            name: 'ACH-EFECTY',
            type: 'LINK',
            icons: {
              url: 'efecty.png',
              width: 140,
            },
          }
        ],
      },
    ];

    if(!(m_id != '42' && m_id != '99' && m_id != '7' && m_id != '95' && m_id != '105' && m_id != '102'  && m_id != '34')){
      let arrIds = [13,14,15,16,17,18];
  
      arrIds.forEach((e:any) => {
            paymentMethods[0].list = paymentMethods[0].list.filter(objeto => objeto.id !== e);
      });
    }

    this.paymentMethodsSubject.next(paymentMethods);
  }

  async getListBank() {
    const paymentMethods: Array<ItemPayment> = [
      {
        name: 'Pago online',
        list: [
          {
            id: 7,
            name: 'Botón de Pago Bancolombia',
            type: 'LINK',
            icons: {
              url: 'bancolombia.svg',
              width: 150,
            },
          },
          {
            id: 8,
            name: 'ACH-PSE',
            type: 'LINK',
            icons: {
              url: 'pse.png',
              width: 150,
            },
          },
          {
            id: 10,
            name: 'Botón de Pago Nequi',
            type: 'LINK',
            icons: {
              url: 'nequi.png',
              width: 150,
            },
          },
          {
            id: 11,
            name: 'Botón de Pago Daviplata',
            type: 'LINK',
            icons: {
              url: 'daviplata.png',
              width: 150,
            },
          },
          {
            id: 13,
            name: 'Botón de Pago Yape',
            type: 'LINK',
            icons: {
              url: 'yape.png',
              width: 150,
            },
          },
        ],
      },
      {
        name: 'Pago efectivo',
        list: [
          {
            id: 12,
            name: 'ACH-EFECTY',
            type: 'LINK',
            icons: {
              url: 'efecty.png',
              width: 150,
            },
          },
          {
            id: 103,
            name: 'EFECTIVO',
            type: 'LINK',
            icons: {
              url: 'efectivo.png',
              width: 150,
            },
          },
        ],
      },
    ];
    this.paymentMethodsSubject.next(paymentMethods);
  }

  async getDetailsTransaction(token: string) {
    this.isLoadingDetails = true;
    this.apiService
      .request('services/details-transaction', { token })
      .subscribe(
        (response) => {
          if (response.success) {
            const infoUpdate = response.data as Transaction;
            this.infoprueba = response.data as Transaction;
            this.dataCheckout = infoUpdate as Transaction;
            this.dataCheckoutSubject.next(infoUpdate);
          } else {
            alert(response.message);
          }
          this.isLoadingDetails = false;
        },
        ({ error }: any) => {
          console.log('Error al conseguir info del pago', error);
          this.isLoadingDetails = false;
          this.router.navigateByUrl('/error-page');
        }
      );
  }

  async chageTypeTransaction(token: string, type: number, method: string) {
    this.apiService
      .request('services/typetrans', { token, type, method })
      .subscribe(
        (response) => {},
        ({ error }: any) => {
          console.log('Error al actualizar', error);
        }
      );
  }

  async pay(data: any) {
    console.log(data, '<-- data');
    return new Promise((resolve, reject) => {
      this.apiService.request('services/pay', data).subscribe(
        (response) => {
          resolve(response);
        },
        ({ error }: any) => {
          console.log('Error al pagar', error);
          reject(error);
        }
      );
    });
  }

  async createPdf(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService.requestNode('toppay/create', { ...data }).subscribe(
        (response) => {
          resolve(response);
        },
        ({ error }: any) => {
          console.log('Error al pagar', error);
          reject(error);
        }
      );
    });
  }
  async searchPdf(data: string) {
    return new Promise((resolve, reject) => {
      this.apiService
        .methodGetNode('toppay/search?reference=' + data)
        .subscribe(
          (response) => {
            resolve(response);
          },
          ({ error }: any) => {
            console.log('Error al pagar', error);
            reject(error);
          }
        );
    });
  }
}

/* 
PAGOS EN EFECTIVO
,
          {
            id: 103,
            name: 'EFECTIVO',
            type: 'LINK',
            icons: {
              url: 'bancolombia.svg',
              width: 220,
            },
          },
          {
            id: 104,
            name: 'EFECTIVO',
            type: 'LINK',
            icons: {
              url: 'bancobogota.png',
              width: 220,
            },
          },
          {
            id: 105,
            name: 'EFECTIVO',
            type: 'LINK',
            icons: {
              url: 'apostar.png',
              width: 140,
            },
          },
          {
            id: 106,
            name: 'EFECTIVO',
            type: 'LINK',
            icons: {
              url: 'davivienda.png',
              width: 220,
            },
          },
          {
            id: 107,
            name: 'EFECTIVO',
            type: 'LINK',
            icons: {
              url: 'susuerte.png',
              width: 160,
            },
          },
*/
