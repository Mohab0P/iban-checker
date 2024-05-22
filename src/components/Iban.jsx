import React, { useState } from "react";
import translations from "./translations";

export default function Iban() {
  const banks = [
    { samaCode: '55', bankName: 'Banque Saudi Fransi', nameEn: 'Banque Saudi Fransi', nameAr: 'البنك السعودي الفرنسي', img: './img/55.png' },
    { name: 'Alrajhi Bank', samaCode: '80', nameEn: 'Alrajhi Bank', nameAr: 'بنك الراجحي', img: './img/80.png' },
    { samaCode: '10', bankName: 'National Commercial Bank', nameEn: 'National Commertial Bank', nameAr: 'البنك الأهلي التجاري', img: './img/10.png' },
    { samaCode: '45', bankName: 'Saudi British Bank', nameEn: 'SABB', nameAr: 'ساب', img: './img/45.png' },
    { samaCode: '20', bankName: 'Riyadh Bank', nameEn: 'Riyad Bank', nameAr: 'بنك الرياض', img: './img/20.png' },
    { samaCode: '40', bankName: 'Saudi American Bank', nameEn: 'SAMBA', nameAr: 'سامبا', img: './img/40.png' },
    { samaCode: '05', bankName: 'Alinma Bank', nameEn: 'AL Inma Bank', nameAr: 'بنك الانماء', img: './img/05.png' },
    { samaCode: '50', bankName: 'Alawwal bank', nameEn: 'AlAwwal Bank', nameAr: 'البنك الأول', img: './img/50.png' },
    { samaCode: '60', bankName: 'Bank AlJazira', nameEn: 'Bank Aljazerah', nameAr: 'بنك الجزيرة', img: './img/60.png' },
    { samaCode: '65', bankName: 'Saudi Investment Bank', nameEn: 'Saudi Investment Bank', nameAr: 'البنك السعودي للأستثمار', img: './img/65.png' },
    { samaCode: '15', bankName: 'Bank AlBilad ', nameEn: 'BANK ALBELAD', nameAr: 'بنك البلاد', img: './img/15.png' },
    { samaCode: '30', bankName: 'Arab National Bank', nameEn: 'Arab National Bank', nameAr: 'البنك العربي الوطني', img: './img/30.png' },
    { samaCode: '90', bankName: 'GULF Bank', sarieCode: 'GULFSARI', nameEn: 'Gulf International Bank', nameAr: 'بنك الخليج', img: './img/90.png' },
    { samaCode: '95', bankName: 'Emirates Bank', nameEn: 'EMARITE BANK', nameAr: 'بنك الامارات', img: './img/95.png' },
    { samaCode: '76', bankName: 'Bank Muscat', nameEn: 'Bank Muscat', nameAr: 'بنك مسقط', img: './img/76.png' },
    { samaCode: '71', bankName: 'National Bank of Bahrain', nameEn: 'National Bank Of Bahrain', nameAr: 'بنك البحرين الوطني', img: './img/71.png' },
    { samaCode: '75', bankName: 'National Bank of Kuwait', nameEn: 'National Bank of Kuwait', nameAr: 'بنك الكويت الوطني', img: './img/75.png' },
    { samaCode: '85', bankName: 'BNP Paribas Bank', nameEn: 'BNP PARIBAS SAUDI ARABIA', nameAr: 'بي ان بي باريبوس', img: './img/85.png' },
  ];

  const IBAN_LENGTH = 24;
  const IBAN_PREFIX = "SA";
  const [language, setLanguage] = useState("en");
  const [iban, setIban] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [remainingChars, setRemainingChars] = useState(IBAN_LENGTH);

  const validateIBAN = (iban) => {
    if (!iban) return translations[language].ibanLengthError;

    iban = iban.trim();

    if (iban.length !== IBAN_LENGTH)
      return translations[language].ibanLengthError;
    if (!iban.startsWith(IBAN_PREFIX))
      return translations[language].ibanStartError;

    return "";
  };

  const getBankByIban = (event) => {
    event.preventDefault();
    const errorMessage = validateIBAN(iban);
    if (errorMessage) {
      setError(errorMessage);
      setMessage("");
    } else {
      const bankCode = iban.substring(4, 6); // Corrected indices
      const bank = banks.find((b) => b.samaCode === bankCode); // Change 'code' to 'samaCode'
      if (bank) {
        setMessage(
          <div>
            <p className="fs-4">
              {translations[language].ibanCorrect}{" "}
              {language === "ar" ? bank.nameAr : bank.nameEn}
            </p>
            <img
              src={bank.img}
              alt={language === "ar" ? bank.nameAr : bank.nameEn}
              style={{ width: "250px", height: "auto" }}
            />
          </div>
        );
        setError("");
      } else {
        setError(translations[language].bankNotFound);
        setMessage("");
      }
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\s/g, "");
    setIban(inputValue);
    setRemainingChars(IBAN_LENGTH - inputValue.length);
    if (inputValue.length <= IBAN_LENGTH) {
      setError("");
    } else {
      setError(translations[language].ibanLengthError);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
      <div className="center">
        <div className="container mt-5 p-1">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                  <form onSubmit={getBankByIban}>
                    <div className="form-group">
                      <label
                        htmlFor="iban"
                        className="badge bg-success fs-6 mb-2"
                      >
                        {translations[language].ibanLabel}
                      </label>
                      {error && (
                        <div className="alert alert-danger mt-2">{error}</div>
                      )}
                      <input
                        type="text"
                        name="iban"
                        id="iban"
                        className={`form-control border-2 ${
                          error ? "border-danger" : "border-secondary"
                        }`}
                        value={iban}
                        onChange={handleInputChange}
                        placeholder={translations[language].ibanPlaceholder}
                      />
                      <small className="form-text text-muted">
                        {remainingChars >= 0
                          ? `${remainingChars} characters left`
                          : `${Math.abs(remainingChars)} characters over limit`}
                      </small>
                    </div>
                    <div className="form-group mt-3">
                      <button type="submit" className="btn btn-primary">
                        {translations[language].submitButton}
                      </button>
                      <button
                        type="reset"
                        className="btn btn-danger mx-3"
                        onClick={() => {
                          setIban("");
                          setError("");
                          setMessage("");
                          setRemainingChars(IBAN_LENGTH);
                        }}
                      >
                        {translations[language].resetButton}
                      </button>
                    </div>
                  </form>
                  <div id="result" className="mt-3">
                    {message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
