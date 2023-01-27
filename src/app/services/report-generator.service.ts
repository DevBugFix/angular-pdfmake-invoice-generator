import { Injectable } from '@angular/core';
import { Store } from '../app.component';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class ReportGeneratorService {

  private pdfStoreList: any[] = [];
  public barcodeImgAsBase64: string = '';
  constructor() {
    this.toDataURL('/assets/barcode.jpg').then((imagAsBase64: string) => {
      this.barcodeImgAsBase64 = imagAsBase64;
    });
  }

  GeneratePdf(storeList: Store[]) {
    this.pdfStoreList = [];

    storeList.forEach((store, index) => {
      if (index > 0) {
        //this line break the page, display the new store on new page,
        this.pdfStoreList.push({ text: '', pageOrientation: 'portrait', pageBreak: 'before' });
      }
      this.pdfStoreList.push({

        columns: [
          [
            {
              text: 'Store',
              bold: true
            },
            {
              text: `${store.storeId}`,
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

      this.pdfStoreList.push(

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
              ...store.products.map(p => (
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


    let docDefinition = {

      content: this.pdfStoreList,
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

    pdfMake.createPdf(docDefinition).download();

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
    return result
  };

}
