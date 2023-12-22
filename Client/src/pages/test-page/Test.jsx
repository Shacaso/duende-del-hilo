import { useState } from 'react';
import { PDFile } from '../../utils/Pdf/PDFile.jsx';
import { PDFViewer } from '@react-pdf/renderer';
import { useModal } from '@/hooks';
import '../../utils/Pdf/styles/test.scss';

const Test = () => {
  const { openModal } = useModal();
  const [verPDF, setVerPDF] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setVerPDF(!verPDF);
        }}
        className='btn btn-primary btn-wide'
      >
        {verPDF ? 'OCULTAR PDF' : 'VER DOCUMENTO'}
      </button>
      <button className='btn btn-success btn-wide'
        onClick={() =>
          openModal(
            <PDFViewer style={{ width: '100%', height: '70vh' }}>
              <PDFile />
            </PDFViewer>,
            {
              title: 'Nuevo Disfraz',
              className: 'modal-product',
            }
          )
        }
      >
        {' '}
        ABRIR MODAL
      </button>

      {verPDF && (
        <PDFViewer style={{ width: '100%', height: '90vh' }}>
          <PDFile />
        </PDFViewer>
      )}
              {/* <PDFile /> */}

    </>
  );
};

export default Test;
