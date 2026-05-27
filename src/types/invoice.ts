export interface InvoiceItem {
  id: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
  igstRate: number;
}

export interface InvoiceData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerAddress: string;
  customerMobile: string;
  paymentMethod: string;
  imei1: string;
  imei2: string;
  serialNumber: string;
  mobileModel: string;
  storage: string;
  items: InvoiceItem[];
  signature: string;
}

export const defaultInvoice: InvoiceData = {
  businessName: "JAIN MOBILE PACHORE",
  businessAddress: "Jain Mobile, Boda Road, Rajgarh, Pachore, Madhya Pradesh 465683",
  businessPhone: "8109758044 / 7879757647",
  invoiceNumber: "101",
  invoiceDate: new Date().toLocaleDateString("en-GB"),
  customerName: "",
  customerAddress: "",
  customerMobile: "",
  paymentMethod: "Cash",
  imei1: "",
  imei2: "",
  serialNumber: "",
  mobileModel: "",
  storage: "",
  items: [
    {
      id: "1",
      description: "",
      price: 0,
      quantity: 1,
      discount: 0,
      igstRate: 0,
    },
  ],
  signature: "",
};
