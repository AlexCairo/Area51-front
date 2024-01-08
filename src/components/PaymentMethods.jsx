import { useState } from "react";

const PaymentMethods = ({data}) => {
    
    const [selectedButton, setSelectedButton] = useState('Billetera Digital');
  
    const handleButtonClick = (name) => {
      setSelectedButton(name);
    };
  
    return (
      <div>
        <div>
          <button onClick={() => handleButtonClick('Billetera Digital')}>Billetera Digital</button>
          <button onClick={() => handleButtonClick('Transferencias Bancarias')}>Transferencias Bancarias</button>
          <button onClick={() => handleButtonClick('Efectivo')}>Efectivo</button>
        </div>
  
        <div>
          <h2>{selectedButton}</h2>
          {data.map((item) => {
            if (item.name === selectedButton) {
              return (
                <div key={item.id}>
                  {item.payment_method.map((method) => (
                    <div key={method.payment_id}>
                      <h3>{method.name}</h3>
                      <p>{method.description}</p>
                      <img src={method.image_logo} alt={method.name} />
                      <img src={method.image_qr} alt={`${method.name} QR`} />
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };
  
  export default PaymentMethods;