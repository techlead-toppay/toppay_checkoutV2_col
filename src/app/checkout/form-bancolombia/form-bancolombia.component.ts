import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Transaction, Bank, ApiResponse, FormPay } from 'src/app/types';
import { ApiService } from 'src/app/services/api.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-bancolombia',
  templateUrl: './form-bancolombia.component.html',
  styleUrls: ['./form-bancolombia.component.css']
})
export class FormBancolombiaComponent implements OnInit, AfterViewInit {

	private formData!: FormPay;
	public token: string = '';
	public dataCheckout!: Transaction;
	public isLoading: boolean;
	public listBank: Array<Bank> = [];

	constructor(
		private route: ActivatedRoute,
		private checkoutService: CheckoutService,
		private api: ApiService,
		private alertService: AlertService,
	) {
		this.isLoading = false;
		this.route.queryParams.subscribe(params => this.token = params['token']);
	}
	ngOnInit(): void {
		this.start();
	}
	ngAfterViewInit(): void {
		this.fillData();
	}

	async start() {

		this.dataCheckout = this.checkoutService.dataCheckout;

		this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
			this.dataCheckout = updateData;
			this.fillData();
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

	fillData() {
		document.querySelector<any>('#user_name').value = this.dataCheckout.user_name;
		document.querySelector<any>('#user_doc').value = this.dataCheckout.user_doc;
		document.querySelector<any>('#user_phone').value = this.dataCheckout.user_phone;
		document.querySelector<any>('#user_email').value = this.dataCheckout.user_email;
		document.querySelector<any>('#user_address').value = this.dataCheckout.user_address;
	}

	async onSubmit(form: NgForm) {

		if (this.isLoading) return;

		const {
			name, type_doc, numdoc, phone, email, address,
		} = form.value;

		if (name == '') {
			this.alertService.toastMessage('Digita un nombre válido');
			return;
		}

		if (numdoc == '') {
			this.alertService.toastMessage('Digita un documento válido');
			return;
		}

		if (type_doc == '' || type_doc == '0') {
			this.alertService.toastMessage('Selecciona un tipo de documento');
			return;
		}

		if (phone == '' || phone == '0') {
			this.alertService.toastMessage('Digita un telefono válido');
			return;
		}

		if (!parseInt(phone)) {
			this.alertService.toastMessage('El número de teléfono no es válido');
			return;
		}

		if (!parseInt(phone)) {
			this.alertService.toastMessage('El número de teléfono no es válido');
			return;
		}

		if (email == '') {
			this.alertService.toastMessage('Digita un correo válido');
			return;
		}

		if (address == '') {
			this.alertService.toastMessage('Digita una dirección válido');
			return;
		}

		this.formData = {
			id: this.dataCheckout.id,
			bank: '0',
			typeuser: '0',
			typedoc: type_doc,
			address, name, numdoc, phone, email,
			usernumaccount: '',
			usertypeaccount: ''
		}

		this.isLoading = true;
		const pay = this.checkoutService.pay(this.formData);
		pay.then(response => {

			const infoResponse = response as ApiResponse;
			if (infoResponse.success) {
				const url: any = infoResponse.data;
				window.location.href = url;
			} else {
				alert(infoResponse.message);
			}

			this.isLoading = false;

		});
		pay.catch(() => {
			alert('Ocurrio un error :(');
			this.isLoading = false;
		});
	}

}


