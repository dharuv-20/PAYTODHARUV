/**
 * PAY TO DHARUV - Configuration Object
 * 
 * Edit these values to update your personal and payment details on the website.
 * No HTML edits are required to change your account numbers, UPI IDs, or links.
 */
const CONFIG = {
  // Personal Info
  NAME: "DHARUV",
  WHATSAPP_NUMBER: "919996461616", // Format: country code + number (no spaces, dashes, or + signs)

  // UPI Payment Details
  UPI_ID: "9996461616@ptyes", // Your UPI ID
  UPI_QR_CODE_OVERRIDE: "assets/upi_qr.jpg", // Path to custom QR image copied from Paytm upload

  // Indian Bank Details
  INDIAN_ACCOUNT_HOLDER: "DHARUV",
  INDIAN_BANK_NAME: "Punjab National Bank",
  INDIAN_ACCOUNT_NUMBER: "0068100100004710",
  INDIAN_IFSC_CODE: "PUNB0006810",

  // PayPal Details
  PAYPAL_ID: "@DHARUVdharuv907", // PayPal Email or Username
  PAYPAL_LINK: "https://paypal.me/DHARUVdharuv907", // Direct payment link for PayPal
  PAYPAL_QR_CODE: "assets/paypal_qr.jpg", // Path to custom PayPal QR image copied from upload
};
