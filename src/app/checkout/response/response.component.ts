import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from 'src/app/types';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
	selector: 'app-response',
	templateUrl: './response.component.html',
	styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

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
	}

}
