import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CheckoutComponent } from './checkout.component';
import { FormMainComponent } from './form-main/form-main.component';
import { ResponseComponent } from './response/response.component';
import { InfoNequiComponent } from './info-nequi/info-nequi.component';
import { InfoDaviplataComponent } from './info-daviplata/info-daviplata.component';
import { FormYapeComponent } from './form-yape/form-yape.component';

const routes: Routes = [
	{
		path: 'app',
		component: CheckoutComponent,
		children: [
			{
				path: 'main',
				component: FormMainComponent
			},
			{
				path: 'response',
				component: ResponseComponent
			},
			{
				path: 'nequi',
				component: InfoNequiComponent
			},
			{
				path: 'daviplata',
				component: InfoDaviplataComponent
			},
			{
				path: 'yape',
				component: FormYapeComponent
			}
		]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'app/main',
	}
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class CheckoutRoutingModule { }
