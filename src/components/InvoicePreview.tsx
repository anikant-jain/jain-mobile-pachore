import { InvoiceData } from "../types/invoice";
import JMLogo from "./JMLogo";

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const calculateItemAmount = (item: InvoiceData["items"][0]) => {
    const baseAmount = item.price * item.quantity;
    const discountAmount = baseAmount * (item.discount / 100);
    const taxableAmount = baseAmount - discountAmount;
    const igstAmount = taxableAmount * (item.igstRate / 100);
    return {
      baseAmount,
      discountAmount,
      taxableAmount,
      igstAmount,
      total: taxableAmount + igstAmount,
    };
  };

  const totals = data.items.reduce(
    (acc, item) => {
      const calc = calculateItemAmount(item);
      return {
        netAmount: acc.netAmount + calc.taxableAmount,
        igst: acc.igst + calc.igstAmount,
        discount: acc.discount + calc.discountAmount,
        total: acc.total + calc.total,
      };
    },
    { netAmount: 0, igst: 0, discount: 0, total: 0 }
  );

  const formatCurrency = (val: number) => {
    return val.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      id="invoice-preview"
      className="bg-white shadow-lg border border-gray-200"
      style={{ width: "210mm", minHeight: "297mm", margin: "0 auto" }}
    >
      {/* Invoice Content */}
      <div className="p-8" style={{ minHeight: "297mm" }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <JMLogo className="w-36 h-36" />
          </div>

          {/* Invoice Info */}
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Page 1 of 1</p>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              TAX INVOICE
            </h1>
            <div className="w-full h-0.5 bg-gray-300 my-2"></div>
            <h2 className="text-lg font-black text-gray-900 tracking-wide">
              {data.businessName}
            </h2>
            <p className="text-sm text-gray-700 mt-1 leading-relaxed">
              {data.businessAddress.split(",").map((part, i, arr) => (
                <span key={i}>
                  {part.trim()}
                  {i < arr.length - 1 ? "," : ""}
                  {i === 0 ? <br /> : i === 2 ? <br /> : null}
                </span>
              ))}
            </p>
            <p className="text-sm text-gray-700 mt-1 font-medium">
              {data.businessPhone}
            </p>
            <div className="w-full h-0.5 bg-gray-300 my-2"></div>
            <p className="text-sm text-gray-700">Invoice date:</p>
            <p className="text-sm font-semibold text-gray-900">
              {data.invoiceDate}
            </p>
          </div>
        </div>

        {/* Customer & Product Info */}
        <div className="mb-6">
          <div className="mb-4">
            <p className="text-sm font-bold text-gray-900 uppercase">
              NAME<span className="text-red-500">*</span>
            </p>
            <p className="text-sm text-gray-800 mt-1 min-h-[20px]">
              {data.customerName || "\u00A0"}
            </p>
            {data.customerAddress && (
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {data.customerAddress}
              </p>
            )}
            {data.customerMobile && (
              <p className="text-xs text-gray-600 mt-1">
                Mob: {data.customerMobile}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 mb-4">
            <div>
              <p className="text-sm font-bold text-gray-900 uppercase">
                MODEL<span className="text-red-500">*</span>
              </p>
              <p className="text-sm text-gray-800 mt-1 min-h-[20px]">
                {data.mobileModel || "\u00A0"}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                storage <span className="text-red-500">*~</span>
              </p>
              <p className="text-sm text-gray-800 mt-1 min-h-[20px]">
                {data.storage || "\u00A0"}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-t-2 border-b-2 border-gray-400">
                <th className="text-left py-2 px-2 text-xs font-bold text-gray-900 uppercase">
                  Description
                </th>
                <th className="text-right py-2 px-2 text-xs font-bold text-gray-900 uppercase w-24">
                  Price
                </th>
                <th className="text-right py-2 px-2 text-xs font-bold text-gray-900 uppercase w-16">
                  Qty
                </th>
                <th className="text-right py-2 px-2 text-xs font-bold text-gray-900 uppercase w-20">
                  Discount
                </th>
                <th className="text-right py-2 px-2 text-xs font-bold text-gray-900 uppercase w-16">
                  IGST
                </th>
                <th className="text-right py-2 px-2 text-xs font-bold text-gray-900 uppercase w-28">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => {
                const calc = calculateItemAmount(item);
                return (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-2 px-2 text-sm text-gray-800">
                      {item.description || "\u00A0"}
                    </td>
                    <td className="py-2 px-2 text-sm text-gray-800 text-right">
                      {item.price > 0 ? formatCurrency(item.price) : "\u00A0"}
                    </td>
                    <td className="py-2 px-2 text-sm text-gray-800 text-right">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-2 text-sm text-gray-800 text-right">
                      {item.discount > 0 ? `${item.discount} %` : "0 %"}
                    </td>
                    <td className="py-2 px-2 text-sm text-gray-800 text-right">
                      {item.igstRate > 0 ? `${item.igstRate} %` : "0 %"}
                    </td>
                    <td className="py-2 px-2 text-sm text-gray-800 text-right font-medium">
                      {calc.total > 0 ? formatCurrency(calc.total) : "\u00A0"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* IMEI Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-800">
            <span className="font-semibold">IMEI1</span>
            <span className="text-red-500">*~</span> {data.imei1 || "\u00A0"}
          </p>
          <p className="text-sm text-gray-800 mt-1">
            <span className="font-semibold">IMEI2</span>
            <span className="text-red-500">*~</span> {data.imei2 || "\u00A0"}
          </p>
          {data.serialNumber && (
            <p className="text-sm text-gray-800 mt-1">
              <span className="font-semibold">S/N:</span> {data.serialNumber}
            </p>
          )}
        </div>

        {/* Tax & Totals */}
        <div className="border-t-2 border-gray-400 pt-4 mb-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left - Tax Breakdown */}
            <div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-1 text-xs font-bold text-gray-900">
                      IGST rate
                    </th>
                    <th className="text-left py-1 text-xs font-bold text-gray-900">
                      Basis
                    </th>
                    <th className="text-right py-1 text-xs font-bold text-gray-900">
                      IGST
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => {
                    const calc = calculateItemAmount(item);
                    if (item.igstRate <= 0) return null;
                    return (
                      <tr key={item.id}>
                        <td className="py-1 text-sm text-gray-800">
                          {item.igstRate} %
                        </td>
                        <td className="py-1 text-sm text-gray-800">
                          {formatCurrency(calc.taxableAmount)}
                        </td>
                        <td className="py-1 text-sm text-gray-800 text-right">
                          {formatCurrency(calc.igstAmount)}
                        </td>
                      </tr>
                    );
                  })}
                  {totals.igst === 0 && (
                    <tr>
                      <td className="py-1 text-sm text-gray-800">0 %</td>
                      <td className="py-1 text-sm text-gray-800">&nbsp;</td>
                      <td className="py-1 text-sm text-gray-800 text-right">
                        0.00
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Right - Totals */}
            <div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Net amount</span>
                  <span className="text-gray-900">
                    {formatCurrency(totals.netAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">IGST</span>
                  <span className="text-gray-900">
                    {formatCurrency(totals.igst)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Discount</span>
                  <span className="text-gray-900">
                    {formatCurrency(totals.discount)}
                  </span>
                </div>
                <div className="border-t border-gray-400 pt-1 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-black text-gray-900 uppercase">
                      TOTAL DUE
                      <br />
                      (INR)
                    </span>
                    <span className="text-lg font-black text-gray-900">
                      {formatCurrency(totals.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-16">
          <div className="w-full h-1 bg-yellow-200 mb-4"></div>
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-3">
            PAYMENT INFORMATION
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">payment method,</span>
              </p>
              <p className="text-sm text-gray-800 mt-1 font-semibold">
                {data.paymentMethod}
              </p>
            </div>
            <div>
              <div className="flex gap-8 mb-1">
                <span className="text-sm text-gray-700">Invoice number:</span>
                <span className="text-sm text-gray-900 font-medium">
                  {data.invoiceNumber}
                </span>
              </div>
              <div className="flex gap-8">
                <span className="text-sm text-gray-700">Amount (INR)</span>
                <span className="text-sm text-gray-900 font-medium">
                  {formatCurrency(totals.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        {data.signature && (
          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <div className="w-48 h-px bg-gray-400 mb-2"></div>
              <p className="text-sm text-gray-700">Authorized Signature</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {data.signature}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-16 flex justify-between items-end">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
            JM MOBILE
          </p>
          <p className="text-xs text-gray-400">
            {data.businessPhone.split("/").pop()?.trim()}
          </p>
        </div>
      </div>
    </div>
  );
}
