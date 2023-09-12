import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from 'src/app/types';
import { ApiService } from 'src/app/services/api.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
	selector: 'app-info-daviplata',
	templateUrl: './info-daviplata.component.html',
	styleUrls: ['./info-daviplata.component.css']
})
export class InfoDaviplataComponent implements OnInit {

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
		status: '',
		date: '',
		type_transaction: '',
		method: ''
	};

	constructor(
		private apiService: ApiService,
		public checkoutService: CheckoutService,
		private route: ActivatedRoute
	) {
		this.route.queryParams.subscribe(params => this.token = params['token']);
	}

	ngOnInit(): void {
		this.start();
	}

	async start() {
		this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
			this.dataCheckout = updateData
		});
		this.checkoutService.getDetailsTransaction(this.token);

		setInterval(() => {
			this.getStatusTransaction();
		}, 15000);
	}

	getStatusTransaction() {
		this.apiService.request('services/details-transaction', { token: this.token }).subscribe((response) => {

			if (response.success) {
				const infoUpdate = response.data as Transaction;
				this.dataCheckout = infoUpdate as Transaction;
			}

		}, ({ error }: any) => {
			console.log('Error al conseguir info del pago', error);
		});
	}

}
