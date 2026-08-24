# PAY TO DHARUV

A premium, single-page, dark-aesthetic personal payment portal. The website is heavily inspired by the visual design language, spacing, typography, and premium futuristic user experience of **Nexaris.com**.

Clients regularly request UPI QR codes, bank accounts, or PayPal links. Instead of repeatedly searching for and manually sending these details, this project lets you send clients a single professional link where they can choose their preferred payment method, copy the information or scan the QR code, and send a screenshot of the payment confirmation directly to your WhatsApp in a single smooth flow.

---

## 🛠️ File Structure

The project is built as a lightweight, zero-dependency static site:
- [`index.html`](file:///d:/program/Work%20With%20Dharuv/index.html): Structure, typography, styling configuration (via Tailwind CSS CDN), and content wrappers.
- [`config.js`](file:///d:/program/Work%20With%20Dharuv/config.js): Single configuration source containing all personal and payment info.
- [`app.js`](file:///d:/program/Work%20With%20Dharuv/app.js): Tab transitions, clipboard operations, dynamic QR code generation, and WhatsApp deep link generator.
- [`styles.css`](file:///d:/program/Work%20With%20Dharuv/styles.css): Custom fonts, grid textures, radial glowing backdrops, customized scrollbars, and toast animations.

---

## ⚙️ Configuration

To update your credentials, open [`config.js`](file:///d:/program/Work%20With%20Dharuv/config.js) and modify the fields:

```javascript
const CONFIG = {
  // Personal Info
  NAME: "Dharuv",
  WHATSAPP_NUMBER: "919999999999", // Format: country code + number (no spaces, dashes, or + signs)

  // UPI Payment Details
  UPI_ID: "dharuv@upi", // Your UPI ID
  UPI_QR_CODE_OVERRIDE: "", // Optional: e.g. "assets/upi-qr.png" to override dynamic QR

  // Indian Bank Details
  INDIAN_ACCOUNT_HOLDER: "Dharuv",
  INDIAN_BANK_NAME: "HDFC Bank",
  INDIAN_ACCOUNT_NUMBER: "50100123456789",
  INDIAN_IFSC_CODE: "HDFC0000123",

  // PayPal Details
  PAYPAL_ID: "dharuv@paypal.com", // PayPal email or ID
  PAYPAL_LINK: "https://paypal.me/dharuv", // Direct payment link
  PAYPAL_QR_CODE: "", // Optional: Path to custom QR code image
};
```

### QR Code Customization
- **UPI QR Code**: By default, the website **automatically generates a high-contrast, scan-ready QR code** using your `UPI_ID`. If you prefer to use a custom QR image from your bank app, save the image in a folder (e.g., `assets/upi-qr.png`) and set `UPI_QR_CODE_OVERRIDE: "assets/upi-qr.png"`.
- **PayPal QR Code**: Similarly, the website **automatically generates a QR code** linking directly to your `PAYPAL_LINK`. If you wish to override it with a custom image, set the path in `PAYPAL_QR_CODE`.

---

## 🚀 Deployment

Because the site is a standard static client-side bundle, it has zero compilation requirements and can be hosted for free in minutes:

### Option A: GitHub Pages (Recommended)
1. Initialize a Git repository in the folder.
2. Push the files to a GitHub repository.
3. Go to the repository **Settings** -> **Pages** and enable hosting for the `main` branch.

### Option B: Vercel / Netlify
1. Log in to Vercel or Netlify.
2. Drag and drop the folder containing these files.
3. Your site is live instantly with an SSL certificate.

### Option C: Personal Server
- Upload `index.html`, `styles.css`, `app.js`, `config.js` and any asset images (like custom QR overrides) to your web server (Apache, Nginx, etc.) via FTP/SFTP.
