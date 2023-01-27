import { Component } from '@angular/core';
import { ReportGeneratorService } from './services/report-generator.service';



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
export class PalletStackingDetail {

  public Id: number = 1;
  public NumOfCraftes: number = 2;
  public Instruction: string = '3x5,6x31';

  constructor(Id: number, NumOfCraftes: number, Instruction: string) {
    this.Id = Id;
    this.NumOfCraftes = NumOfCraftes;
    this.Instruction = Instruction;
  }
}
export class ItemCodeDetail {

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

export class Store {
  public barcodeImgAsBase64: string = '';
  public storeId: number = 829;
  public invoiceNO: number = 1137029;
  orderHeader: OrderHeader;
  palletStackingDetail: PalletStackingDetail;
  products: ItemCodeDetail[] = [];
  public totalQty: number = 75;

  constructor(storeId: number) {
    this.storeId = storeId;
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


  public stores: Store[] = new Array<Store>();


  constructor(private reportGeneratorService: ReportGeneratorService) {
    this.stores.push(new Store(7666));
    this.stores.push(new Store(777));
    this.stores.push(new Store(888));
    this.stores.push(new Store(999));

  }

  generatePDF() {
    this.reportGeneratorService.GeneratePdf(this.stores);
  }

}
