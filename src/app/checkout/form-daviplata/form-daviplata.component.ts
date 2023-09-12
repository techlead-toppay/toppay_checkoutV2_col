import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FormPay, Transaction, Bank, ApiResponse } from 'src/app/types';
import { AlertService } from 'src/app/services/alert.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
	selector: 'app-form-daviplata',
	templateUrl: './form-daviplata.component.html',
	styleUrls: ['./form-daviplata.component.css']
})
export class FormDaviplataComponent implements OnInit, AfterViewInit {

	private formData!: FormPay;
	public token: string = '';
	public dataCheckout!: Transaction;
	public isLoading: boolean;
	public listBank: Array<Bank> = [];

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
		this.fillData();
	}

	async start() {

		this.dataCheckout = this.checkoutService.dataCheckout;

		this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
			this.dataCheckout = updateData;
			this.fillData();
		});

		this.dataCheckout = this.checkoutService.dataCheckout;

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
			usernumaccount: '0',
			usertypeaccount: '0'
		}

		this.isLoading = true;
		const pay = this.checkoutService.pay(this.formData);
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

			this.isLoading = false;

		});
		pay.catch(() => {
			alert('Ocurrio un error :(');
			this.isLoading = false;
		});
	}

}
