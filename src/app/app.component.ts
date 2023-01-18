import { Component } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class OrderHeader {

  public inv_reduction: number;
  public Customer_num: number;
  public dc_point_name: string;

  constructor(inv_reduction: number, Customer_num: number, dc_point_name: string) {
    this.inv_reduction = inv_reduction;
    this.Customer_num = Customer_num;
    this.dc_point_name = dc_point_name;
  }
}
class PalletStackingDetail {

  public Id: number = 1;
  public NumOfCraftes: number = 2;
  public Instruction: string = '3x5,6x31';

  constructor(Id: number, NumOfCraftes: number, Instruction: string) {
    this.Id = Id;
    this.NumOfCraftes = NumOfCraftes;
    this.Instruction = Instruction;
  }
}
class ItemCodeDetail {

  public QuidId: number;
  public ItemCode: number
  public NewDescription: string;
  public DetailWic: number;
  public CapColor: string;
  public Size: string;
  public ProductSize: string;
  public Description: string;

  constructor(QuidId: number, ItemCode: number, NewDescription: string, DetailWic: number, CapColor: string, Size: string, ProductSize: string, Description: string) {
    this.QuidId = QuidId;
    this.ItemCode = ItemCode;
    this.NewDescription = NewDescription;
    this.DetailWic = DetailWic;
    this.CapColor = CapColor;
    this.Size = Size;
    this.ProductSize = ProductSize;
    this.Description = Description;
  }
}

class Store {
  public barcodeImgAsBase64: string = '';
  public storeId: number = 829;
  public invoiceNO: number = 1137029;
  orderHeader: OrderHeader;
  palletStackingDetail: PalletStackingDetail;
  products: ItemCodeDetail[] = [];
  public totalQty: number = 75;

  constructor() {
    this.orderHeader = new OrderHeader(431, 838, "142016");
    this.palletStackingDetail = new PalletStackingDetail(5, 3, '3x5,6x31');
    this.products.push(new ItemCodeDetail(11, 343, 'Pure Gal', 343, '#s343', '35', '33', 'Description'));
    this.products.push(new ItemCodeDetail(12, 344, 'Pure Gal', 343, '#s343', '37', '34', 'Description'));
    this.products.push(new ItemCodeDetail(13, 344, 'Pure Gal', 343, '#s343', '38', '35', 'Description'));
    this.products.push(new ItemCodeDetail(14, 345, 'Pure Gal', 343, '#s343', '39', '36', 'Description'));
    this.products.push(new ItemCodeDetail(15, 346, 'Pure Gal', 343, '#s343', '40', '37', 'Description'));
    this.products.push(new ItemCodeDetail(16, 347, 'Pure Gal', 343, '#s343', '41', '38', 'Description'));
    this.products.push(new ItemCodeDetail(17, 348, 'Pure Gal', 343, '#s343', '42', '39', 'Description'));
    this.products.push(new ItemCodeDetail(18, 349, 'Pure Gal', 343, '#s343', '43', '40', 'Description'));
    this.products.push(new ItemCodeDetail(19, 350, 'Pure Gal', 343, '#s343', '44', '41', 'Description'));
    this.products.push(new ItemCodeDetail(18, 351, 'Pure Gal', 343, '#s343', '45', '42', 'Description'));
    this.products.push(new ItemCodeDetail(19, 352, 'Pure Gal', 343, '#s343', '46', '43', 'Description'));
    this.products.push(new ItemCodeDetail(20, 354, 'Pure Gal', 343, '#s343', '47', '44', 'Description'));
    this.products.push(new ItemCodeDetail(21, 355, 'Pure Gal', 343, '#s343', '48', '45', 'Description'));
    this.products.push(new ItemCodeDetail(22, 357, 'Pure Gal', 343, '#s343', '49', '46', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
    this.products.push(new ItemCodeDetail(23, 358, 'Pure Gal', 343, '#s343', '55', '47', 'Description'));
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public productList: ItemCodeDetail[] = []
  public store = new Store();
  public stores: Store[] = new Array<Store>();
  public barcodeImgAsBase64: string = '';
  public reportData: any[] = [];



  constructor() {
          //convert img into base64
    this.toDataURL('/assets/barcode.jpg').then((imagAsBase64: string) => {
      this.barcodeImgAsBase64 = imagAsBase64;
    });


    this.stores.push(new Store());
    this.stores.push(new Store());
    this.stores.push(new Store());
    this.stores.push(new Store());

  }
  loadData() {
    this.reportData = [];

    this.stores.forEach((store, index) => {
      if (index > 0) {
        //this line break the page, display the new store on new page,
        this.reportData.push({ text: '', pageOrientation: 'portrait', pageBreak: 'before' });
      }
      this.reportData.push({

        columns: [
          [
            {
              text: 'Store',
              bold: true
            },
            {
              text: `${store.orderHeader.Customer_num}`,
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
                    'Assignment #',
                    {
                      text: `${store.orderHeader.dc_point_name}`,
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
                    'Warehouse ',
                    {
                      text: `${store.orderHeader.inv_reduction}`,
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
      });

      this.reportData.push(

        {
          columns: [
            [
              {
                text: `Invoice# ${store.invoiceNO}`,
                bold: true
              },
              {
                columns: [
                  {
                    text: [
                      `Standard Pallets(Tixhi9x5):`,
                      {
                        text: ` ${store.palletStackingDetail.Id}`,
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
                      'Pallet IDs',
                      {
                        text: ` ${store.palletStackingDetail.Id}`,
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
                        text: ` ${store.totalQty}`,
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
                      'Custom Pallet Stacks',
                      {
                        text: ` ${store.palletStackingDetail.NumOfCraftes}`,
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
              [
                //Table Header
                { text: 'Qty', alignment: 'left' },
                { text: 'Description', }, { text: 'slot', style: 'fieldMargin' }, { text: 'Item', style: 'fieldMargin' }, { text: 'Count', }],

              //Table value from Array Object
              ...this.store.products.map(p => (
                [{ text: `${p.Size}`, style: 'fieldBold' },
                { text: `${p.Description}` },
                { text: `${p.ItemCode}`, style: 'fieldMargin' },
                { text: `${p.DetailWic}`, style: 'fieldMargin' },
                { text: `${p.ProductSize}`, alignment: 'center' }])),
            ]
          },

        }
      );

    });
  }

  generatePDF(action = 'open') {
    this.loadData();
    let docDefinition = {

      content: this.reportData,
      styles: {
        price: {
          bold: true,
          fontSize: 30,
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
          margin: [15, 0, 15, 0]
        },
        table: {
          margin: [0, 3, 0, 0]
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
