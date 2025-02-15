declare module "html2pdf.js" {
    interface Html2PdfInstance {
      from(element: HTMLElement): this
      toPdf(): this
      get(type: string): Promise<any>
    }
  
    function html2pdf(): Html2PdfInstance
    export default html2pdf
  }