import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction, PaymentMethod } from 'src/app/types';
import { CheckoutService } from 'src/app/services/checkout.service';

import { FormBankComponent } from '../form-bank/form-bank.component';
import { FormPseComponent } from '../form-pse/form-pse.component';
import { FormCashoutComponent } from '../form-cashout/form-cashout.component';
import { FormEfectyComponent } from '../form-efecty/form-efecty.component';
import { FormEfectyNewComponent } from '../form-efecty-new/form-efecty.component';
import { FormLoadingComponent } from '../form-loading/form-loading.component';
import { FormNequiComponent } from '../form-nequi/form-nequi.component';
import { FormBancolombiaComponent } from '../form-bancolombia/form-bancolombia.component';
import { FormDaviplataComponent } from '../form-daviplata/form-daviplata.component';
import { FormYapeComponent } from '../form-yape/form-yape.component';
import { FormEfectivoComponent } from '../form-efectivo/form-efectivo.component';
import { FormNewComponent } from '../form-new/form-new.component';
import { LocalStorageService } from 'src/app/services/localstorage.service';

const Storage = localStorage;
@Component({
	selector: 'app-form-main',
	templateUrl: './form-main.component.html',
	styleUrls: ['./form-main.component.css']
})
export class FormMainComponent implements OnInit, AfterViewInit {

	public step: any = Storage.getItem('step');
	events1: any[] = [];
	public token: string = '';
	public dataCheckout: Transaction = {
		id: 0,
		reference: '',
		merchant_id: '',
		merchant_email: '',
		merchant_phone: '',
		merchant_logo: '',
		merchant_name: '',
		expiration: '',
		currency: '',
		amount: '',
		user_doc: '',
		user_type: '',
		user_name: '',
		user_email: '',
		user_phone: '',
		user_address: '',
		type_transaction: '',
		method: ''
	};
	public intervalID: any;

	constructor(
		public localStorageService: LocalStorageService,
		public checkoutService: CheckoutService,
		private route: ActivatedRoute
	) {
		this.route.queryParams.subscribe(params => this.token = params['token']);
	}

	@ViewChild('containerData', { read: ViewContainerRef }) view!: ViewContainerRef;

	ngOnInit(): void {
		this.start();
		this.events1 = [
			{
				status: "Ordered",
				name: "Metodo de pago",
				icon: "pi pi-dollar",
				classId: "metodoPago",
				bg: "1"
			},
			{
				status: "Processing",
				name: "Formulario",
				icon: "pi pi-file",
				classId: "formulario",
				bg: "2"
			},
			{
				status: "Shipped",
				name: "Comprobante",
				icon: "pi pi-check",
				classId: "comprobante",
				bg: "3"
			}
		];
		this.intervalID = setInterval(() => {
			this.step = Storage.getItem('step');
		}, 300);
	}

	async start() {
		this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
			this.localStorageService.set('M_id', updateData.merchant_id);
			this.localStorageService.set('T_t', updateData.type_transaction);
			this.dataCheckout = updateData;
			if (updateData.type_transaction == '2') {
				this.checkoutService.selectedView.next('CashOut');
			} else {
				if (updateData.method == 'TUP_PSE') {
					this.checkoutService.selectedView.next('ACH-PSE');
				} else if (updateData.method == 'TUP_NEQUI') {
					this.checkoutService.selectedView.next('NEQUI');
				} else if (updateData.method == 'TUP_DAVIPLATA') {
					this.checkoutService.selectedView.next('DAVIPLATA');
				} else if (updateData.method == 'TUP_BANCOLOMBIA') {
					this.checkoutService.selectedView.next('BANCOLOMBIA');
				} else if (updateData.method == 'TUP_EFECTY') {
					this.checkoutService.selectedView.next('ACH-EFECTY');
				} else if (updateData.method == 'TUP_YAPE') {
					this.checkoutService.selectedView.next('ACH-YAPE');
				} else if (updateData.method == 'TUP_EFECTIVO') {
					this.checkoutService.selectedView.next('EFECTIVO');
				} else {
					this.checkoutService.selectedView.next('main');
				}
			}
		});
		this.checkoutService.getDetailsTransaction(this.token);

		this.checkoutService.selectedPaymentMethodSubject.subscribe((item: PaymentMethod) => {
			this.checkoutService.selectedView.next(item.name);
		});

		this.checkoutService.selectedView.subscribe(view => {

			const card = document.querySelector<any>('#col-container');

			card.classList.add("animate__animated");
			card.classList.add("animate__fadeOut");

			setTimeout(() => {
				this.view.remove();
				switch (view) {
					case 'main':
						this.view.createComponent(FormBankComponent);
						break;

					case 'ACH-PSE':
						this.view.createComponent(FormNewComponent);
						localStorage.setItem('step', "2");
						localStorage.setItem('M_S', "TUP_PSE");
						this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_PSE');
						break;

					case 'NEQUI':
						this.view.createComponent(FormNewComponent);
						localStorage.setItem('step', "2");
						localStorage.setItem('M_S', "TUP_NEQUI");
						this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_NEQUI');
						break;

					case 'DAVIPLATA':
						this.view.createComponent(FormNewComponent);
						localStorage.setItem('M_S', "TUP_DAVIPLATA");
						localStorage.setItem('step', "2");
						this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_DAVIPLATA');
						break;

					case 'BANCOLOMBIA':
						this.view.createComponent(FormBancolombiaComponent);
						localStorage.setItem('step', "2");
						this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_BANCOLOMBIA');
						break;

					case 'ACH-EFECTY':
						this.checkoutService.chageTypeTransaction(this.token, 3, 'TUP_EFECTY');
						localStorage.setItem('step', "3");
						this.view.createComponent(FormEfectyComponent);
						break;

					case 'EFECTIVO':
						this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_EFECTIVO');
						localStorage.setItem('step', "3");
						this.view.createComponent(FormEfectivoComponent);
						break;

					case 'YAPE':
						this.view.createComponent(FormYapeComponent);
						this.checkoutService.chageTypeTransaction(this.token, 1, 'TUP_YAPE');
						break;

					case 'CashOut':
						this.view.createComponent(FormCashoutComponent);
						break;

					default:
						this.view.createComponent(FormBankComponent);
						break;
				}

				card.classList.remove("animate__animated");
				card.classList.remove("animate__fadeOut");
				card.classList.add("animate__animated");
				card.classList.add("animate__fadeIn");
			}, 500);
		});
	}

	ngAfterViewInit() {
		this.view.createComponent(FormLoadingComponent);
	}

}
