import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from "primeng/api";
import { CheckoutService } from 'src/app/services/checkout.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ItemPayment, PaymentMethod } from 'src/app/types';


@Component({
	selector: 'app-form-bank',
	templateUrl: './form-bank.component.html',
	styleUrls: ['./form-bank.component.css']
})
export class FormBankComponent implements OnInit {

	public paymentMethods!: Array<ItemPayment>
	public merchantId: any;
	public typeTra: any;
	public m_id: any;
	public t_t: any;

	constructor(
		public checkoutService: CheckoutService,
		public localStorageService: LocalStorageService
	) { }

	ngOnInit(): void {
		this.m_id = this.localStorageService.get('M_id');
		this.t_t = this.localStorageService.get('T_t');
		this.start();
		//  esta validacion aplica para los merchantid 57 y 67 
		// adicional se valida por el tipo de transaccion si es 1 
		// muestra pago online y si es 3 muesta pago en efectivo
		if (this.m_id == 57) {
			this.typeTra = this.t_t
			this.merchantId = this.m_id
		} else if (this.m_id == 67) {
			this.merchantId = this.m_id
			this.typeTra = this.t_t

		} else if (this.m_id == 3) {
			this.merchantId = this.m_id
			this.typeTra = this.t_t

		} else {
			this.merchantId = false
			this.typeTra = false
		}
	}

	async start() {
		this.checkoutService.paymentMethodsSubject.subscribe(updateData => this.paymentMethods = updateData);
		this.checkoutService.getPaymentMethods();
	}

	selectPaymentMethods(item: PaymentMethod) {
		const card = document.querySelector<any>(`#card-item-${item.id}`);
		card.classList.add("animate__animated");
		card.classList.add("animate__zoomOut");
		setTimeout(() => {
			this.checkoutService.selectedPaymentMethodSubject.next(item);
		}, 500);
	}
}
