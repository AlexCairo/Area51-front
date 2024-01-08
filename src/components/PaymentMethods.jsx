import React, { useState } from 'react';
import "../styles/PaymentMethods.css"
import { IoCaretBack } from "react-icons/io5";

const PaymentMethods = ({data, toggleProcess}) => {
  const [selectedButton, setSelectedButton] = useState('Billetera Digital');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [paymentImage, setPaymentImage] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleButtonClick = (name) => {
    setSelectedButton(name);
  };

  const handleLogoClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setPaymentImage(null); 
    setButtonEnabled(false); 
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setPaymentImage(imageFile);
    setButtonEnabled(true);
  };

  const handleDoneButtonClick = () => {
    setModalVisible(false);
  };

  return (
    <div className='payment_box'>
      <div style={{filter: modalVisible && "blur(5px)" }} className="group_button">
        <button style={{pointerEvents: modalVisible ? "none" : "all"}} className={`${selectedButton === 'Billetera Digital' ? "button_selected" : ""}`} onClick={() => handleButtonClick('Billetera Digital')}>Billetera Digital</button>
        <button style={{pointerEvents: modalVisible ? "none" : "all"}} className={`${selectedButton === 'Transferencias Bancarias' ? "button_selected" : ""}`} onClick={() => handleButtonClick('Transferencias Bancarias')}>Transferencias Bancarias</button>
        <button style={{pointerEvents: modalVisible ? "none" : "all"}} className={`${selectedButton === 'Efectivo' ? "button_selected" : ""}`} onClick={() => handleButtonClick('Efectivo')}>Efectivo</button>
      </div>
      <div style={{filter: modalVisible && "blur(5px)" }} className='paymentsMethods_container'>
        <h2>{selectedButton}</h2>
        {data.map((item) => {
          if (item.name === selectedButton) {
            return (
              <div className='method_container' key={item.id}>
                {item.payment_method.map((method) => (
                  <div className='method' key={method.payment_id}>
                    <img
                      src={method.image_logo}
                      alt={method.name}
                      onClick={() => handleLogoClick(method.image_qr)}
                      style={{ cursor: 'pointer' , pointerEvents: modalVisible ? "none" : "all"}}
                    />
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>

      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImageUrl} alt="QR Code" />
            <div className='modalRequirement'>
                <p>Enviar comprobante de pago (foto o captura de pantalla)</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button className='checkButton' disabled={!buttonEnabled} onClick={handleDoneButtonClick}>
                Listo
                </button>
                <button className='cancelButton' onClick={closeModal}>X</button>
            </div>
          </div>
        </div>
      )}
      <button onClick={toggleProcess} style={{filter: modalVisible && "blur(5px)" }} className='buttonBack'><IoCaretBack/> Regresar a mi pedido</button>
    </div>
  );
};

export default PaymentMethods;
