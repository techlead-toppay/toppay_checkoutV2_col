import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

import { CheckoutService } from 'src/app/services/checkout.service';
import { ApiResponse, Bank, Transaction } from 'src/app/types';

type FormPayPse = {
	id: number,
	name: string,
	typedoc: string,
	numdoc: string,
	phone: string,
	email: string,
	address: string,
	bank: string,
	typeuser: string,
	usertypeaccount: string,
	usernumaccount: string,
}
const Storage = localStorage;
@Component({
	selector: 'form-new',
	templateUrl: './form-new.component.html',
	styleUrls: ['./form-new.component.css']
})
export class FormNewComponent implements OnInit, AfterViewInit {

	private formData!: FormPayPse;
	public token: string = '';
	public dataCheckout!: Transaction;
	public isLoading: boolean;
	public listBank: Array<Bank> = [];
	public name: string = '';
	public cel: any;
	public typeDoc: string = 'CC';
	public numberDoc: string = '';
	public email: string = '';
	public address: string = '';
	public method: any;
	public typeClient: string = 'PERSONA';
	public bank: string = '0';


	constructor(
		private route: ActivatedRoute,
		private checkoutService: CheckoutService,
		private api: ApiService,
		private alertService: AlertService,
		private router: Router,
	) {
		this.isLoading = false;
		this.route.queryParams.subscribe(params => this.token = params['token']);

	}
	ngOnInit(): void {
		this.inicial();
		this.start();
		this.method = localStorage.getItem('M_S')
	}
	ngAfterViewInit(): void {
	}

	async start() {
		this.dataCheckout = this.checkoutService.dataCheckout;
		this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
			this.dataCheckout = updateData;
		});
		this.dataCheckout = this.checkoutService.dataCheckout;
		this.api.request('services/viewBank', {}).subscribe((response) => {
			if (response.success) {
				const listBank = response.data;
				this.listBank = listBank as Array<Bank>;
			} else {
				alert(response.message);
			}

		}, ({ error }: any) => {
			console.log('Error al conseguir la lista de los bancos', error);
		});
	}
	async onSubmit(/* form: NgForm */) {

		if (this.isLoading) return;
		if (this.name == '') {
			this.alertService.toastMessage('Digita un nombre válido');
			return;
		}

		if (this.numberDoc == '') {
			this.alertService.toastMessage('Digita un documento válido');
			return;
		}

		if (this.typeDoc == '' || this.typeDoc == '0') {
			this.alertService.toastMessage('Selecciona un tipo de documento');
			return;
		}

		if (this.cel == '' || this.cel == '0') {
			this.alertService.toastMessage('Digita un telefono válido');
			return;
		}

		if (!parseInt(this.cel)) {
			this.alertService.toastMessage('El número de teléfono no es válido');
			return;
		}

		if (this.email == '') {
			this.alertService.toastMessage('Digita un correo válido');
			return;
		}

		if (this.address == '') {
			this.alertService.toastMessage('Digita una dirección válido');
			return;
		}

		if (this.typeClient == '' || this.typeClient == '0' && this.method == 'TUP_PSE') {
			this.alertService.toastMessage('Selecciona el tipo de cliente');
			return;
		}

		if (this.bank == '' || this.bank == '0' && this.method == 'TUP_PSE') {
			this.alertService.toastMessage('Selecciona un banco');
			return;
		}

		this.formData = {
			id: this.dataCheckout.id,
			bank: this.bank,
			typeuser: this.typeDoc,
			typedoc: this.typeDoc,
			address: this.address,
			name: this.name,
			numdoc: this.numberDoc,
			phone: this.cel,
			email: this.email,
			usernumaccount: '',
			usertypeaccount: ''
		}


		this.isLoading = true;
		const pay = this.checkoutService.pay(this.formData);
		pay.then(response => {

			const infoResponse = response as ApiResponse;
			if (infoResponse.data == 'NEQUI') {
				this.router.navigateByUrl(`/checkout/app/nequi?token=${this.token}`, { replaceUrl: true });
			}
			else if (infoResponse.data == 'DAVIPLATA') {
				this.router.navigateByUrl(`/checkout/app/daviplata?token=${this.token}`, { replaceUrl: true });
			} else {
				const url: any = infoResponse.data;
				window.location.href = url;
			}

			this.isLoading = false;

		});
		pay.catch(() => {
			alert('Ocurrio un error :(');
			this.isLoading = false;
		});
	}
	inicial() {
		this.name = this.checkoutService.infoprueba.user_name;
		this.cel = this.checkoutService.infoprueba.user_phone;
		this.numberDoc = this.checkoutService.infoprueba.user_doc;
		this.email = this.checkoutService.infoprueba.user_email;
		this.address = this.checkoutService.infoprueba.user_address;
	}

}
