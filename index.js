document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const toast = $("#toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  // Menú móvil
  $("#menuToggle")?.addEventListener("click", () => {
    const nav = $(".main-nav");
    const opened = nav.classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(opened));
  });
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => $(".main-nav")?.classList.remove("open"));
  });

  // Tema claro/oscuro
  const savedTheme = localStorage.getItem("webverse-theme");
  if (savedTheme === "light") document.body.classList.add("light-theme");
  $("#themeToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("webverse-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  });

  // Música: el navegador puede bloquear autoplay con sonido.
  const audio = $("#backgroundMusic");
  const musicButton = $("#musicToggle");
  const musicStatus = $("#musicStatus");
  const volume = $("#musicVolume");
  if (audio) {
    audio.volume = Number(volume?.value ?? 0.35);
    audio.muted = true;
    audio.play().then(() => {
      if (musicStatus) musicStatus.textContent = "Reproducción iniciada en silencio; activa el sonido cuando quieras.";
      if (musicButton) musicButton.textContent = "♫ Activar sonido";
    }).catch(() => {
      if (musicStatus) musicStatus.textContent = "Presiona reproducir para escuchar tu canción.";
    });
    audio.addEventListener("error", () => {
      if (musicStatus) musicStatus.textContent = "Coloca tu archivo como audio/cancion.mp3";
    });
    musicButton?.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          audio.muted = false;
          await audio.play();
          musicButton.textContent = "Ⅱ Pausar";
          if (musicStatus) musicStatus.textContent = "Reproduciendo tu canción ♡";
        } else if (audio.muted) {
          audio.muted = false;
          musicButton.textContent = "Ⅱ Pausar";
          if (musicStatus) musicStatus.textContent = "Sonido activado ♡";
        } else {
          audio.pause();
          musicButton.textContent = "▶ Reproducir";
          if (musicStatus) musicStatus.textContent = "Música en pausa";
        }
      } catch {
        showToast("No se pudo reproducir. Revisa que audio/cancion.mp3 exista.");
      }
    });
    volume?.addEventListener("input", () => {
      audio.volume = Number(volume.value);
      if (audio.volume > 0 && !audio.paused) audio.muted = false;
    });
  }

  // Frases variables de bienvenida en la consola.
  const messages = [
    "Cada línea de código puede convertirse en una idea extraordinaria. 💜",
    "Equivocarse también forma parte de programar.",
    "Sigue creando: todavía hay muchísimas cosas por descubrir.",
    "Tu imaginación es el primer lenguaje de programación."
  ];
  console.log("%cWEBVERSE", "color:#a985ff;font-size:24px;font-weight:bold");
  console.log(messages[Math.floor(Math.random() * messages.length)]);

  // Laboratorio del corazón: ejemplos visibles y ejecución real de JS.
  const snippets = {
    javascript: `const programo = true;\n\nif (programo) {\n  console.log("Corazón feliz 💜");\n}`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  bool programo = true;\n  if (programo) {\n    cout << "Corazón feliz";\n  }\n  return 0;\n}`,
    java: `public class Corazon {\n  public static void main(String[] args) {\n    boolean programo = true;\n    if (programo) {\n      System.out.println("Corazón feliz 💜");\n    }\n  }\n}`,
    pseint: `Algoritmo CorazonFeliz\n  Definir programo Como Logico\n  programo <- Verdadero\n  Si programo Entonces\n    Escribir "Corazón feliz 💜"\n  FinSi\nFinAlgoritmo`,
    html: `<button onclick="mostrarFelicidad()">Programar 💜</button>\n<p id="resultado"></p>\n<script>\nfunction mostrarFelicidad() {\n  document.getElementById("resultado").textContent = "Corazón feliz 💜";\n}\n</script>`
  };
  let currentLanguage = "javascript";
  const codeBox = $("#heartCode");
  document.querySelectorAll(".code-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".code-tab").forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      currentLanguage = tab.dataset.language;
      if (codeBox) codeBox.textContent = snippets[currentLanguage];
      $("#heartOutput").textContent = "Esperando ejecución...";
    });
  });
  $("#runHeartCode")?.addEventListener("click", () => {
    const output = $("#heartOutput");
    if (currentLanguage === "javascript") {
      const programo = true;
      if (programo) output.textContent = "Corazón feliz 💜";
    } else {
      output.textContent = "Corazón feliz 💜 (resultado esperado)";
    }
  });

  // Easter egg de los grillos.
  const dialog = $("#cricketDialog");
  $("#cricketButton")?.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else showToast("¡Hola, grillos! 🦗");
  });
  $("#closeCricket")?.addEventListener("click", () => dialog.close());
  $("#secretOkay")?.addEventListener("click", () => {
    dialog.close();
    showToast("Recuerdo guardado en WEBVERSE. 💜");
  });
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});
