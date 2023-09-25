import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { PaymentMethod, ItemPayment, Transaction } from '../types';
import { ApiService } from './api.service';

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
  constructor(private router: Router, private apiService: ApiService) {}

  async getPaymentMethods() {
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
              url: 'nequi2.png',
              width: 80,
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
          },
          {
            id: 103,
            name: 'EFECTIVO',
            type: 'LINK',
            icons: {
              url: 'bancolombia.png',
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
        ],
      },
    ];
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
              url: 'bancolombia.png',
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
