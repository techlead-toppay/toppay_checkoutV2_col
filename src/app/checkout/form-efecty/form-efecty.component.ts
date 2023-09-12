import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';

import * as JsBarcode from 'jsbarcode';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-form-efecty',
  templateUrl: './form-efecty.component.html',
  styleUrls: ['./form-efecty.component.css']
})
export class FormEfectyComponent implements OnInit {

  public infoEfecty: any;

  constructor(
    private checkoutService: CheckoutService,
  ) { }

  ngOnInit(): void {

    //console.log(this.checkoutService.dataCheckout)
    this.infoEfecty = this.checkoutService.dataCheckout;


    this.codigobarra(this.infoEfecty.reference);
  }

  codigobarra(cod: any) {
    JsBarcode("#barcode", cod, {
      lineColor: "#000000",
      background: "transparent",
      displayValue: false
    });
  }

  imprimir() {
    const doc = new jsPDF('l', 'pt');
    let pdfjs: any = document.querySelector('#formularioEfecty');
    doc.html(pdfjs, {
      callback: function (doc) {
        doc.save("efecty.pdf");
      }
    });
  }

}
