import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Transaction, Bank, ApiResponse } from 'src/app/types';
import { CheckoutService } from 'src/app/services/checkout.service';

type FormCashOut = {
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

@Component({
	selector: 'app-form-cashout',
	templateUrl: './form-cashout.component.html',
	styleUrls: ['./form-cashout.component.css']
})
export class FormCashoutComponent implements OnInit, AfterViewInit {

	private formData!: FormCashOut;
	public token: string = '';
	public dataCheckout!: Transaction;
	public isLoading: boolean;
	public listBank: Array<Bank> = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private checkoutService: CheckoutService,
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
		// this.api.request('services/list-banks', {}).subscribe((response) => {
		// 	if (response.success) {
		// 		const listBank = response.data;
		// 		this.listBank = listBank as Array<Bank>;
		// 	} else {
		// 		alert(response.message);
		// 	}
		// }, ({ error }: any) => {
		// 	console.log('Error al conseguir la lista de los bancos', error);
		// });
		const listBank: Array<Bank> = [
			{
				id: 1,
				name: 'Banco de pruebas 1',
				image: ''
			},
			{
				id: 2,
				name: 'Banco de pruebas 2',
				image: ''
			},
			{
				id: 3,
				name: 'Banco de pruebas 3',
				image: ''
			},
		];
		this.listBank = listBank;
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
			bank, numaccount, typeaccount
		} = form.value;

		// if (name == '') {
		// 	return;
		// }

		this.formData = {
			id: this.dataCheckout.id,
			bank,
			typedoc: type_doc,
			address, name, numdoc, phone, email,
			typeuser: '',
			usernumaccount: numaccount ,
			usertypeaccount: typeaccount
		}

		this.isLoading = true;
		const pay = this.checkoutService.pay(this.formData);
		pay.then(response => {
			const data = response as ApiResponse;
			if (data.success) {
				this.router.navigateByUrl(`/checkout/app/response?token=${this.token}`);
			} else {
				alert();
			}

			this.isLoading = false;

		});
		pay.catch(() => {
			alert('Ocurrio un error :(');
			this.isLoading = false;
		});
	}

}
