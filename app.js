/**
 * PAY TO DHARUV - Interactive Logic and Animations (Option A)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Values from CONFIG
  initializeConfig();

  // 2. Generate QR Codes
  generateQRCodes();

  // 3. Tab State Management (Payment Method Cards)
  setupPaymentTabs();

  // 4. Clipboard Functionality (Copy buttons)
  setupClipboard();

  // 5. Setup WhatsApp Link
  setupWhatsAppLink();

  // 6. Setup Mobile UPI App Deep Link Launcher
  setupMobileUPI();

  // 7. Initialize 3D Card Hover Tilt Effects
  initTiltEffect();

  // 8. Run Premium Preloader before showing hero content
  runPremiumPreloader(() => {
    initGSAPAnimations();
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  });

  // 9. Initialize Interactive Parallax Background Glows
  initParallaxGlows();

  // 10. Initialize Interactive Cursor Spotlight Trail
  initCursorGlow();

  // 11. Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

/**
 * Injects configuration values into corresponding HTML placeholder elements
 */
function initializeConfig() {
  // Update name across elements
  document.querySelectorAll("[data-config-name]").forEach((el) => {
    el.textContent = CONFIG.NAME;
  });

  // Inject Indian Bank Details
  document.getElementById("indian-holder").textContent = CONFIG.INDIAN_ACCOUNT_HOLDER;
  document.getElementById("indian-bank").textContent = CONFIG.INDIAN_BANK_NAME;
  document.getElementById("indian-account").textContent = CONFIG.INDIAN_ACCOUNT_NUMBER;
  document.getElementById("indian-ifsc").textContent = CONFIG.INDIAN_IFSC_CODE;

  // Inject UPI ID
  document.getElementById("upi-id-text").textContent = CONFIG.UPI_ID;

  // Inject PayPal Details
  document.getElementById("paypal-id-text").textContent = CONFIG.PAYPAL_ID;
  const paypalLinkBtn = document.getElementById("paypal-link-btn");
  if (paypalLinkBtn) {
    paypalLinkBtn.href = CONFIG.PAYPAL_LINK;
  }
}

/**
 * Dynamically generates QR codes for UPI and PayPal (if override not present)
 */
function generateQRCodes() {
  // UPI QR Code
  const upiQrContainer = document.getElementById("upi-qr-container");
  if (upiQrContainer) {
    if (CONFIG.UPI_QR_CODE_OVERRIDE) {
      upiQrContainer.innerHTML = `
        <img src="${CONFIG.UPI_QR_CODE_OVERRIDE}" alt="UPI QR Code" class="w-full h-auto object-contain mx-auto rounded-xl" />
      `;
      const parentFrame = upiQrContainer.closest(".relative.bg-white");
      if (parentFrame) {
        parentFrame.classList.remove("bg-white", "p-4.5");
        parentFrame.classList.add("bg-transparent");
      }
    } else if (typeof QRCode !== "undefined") {
      // Dynamic UPI deep link: upi://pay?pa=upi_id&pn=Name&cu=INR
      const upiUrl = `upi://pay?pa=${CONFIG.UPI_ID}&pn=${encodeURIComponent(CONFIG.NAME)}&cu=INR`;
      upiQrContainer.innerHTML = ""; // Clear loading placeholder
      
      new QRCode(upiQrContainer, {
        text: upiUrl,
        width: 320,
        height: 320,
        colorDark: "#050505",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.M
      });
      
      const canvas = upiQrContainer.querySelector("canvas");
      if (canvas) canvas.classList.add("mx-auto", "max-w-full", "rounded-md");
      const img = upiQrContainer.querySelector("img");
      if (img) img.classList.add("mx-auto", "max-w-full", "rounded-md");
    }
  }

  // PayPal QR Code
  const paypalQrContainer = document.getElementById("paypal-qr-container");
  const paypalQrWrapper = document.getElementById("paypal-qr-wrapper");

  if (paypalQrContainer && paypalQrWrapper) {
    if (CONFIG.PAYPAL_QR_CODE) {
      paypalQrContainer.innerHTML = `
        <img src="${CONFIG.PAYPAL_QR_CODE}" alt="PayPal QR Code" class="w-full h-auto object-contain mx-auto rounded-xl" />
      `;
      const parentFrame = paypalQrContainer.closest(".relative.bg-white");
      if (parentFrame) {
        parentFrame.classList.remove("bg-white", "p-4.5");
        parentFrame.classList.add("bg-transparent");
      }
      paypalQrWrapper.classList.remove("hidden");
    } else if (CONFIG.PAYPAL_LINK && typeof QRCode !== "undefined") {
      // Auto-generate QR code linking to PayPal link
      paypalQrContainer.innerHTML = "";
      new QRCode(paypalQrContainer, {
        text: CONFIG.PAYPAL_LINK,
        width: 320,
        height: 320,
        colorDark: "#050505",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.M
      });
      
      const canvas = paypalQrContainer.querySelector("canvas");
      if (canvas) canvas.classList.add("mx-auto", "max-w-full", "rounded-md");
      const img = paypalQrContainer.querySelector("img");
      if (img) img.classList.add("mx-auto", "max-w-full", "rounded-md");
      paypalQrWrapper.classList.remove("hidden");
    } else {
      paypalQrWrapper.classList.add("hidden");
    }
  }
}

/**
 * Activates a specific payment method across cards, hero buttons, and details panels
 */
function switchPaymentMethod(rawMethod, shouldScroll = false) {
  // Normalize 'bank' to 'indian-bank'
  const targetMethod = (rawMethod === "bank") ? "indian-bank" : rawMethod;

  const cards = document.querySelectorAll(".payment-method-card");
  const heroBtns = document.querySelectorAll("[data-hero-method]");
  const panels = document.querySelectorAll(".payment-details-panel");
  const detailsSection = document.getElementById("payment-details-section");

  // 1. Update Card Active States in Section 3
  cards.forEach((c) => {
    const cardMethod = c.getAttribute("data-method");
    const isMatch = (cardMethod === targetMethod) || 
                    (cardMethod === "indian-bank" && targetMethod === "bank") || 
                    (cardMethod === "bank" && targetMethod === "indian-bank");
    if (isMatch) {
      c.classList.add("payment-card-active");
    } else {
      c.classList.remove("payment-card-active");
    }
  });

  // 2. Update Hero Buttons Active States (Highlighting the selected button)
  heroBtns.forEach((btn) => {
    const btnMethod = btn.getAttribute("data-hero-method");
    btn.classList.remove("is-active-upi", "is-active-bank", "is-active-paypal");

    const isMatch = (btnMethod === targetMethod) || 
                    (btnMethod === "indian-bank" && targetMethod === "bank") || 
                    (btnMethod === "bank" && targetMethod === "indian-bank");

    if (isMatch) {
      if (btnMethod === "upi") btn.classList.add("is-active-upi");
      else if (btnMethod === "indian-bank" || btnMethod === "bank") btn.classList.add("is-active-bank");
      else if (btnMethod === "paypal") btn.classList.add("is-active-paypal");
    }
  });

  // 3. Hide and Animate Panels switching
  const panelId = (targetMethod === "bank" || targetMethod === "indian-bank") ? "indian-bank-panel" : `${targetMethod}-panel`;
  const activePanel = document.getElementById(panelId);
  if (activePanel) {
    panels.forEach((panel) => {
      if (panel !== activePanel && !panel.classList.contains("hidden")) {
        gsap.to(panel, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            panel.classList.add("hidden");
          }
        });
      }
    });

    if (activePanel.classList.contains("hidden")) {
      activePanel.classList.remove("hidden");
      gsap.fromTo(activePanel,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.2 }
      );
    }
  }

  // 4. Smooth scroll to details section if requested
  if (shouldScroll && detailsSection) {
    detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Handles switching between different payment methods with GSAP transitions
 */
function setupPaymentTabs() {
  const cards = document.querySelectorAll(".payment-method-card");
  const heroBtns = document.querySelectorAll("[data-hero-method]");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const targetMethod = card.getAttribute("data-method");
      const shouldScroll = window.innerWidth < 1024;
      switchPaymentMethod(targetMethod, shouldScroll);
    });
  });

  heroBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetMethod = btn.getAttribute("data-hero-method");
      // Always scroll down to details when selecting from hero
      switchPaymentMethod(targetMethod, true);
    });
  });
}

/**
 * Detects mobile user agents and mounts the native UPI link trigger
 */
function setupMobileUPI() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const upiAppBtn = document.getElementById("upi-app-btn");
  const upiAppBtnWrapper = document.getElementById("upi-app-btn-wrapper");

  if (upiAppBtn && upiAppBtnWrapper) {
    if (isMobile) {
      // Build deep link for UPI chooser: upi://pay?pa=...
      const upiUrl = `upi://pay?pa=${CONFIG.UPI_ID}&pn=${encodeURIComponent(CONFIG.NAME)}&cu=INR`;
      upiAppBtn.href = upiUrl;
      upiAppBtnWrapper.classList.remove("hidden");
    } else {
      upiAppBtnWrapper.classList.add("hidden");
    }
  }
}

/**
 * Sets up copying values individually or in groups, with toast alerts and visual feedbacks
 */
function setupClipboard() {
  // Individual Copy Buttons
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const fieldId = button.getAttribute("data-copy");
      const fieldElement = document.getElementById(fieldId);

      if (fieldElement) {
        let textToCopy = fieldElement.textContent || fieldElement.innerText;
        textToCopy = textToCopy.trim();
        copyTextToClipboard(textToCopy, `✓ Copied to clipboard`, button);
      }
    });
  });

  // Copy All Indian Bank Details Button
  const copyAllIndianBtn = document.getElementById("copy-all-indian");
  if (copyAllIndianBtn) {
    copyAllIndianBtn.addEventListener("click", () => {
      const formattedText = `Bank Account Details:
Holder Name: ${CONFIG.INDIAN_ACCOUNT_HOLDER}
Bank Name: ${CONFIG.INDIAN_BANK_NAME}
Account Number: ${CONFIG.INDIAN_ACCOUNT_NUMBER}
IFSC Code: ${CONFIG.INDIAN_IFSC_CODE}`;

      copyTextToClipboard(formattedText, `✓ Indian Bank details copied`, copyAllIndianBtn);
    });
  }

  // Copy All PayPal Details Button
  const copyAllPaypalBtn = document.getElementById("copy-all-paypal");
  if (copyAllPaypalBtn) {
    copyAllPaypalBtn.addEventListener("click", () => {
      const formattedText = `PayPal Payment Details:
PayPal ID: ${CONFIG.PAYPAL_ID}
Direct Link: ${CONFIG.PAYPAL_LINK}`;

      copyTextToClipboard(formattedText, `✓ PayPal details copied`, copyAllPaypalBtn);
    });
  }
}

/**
 * Copies plain text to user clipboard and updates the button UI temporarily
 */
function copyTextToClipboard(text, successMessage, buttonElement) {
  if (!navigator.clipboard) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      showToast(successMessage);
      toggleButtonFeedback(buttonElement);
    } catch (err) {
      console.error("Clipboard copy failed: ", err);
    }
    document.body.removeChild(textarea);
    return;
  }

  navigator.clipboard.writeText(text).then(
    () => {
      showToast(successMessage);
      toggleButtonFeedback(buttonElement);
    },
    (err) => {
      console.error("Could not copy text: ", err);
      showToast("⚠ Failed to copy details");
    }
  );
}

/**
 * Provides visual feedback on the copy button (changes icon to checkmark)
 */
function toggleButtonFeedback(buttonElement) {
  if (!buttonElement) return;

  const originalHTML = buttonElement.innerHTML;
  const isPillButton = buttonElement.classList.contains("px-8") || buttonElement.classList.contains("px-6");

  if (isPillButton) {
    buttonElement.innerHTML = `<i data-lucide="check" class="w-4 h-4 mr-2 text-green-400"></i>Copied!`;
  } else {
    buttonElement.innerHTML = `<i data-lucide="check" class="w-5 h-5 text-green-400"></i>`;
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  setTimeout(() => {
    buttonElement.innerHTML = originalHTML;
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }, 2000);
}

/**
 * Dynamically builds and registers the WhatsApp deep link
 */
function setupWhatsAppLink() {
  const whatsappBtn = document.getElementById("whatsapp-btn");
  if (whatsappBtn) {
    const cleanedNumber = CONFIG.WHATSAPP_NUMBER.replace(/\D/g, "");
    const message = `Hi ${CONFIG.NAME}, I have completed the payment. I am sharing my payment confirmation screenshot here.`;
    whatsappBtn.href = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
  }
}

/**
 * Spawns a premium toast notification that fades in and slides up from the bottom right
 */
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg flex items-center gap-3 bg-darkCardElevated/90 text-primaryText px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 text-sm font-medium tracking-wide";
  
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-accentBlue shadow-[0_0_8px_#6C7CFF]"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2", "transition-all", "duration-500");
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
}

/**
 * 3D Mouse Parallax Tilt Mechanics with Spot Dynamic Lighting
 */
function initTiltEffect() {
  const cards = document.querySelectorAll(".payment-method-card");
  
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (Limit rotation up to 10 degrees)
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      // Apply 3D perspective rotation scale
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Spotlight dynamic glow reflection
      const glow = card.querySelector(".card-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.05), transparent 60%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      const glow = card.querySelector(".card-glow");
      if (glow) {
        glow.style.background = "transparent";
      }
    });
  });
}

/**
 * Mounts GSAP timelines and ScrollTrigger bounds
 */
function initGSAPAnimations() {
  if (typeof gsap === "undefined") return;

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Content Chain entrance
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.6 } });
  
  heroTl
    .fromTo("nav", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1.2 })
    .fromTo(".gsap-hero-badge", { opacity: 0, scale: 0.8, y: -20 }, { opacity: 1, scale: 1, y: 0 }, "-=0.8")
    .fromTo(".gsap-hero-title", { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.8 }, "-=1.3")
    .fromTo(".gsap-hero-desc", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, "-=1.4")
    .fromTo(".gsap-hero-btn", { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: "back.out(1.2)" }, "-=1.4")
    .fromTo(".gsap-hero-tag", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=1.4")
    .fromTo(".gsap-hero-assets", { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0 }, "-=1.5");

  // 2. Floating Asset Tokens entrance
  gsap.fromTo(".floating-token", 
    { opacity: 0, scale: 0.7 }, 
    { opacity: 1, scale: 1, duration: 1.6, ease: "back.out(1.5)", stagger: 0.2, delay: 0.5 }
  );

  // 3. Selection Section Header Scroll Reveal
  if (typeof ScrollTrigger !== "undefined") {
    gsap.fromTo(".gsap-section-header", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: "#payment-method-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // 4. Payment selection cards staggered reveal
    gsap.fromTo(".payment-method-card", 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: "#payment-method-section",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // 5. Details Section slide trigger
    gsap.fromTo("#payment-details-section", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: "#payment-details-section",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 6. WhatsApp Completion Card entrance
    const completionCard = document.querySelector(".bg-nexaris-blue");
    if (completionCard) {
      const whatsappTl = gsap.timeline({
        scrollTrigger: {
          trigger: completionCard,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      whatsappTl
        .fromTo(completionCard, 
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        )
        .fromTo(completionCard.querySelector(".w-16"), 
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.5)" },
          "-=0.6"
        )
        .fromTo([completionCard.querySelector("h2"), completionCard.querySelector("p")], 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 },
          "-=0.5"
        )
        .fromTo("#whatsapp-btn", 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
          "-=0.4"
        );
    }
  } else {
    // Fallback if ScrollTrigger fails
    document.querySelectorAll(".gsap-reveal").forEach(el => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }
}

/**
 * Interactive Parallax Background Glows based on cursor positions
 */
function initParallaxGlows() {
  if (typeof gsap === "undefined" || window.innerWidth < 1024) return;

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 45; // Max 45px shift
    const y = (e.clientY / window.innerHeight - 0.5) * 45;

    gsap.to(".glow-spot-blue", { x: x, y: y, duration: 2.2, ease: "power2.out" });
    gsap.to(".glow-spot-purple", { x: -x, y: -y, duration: 2.2, ease: "power2.out" });
  });
}

/**
 * Interactive Cursor Spotlight Glow following mouse movement
 */
function initCursorGlow() {
  const cursorGlow = document.querySelector(".cursor-glow");
  if (!cursorGlow || typeof gsap === "undefined") return;

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursorGlow, {
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });
    
    if (cursorGlow.style.opacity === "" || cursorGlow.style.opacity === "0") {
      gsap.to(cursorGlow, { opacity: 1, duration: 0.5 });
    }
  });

  document.addEventListener("mouseleave", () => {
    gsap.to(cursorGlow, { opacity: 0, duration: 0.5 });
  });

  document.addEventListener("mouseenter", () => {
    gsap.to(cursorGlow, { opacity: 1, duration: 0.5 });
  });
}

/**
 * Premium Intro Preloader progress loader
 */
function runPremiumPreloader(onCompleteCallback) {
  const preloader = document.getElementById("preloader");
  if (!preloader) {
    onCompleteCallback();
    return;
  }

  if (typeof gsap === "undefined") {
    preloader.remove();
    document.body.classList.remove("overflow-hidden");
    onCompleteCallback();
    return;
  }

  // Set initial preloader element coordinates
  gsap.set(".preloader-brand", { opacity: 0, scale: 0.9, y: 10 });
  gsap.set(".preloader-progress", { width: "0%" });

  const tl = gsap.timeline({
    onComplete: () => {
      // Remove preloader & restore scrolling
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          preloader.remove();
          document.body.classList.remove("overflow-hidden");
          onCompleteCallback();
        }
      });
    }
  });

  tl.to(".preloader-brand", { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" })
    .to(".preloader-progress", { width: "100%", duration: 1.4, ease: "power1.inOut" }, "-=0.4")
    .to(".preloader-brand", { opacity: 0, scale: 1.05, y: -20, duration: 0.4, ease: "power3.in" }, "+=0.1")
    .to(preloader, { y: "-100%", duration: 0.9, ease: "power4.inOut" }, "-=0.2");
}
