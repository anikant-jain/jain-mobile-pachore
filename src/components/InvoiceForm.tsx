import { InvoiceData, InvoiceItem, defaultInvoice } from "../types/invoice";
import { Plus, Trash2, FileText, Printer, Download, RotateCcw } from "lucide-react";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
  onPrint: () => void;
  onDownload: () => void;
}

export default function InvoiceForm({
  data,
  onChange,
  onPrint,
  onDownload,
}: InvoiceFormProps) {
  const updateField = <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, items });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: Date.now().toString(),
          description: "",
          price: 0,
          quantity: 1,
          discount: 0,
          igstRate: 0,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    if (data.items.length <= 1) return;
    const items = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Invoice Editor</h2>
            <p className="text-xs text-gray-500">Fill in the details below</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (confirm("Reset all fields to default?")) {
              onChange({ ...defaultInvoice, invoiceNumber: String(parseInt(defaultInvoice.invoiceNumber) + 1) });
            }
          }}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
          title="Reset form"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Business Details */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Business Details
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className={labelClass}>Business Name</label>
            <input
              type="text"
              className={inputClass}
              value={data.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Business Address</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={2}
              value={data.businessAddress}
              onChange={(e) => updateField("businessAddress", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Business Phone</label>
            <input
              type="text"
              className={inputClass}
              value={data.businessPhone}
              onChange={(e) => updateField("businessPhone", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Invoice Details
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Invoice Number</label>
            <input
              type="text"
              className={inputClass}
              value={data.invoiceNumber}
              onChange={(e) => updateField("invoiceNumber", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Invoice Date</label>
            <input
              type="text"
              className={inputClass}
              value={data.invoiceDate}
              onChange={(e) => updateField("invoiceDate", e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Customer Details
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className={labelClass}>Customer Name *</label>
            <input
              type="text"
              className={inputClass}
              value={data.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Customer Address</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={2}
              value={data.customerAddress}
              onChange={(e) => updateField("customerAddress", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Mobile Number</label>
              <input
                type="text"
                className={inputClass}
                value={data.customerMobile}
                onChange={(e) => updateField("customerMobile", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Payment Method</label>
              <select
                className={inputClass}
                value={data.paymentMethod}
                onChange={(e) => updateField("paymentMethod", e.target.value)}
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Bank Transfer</option>
                <option>Credit</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Product Details
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelClass}>Mobile Model *</label>
            <input
              type="text"
              className={inputClass}
              value={data.mobileModel}
              onChange={(e) => updateField("mobileModel", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Storage</label>
            <input
              type="text"
              className={inputClass}
              value={data.storage}
              onChange={(e) => updateField("storage", e.target.value)}
              placeholder="e.g. 128GB"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelClass}>IMEI 1</label>
            <input
              type="text"
              className={inputClass}
              value={data.imei1}
              onChange={(e) => updateField("imei1", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>IMEI 2</label>
            <input
              type="text"
              className={inputClass}
              value={data.imei2}
              onChange={(e) => updateField("imei2", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Serial Number</label>
          <input
            type="text"
            className={inputClass}
            value={data.serialNumber}
            onChange={(e) => updateField("serialNumber", e.target.value)}
          />
        </div>
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100 flex items-center justify-between">
          Invoice Items
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Item
          </button>
        </h3>
        {data.items.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="col-span-12">
              <label className={labelClass}>Description</label>
              <input
                type="text"
                className={inputClass}
                value={item.description}
                onChange={(e) =>
                  updateItem(index, "description", e.target.value)
                }
                placeholder="Product description"
              />
            </div>
            <div className="col-span-3">
              <label className={labelClass}>Price (₹)</label>
              <input
                type="number"
                className={inputClass}
                value={item.price || ""}
                onChange={(e) =>
                  updateItem(index, "price", parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Qty</label>
              <input
                type="number"
                className={inputClass}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    parseInt(e.target.value) || 1
                  )
                }
              />
            </div>
            <div className="col-span-3">
              <label className={labelClass}>Discount (%)</label>
              <input
                type="number"
                className={inputClass}
                value={item.discount || ""}
                onChange={(e) =>
                  updateItem(index, "discount", parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div className="col-span-3">
              <label className={labelClass}>IGST (%)</label>
              <input
                type="number"
                className={inputClass}
                value={item.igstRate || ""}
                onChange={(e) =>
                  updateItem(index, "igstRate", parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div className="col-span-1 flex items-end justify-end">
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Signature */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
          Signature
        </h3>
        <div>
          <label className={labelClass}>Authorized Signatory Name</label>
          <input
            type="text"
            className={inputClass}
            value={data.signature}
            onChange={(e) => updateField("signature", e.target.value)}
            placeholder="e.g. Jain Mobile"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onPrint}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print Invoice
        </button>
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
    </div>
  );
}
