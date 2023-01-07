import { Component } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product {
  qty: number;
  description: string;
  slot: number;
  item: number;
  count: number;
  constructor(qty: number = 0, description: string = '', slot: number = 0, item: number = 0, count: number = 0) {
    this.qty = qty;
    this.description = description;
    this.slot = slot;
    this.item = item;
    this.count = count;
  }
}
class Invoice {
  customerName: string;
  address: string;
  contactNo: number;
  email: string;

  products: Product[] = [];
  additionalDetails: string;

  constructor(customerName: string = '', address: string = '', contactNo: number = 0, email: string = '', additionalDetails: string = '', products: Product[] = []) {
    // Initially one empty product row we will show
    this.customerName = customerName;
    this.address = address;
    this.contactNo = contactNo;
    this.additionalDetails = additionalDetails;
    this.email = email;
    this.products = products;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public productList: Product[] = []
  invoice = new Invoice('Shahid Islam', 'Lahore Pakistan', 34342432, 'shahid.islam@gmail.com', 'Additional detail given below', []);
  public barcodeImgAsBase64: string = '';
  public invoiceNO: number = 1137029;
  public storeValue: number = 829;
  public AssignmentNo: number = 142016;
  public whareNo: number = 4311;
  public standardPallet: string = 'Standard Pallets(Tixhi9x5)'
  public standardPalletValue: number = 1;
  public totalQty: number = 75;
  public customPallets: string = '3x5,6x3';
  public palletId: string = '5536405 5536412';

  private  CustomPalletStacks = `Custom Pallet Stacks:`;
  private  palletIDs = `Pallet IDs:`;
  private  warehouse = 'Warehouse: ';
  private  assignement = 'Assignment #';

  constructor() {
    this.invoice.products.push(new Product(5, 'puerle gal', 3422, 300, 2));
    this.invoice.products.push(new Product(15, 'Green gal', 23422, 140, 4));
    this.invoice.products.push(new Product(65, 'red gal', 43422, 130, 5));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));
    this.invoice.products.push(new Product(35, 'Pink gal', 34232, 300, 1));


    this.toDataURL('/assets/barcode.jpg').then((imagAsBase64: string) => {
      this.barcodeImgAsBase64 = imagAsBase64;
      console.log("x", imagAsBase64)
    })

  }


  generatePDF(action = 'open') {
    let docDefinition = {
      content: [

        {
          columns: [
            [
              {
                text: 'Store',
                bold: true
              },
              {
                text: `${this.storeValue}`,
                style: 'price'
              },
            ],
            [
              {
                text: 'Lane',
                alignment: 'left',
                bold: true,
              }
            ],
            [
              {
                image: `${this.barcodeImgAsBase64}`,
                width: 70,
                height: 25,
                alignment: 'left',
                style: 'barImg'
              },
              {
                columns: [
                  {
                    text: [
                      this.assignement,
                      {
                        text: `${this.AssignmentNo}`,
                        fontSize: 12,
                        bold: true,
                      },

                    ]
                  }

                ],
                alignment: 'left',
                style: 'Assignment'
              },
              {
                columns: [
                  {
                    text: [
                      this.warehouse,
                      {
                        text: `${this.whareNo}`,
                        fontSize: 12,
                        bold: true,
                      },

                    ],
                    alignment: 'left',
                    style: 'Warehouse'
                  }
                ]
                ,
              }

            ]
          ]
        },
        {
          columns: [
            [
              {
                text: `Invoice# ${this.invoiceNO}`,
                bold: true
              },
              {
                columns: [
                  {
                    text: [
                      `${this.standardPallet}:`,
                      {
                        text: ` ${this.standardPalletValue}`,
                        fontSize: 12,
                        bold: true,
                      },
                    ]
                  }
                ],
                alignment: 'left',
                style: 'topBottomMargin'
              },
              {
                columns: [
                  {
                    text: [
                      this.palletIDs,
                      {
                        text: ` ${this.palletId}`,
                        fontSize: 12,
                        bold: true,
                      },
                    ]
                  }

                ],
                alignment: 'left',
                style: 'topBottomMargin'
              },
            ],
            [
              {
                columns: [
                  {
                    text: [
                      `Total Qty:`,
                      {
                        text: ` ${this.totalQty}`,
                        fontSize: 12,
                        bold: true,
                      },
                    ]
                  }
                ],
                alignment: 'left',
                style: ''
              }, {
                columns: [
                  {
                    text: [
                      this.CustomPalletStacks,
                      {
                        text: ` ${this.customPallets}`,
                        fontSize: 12,
                        bold: true,
                      },
                    ]
                  }
                ],
                alignment: 'left',
                style: 'topBottomMargin'
              },
            ],
            [
              {
                columns: [
                  {
                    text: [
                      'Date:',
                      {
                        text: `\t${new Date().toLocaleDateString("en-US")}`,
                        fontSize: 12,
                        bold: true,
                      },
                    ]
                  }
                ],
                alignment: 'left',
                style: 'Assignment'
              }
            ]
          ]
        },

        {
          style: 'table',
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex > 0 && rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
            hLineWidth: function (i, node) {
              if (i === 0 || i === node.table.body.length) {
                return i == 1 ? 1 : 0;
              }
              return 1;
            },
            vLineWidth: function (i) {
              return 0;
            },
          },
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Qty',alignment:'left' }, { text: 'Description', }, { text: 'slot', style: 'fieldMargin' }, { text: 'Item', style: 'fieldMargin' }, { text: 'Count', }],
              ...this.invoice.products.map(p => (
                [{ text: `${p.qty}`, style: 'fieldBold' },
                { text: p.description },
                { text: `${p.slot}`, style: 'fieldMargin' },
                { text: p.item, style: 'fieldMargin' },
                { text: p.count, alignment: 'center' }])),
            ]
          }
        }
      ],
      styles: {
        price: {
          bold: true,
          fontSize: 25,
          margin: [28, -10, 0, 0]
        },
        barImg: {
          margin: [80, 0, 0, 0]
        },
        Assignment: {
          margin: [50, 0, 0, 0]
        },
        Warehouse: {
          margin: [50, 2, 0, 2]
        },
        topBottomMargin: {
          margin: [0, 3, 0, 3]
        },
        fieldBold: {
          fontSize: 12,
          bold: true,
        },
        fieldMargin: {
          margin: [15, 0, 15,0]
        },
        table:{
          margin: [0, 3, 0,0]
        }
      }
    };


    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }

  }

  addProduct() {
    this.invoice.products.push(new Product());
  }

  toDataURL = async (url) => {
    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    console.log("result", result)
    return result
  };
}
