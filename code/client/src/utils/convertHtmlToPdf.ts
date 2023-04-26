import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const htmlToPdf = (ids: string[]): void => {
  const myPromises = ids.map((id) => {
    const input = document.getElementById(id);
    if (input) {
      return html2canvas(input);
    } else {
      return undefined;
    }
  });
  Promise.all(myPromises).then((canvases) => {
    const pdf = new jsPDF();
    canvases.forEach((canvas, i) => {
      if (i > 0) {
        pdf.addPage();
        pdf.setPage(i + 1);
      }
      if (canvas) {
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "JPEG", 0, 5, 210, 297);
      }
    });
    // pdf.output('dataurlnewwindow');
    pdf.save("Kate-Ramshaw-Curriculum-Vitae.pdf");
  });
};

export { htmlToPdf };
