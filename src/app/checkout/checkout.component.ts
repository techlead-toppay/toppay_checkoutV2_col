import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from '../types/index';
import { CheckoutService } from '../services/checkout.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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
	public items: any;
	constructor(
		public checkoutService: CheckoutService,
		private route: ActivatedRoute
	) {
		this.route.queryParams.subscribe(params => this.token = params['token']);
	}

	ngOnInit(): void {
		this.items = [];
		this.start();
		localStorage.setItem('step', "1");
	}

	async start() {
		this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
			this.dataCheckout = updateData;
		});
	}

}
