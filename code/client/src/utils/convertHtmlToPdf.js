import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const htmlToPdf = (ids) => {
  let myPromises = ids.map((id) => {
    const input = document.getElementById(id);
    return html2canvas(input);
  });
  Promise.all(myPromises).then((canvases) => {
    const pdf = new jsPDF();
    canvases.forEach((canvas, i) => {
      if (i > 0) {
        pdf.addPage();
        pdf.setPage(i + 1);
      }
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 5);
    });
    // pdf.output('dataurlnewwindow');
    pdf.save("Kate-Ramshaw-Curriculum-Vitae.pdf");
  });
};

export { htmlToPdf };
