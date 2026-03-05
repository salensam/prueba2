(function () {
  "use strict";

  /* =========================
     CONEXIÓN A SUPABASE
     ========================= */
  const SUPABASE_URL = "https://ghuwapdmjqeiejtqimwm.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodXdhcGRtanFlaWVqdHFpbXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NzgwODAsImV4cCI6MjA4ODI1NDA4MH0.D3mpNkICGTjHIWf18X9mhDpPB3jx9cAo5xz51hVaO3Y";

  let supabase = null;
  if (typeof window !== "undefined" && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  /* =========================
     FORMULARIO Y POPUP
     ========================= */
  function initMessageForm() {
    const form = document.getElementById("message-form");
    const popup = document.getElementById("message-popup");
    const popupClose = document.getElementById("message-popup-close");

    function showSuccessPopup() {
      if (popup) {
        popup.classList.add("show");
        popup.setAttribute("aria-hidden", "false");
      }
    }

    function hideSuccessPopup() {
      if (popup) {
        popup.classList.remove("show");
        popup.setAttribute("aria-hidden", "true");
      }
    }

    if (popupClose) {
      popupClose.addEventListener("click", hideSuccessPopup);
    }
    if (popup) {
      popup.addEventListener("click", function (e) {
        if (e.target === popup) hideSuccessPopup();
      });
    }

    if (form && supabase) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombreEl = document.getElementById("nombre");
        const mensajeEl = document.getElementById("mensaje");
        const nombre = nombreEl ? nombreEl.value.trim() : "";
        const mensaje = mensajeEl ? mensajeEl.value.trim() : "";

        if (!mensaje) {
          alert("Escribe un mensaje");
          return;
        }

        showSuccessPopup();

        try {
          const { data, error } = await supabase
            .from("Prueba2")
            .insert([
              {
                nombre: nombre || null,
                mensaje: mensaje
              }
            ]);

          if (error) {
            hideSuccessPopup();
            console.error(error);
            alert("Error al enviar el mensaje");
          } else {
            form.reset();
          }
        } catch (err) {
          hideSuccessPopup();
          console.error(err);
          alert("Error al enviar el mensaje");
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMessageForm);
  } else {
    initMessageForm();
  }
})();
