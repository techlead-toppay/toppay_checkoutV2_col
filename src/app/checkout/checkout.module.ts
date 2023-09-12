import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';

import { FormBankComponent } from './form-bank/form-bank.component';
import { CheckoutComponent } from './checkout.component';
import { FormPayComponent } from './form-pay/form-pay.component';
import { FormPseComponent } from './form-pse/form-pse.component';
///
import { LoadingMainComponent } from './components/loading-main/loading-main.component';
import { LoadingComponentComponent } from './components/loading-component/loading-component.component';
import { BackFormMainComponent } from './components/back-form-main/back-form-main.component';
import { ResponseComponent } from './response/response.component';
import { FormMainComponent } from './form-main/form-main.component';
import { FormCashoutComponent } from './form-cashout/form-cashout.component';
import { FormEfectyComponent } from './form-efecty/form-efecty.component';
import { FormLoadingComponent } from './form-loading/form-loading.component';
import { FormNequiComponent } from './form-nequi/form-nequi.component';
import { InfoNequiComponent } from './info-nequi/info-nequi.component';
import { FormBancolombiaComponent } from './form-bancolombia/form-bancolombia.component';
import { CompletionTransactionComponent } from './completion-transaction/completion-transaction.component';
import { FormDaviplataComponent } from './form-daviplata/form-daviplata.component';
import { InfoDaviplataComponent } from './info-daviplata/info-daviplata.component';
import { FormYapeComponent } from './form-yape/form-yape.component';
import { TimelineModule } from 'primeng/timeline';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormNewComponent } from './form-new/form-new.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    FormMainComponent,
    FormBankComponent,
    FormPayComponent,
    FormPseComponent,
    FormNewComponent,
    ResponseComponent,
    ///
    LoadingComponentComponent,
    LoadingMainComponent,
    BackFormMainComponent,
    FormCashoutComponent,
    FormEfectyComponent,
    FormLoadingComponent,
    FormNequiComponent,
    InfoNequiComponent,
    FormBancolombiaComponent,
    CompletionTransactionComponent,
    FormDaviplataComponent,
    InfoDaviplataComponent,
    FormYapeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CheckoutRoutingModule,
    TimelineModule,
    SpeedDialModule,
  ]
})
export class CheckoutModule { }
