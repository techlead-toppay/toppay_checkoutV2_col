export type ApiResponse = {
   success: boolean;
   message: string;
   data: Array<any> | Object;
}

type Icon = {
   url: string,
	width: number;
}
export type PaymentMethod = {
   id: number,
   name: string,
   type: string,
   icons: Icon
}
export type ItemPayment = {
   name: string,
   list: Array<PaymentMethod>
}

export type Bank = {
   id: number,
   name: string,
   image: string
}

export type Transaction = {
   id: number;
   reference: string;
   merchant_id: string;
   merchant_email: string;
   merchant_phone: string;
   merchant_logo: string;
   merchant_name: string;
   expiration: string;
   currency: string;
   amount: string;
   user_doc: string;
   user_type: string;
   user_name: string;
   user_email: string;
   user_phone: string;
   user_address: string;
   type_transaction: string;
   method: string;
   ///
   status?: string;
   date?: string;
}

export type FormPay = {
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