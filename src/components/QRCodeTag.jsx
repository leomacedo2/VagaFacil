import { useEffect, useState } from "react";
import QRCode from "qrcode";
import "../styles/QRCodeTag.css";

/**
 * Gera um QR Code fictício no próprio navegador (sem chamadas de rede).
 * O conteúdo é apenas ilustrativo, representando o código de acesso da reserva.
 */
function QRCodeTag({ value, size = 120 }) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: { dark: "#0a1533", light: "#ffffff" },
    })
      .then((url) => {
        if (isMounted) setDataUrl(url);
      })
      .catch(() => {
        if (isMounted) setDataUrl(null);
      });
    return () => {
      isMounted = false;
    };
  }, [value, size]);

  return (
    <div className="qrcode-tag" style={{ width: size, height: size }}>
      {dataUrl ? (
        <img src={dataUrl} alt="QR Code de acesso à reserva" width={size} height={size} />
      ) : (
        <span className="qrcode-tag__placeholder" />
      )}
    </div>
  );
}

export default QRCodeTag;
