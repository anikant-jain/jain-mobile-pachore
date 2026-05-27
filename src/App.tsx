import { useState, useRef, useCallback } from "react";
import { InvoiceData, defaultInvoice } from "./types/invoice";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import { FileText, Eye, PenLine } from "lucide-react";

export default function App() {
  const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoice);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const invoiceEl = document.getElementById("invoice-preview");
    if (!invoiceEl) return;

    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch {
          return "";
        }
      })
      .join("\n");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice.invoiceNumber}</title>
          <style>
            ${styles}
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: white; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          </style>
        </head>
        <body>
          ${invoiceEl.outerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }, [invoice.invoiceNumber]);

  const handleDownload = useCallback(async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const invoiceEl = document.getElementById("invoice-preview");
    if (!invoiceEl) return;

    const opt = {
      margin: 0,
      filename: `Invoice_${invoice.invoiceNumber}_${invoice.customerName || "JainMobile"}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
    };

    html2pdf().set(opt).from(invoiceEl).save();
  }, [invoice.invoiceNumber, invoice.customerName]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 leading-tight">
                  Jain Mobile Pichore
                </h1>
                <p className="text-xs text-gray-500">Invoice Manager</p>
              </div>
            </div>

            {/* Mobile Tab Switcher */}
            <div className="flex md:hidden bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === "edit"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <PenLine className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === "preview"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div
            className={`${activeTab === "edit" ? "block" : "hidden md:block"}`}
          >
            <InvoiceForm
              data={invoice}
              onChange={setInvoice}
              onPrint={handlePrint}
              onDownload={handleDownload}
            />
          </div>

          {/* Preview Panel */}
          <div
            ref={previewRef}
            className={`${activeTab === "preview" ? "block" : "hidden md:block"}`}
          >
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-gray-800">
                    Live Preview
                  </h2>
                  <span className="text-xs text-gray-400">A4 Format</span>
                </div>
                <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                  <div className="preview-scale-wrapper">
                    <InvoicePreview data={invoice} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
