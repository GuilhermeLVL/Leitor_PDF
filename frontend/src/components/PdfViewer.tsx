import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfUrl: string | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const goToPrevPage = () => setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber >= numPages! ? numPages! : pageNumber + 1);

  return (
    <div>
      {pdfUrl && (
        <>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>Prev Page</button>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages!}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PdfViewer; 