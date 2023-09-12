import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Transaction } from 'src/app/types';

@Component({
	selector: 'form-pay',
	templateUrl: './form-pay.component.html',
	styleUrls: ['./form-pay.component.css']
})
export class FormPayComponent implements OnInit {

	private formData: any;
	public dataCheckout!: Transaction;
	public isLoading: boolean;

	constructor(
		private checkoutService: CheckoutService,
	) {
		this.isLoading = false;
	}

	ngOnInit(): void {
		this.start();
	}

	async start() {
		this.checkoutService.dataCheckoutSubject.subscribe((updateData: Transaction) => {
			this.dataCheckout = updateData
			document.querySelector<any>('#user_name').value = this.dataCheckout.user_name;
			document.querySelector<any>('#user_doc').value = this.dataCheckout.user_doc;
			document.querySelector<any>('#user_phone').value = this.dataCheckout.user_phone;
			document.querySelector<any>('#user_email').value = this.dataCheckout.user_email;
			document.querySelector<any>('#user_address').value = this.dataCheckout.user_address;
		});
	}

	async onSubmit(form: NgForm) {

		if (this.isLoading) return;
		
		const {
			name, type_doc, numdoc, phone, email, address, type_client, bank
		} = form.value;

		// if (name == '') {
		// 	return;
		// }

		this.formData = {
			id: this.dataCheckout.id,
			bank,
			typeuser: type_client,
		}
		this.checkoutService.pay(this.formData);

	}

}
