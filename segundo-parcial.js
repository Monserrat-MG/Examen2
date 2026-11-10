document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, text) => { const el = $(selector); if (el) el.textContent = text; };

  // Navegación móvil
  $("#menuToggle")?.addEventListener("click", () => {
    const nav = $(".main-nav");
    const opened = nav.classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(opened));
  });
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => $(".main-nav")?.classList.remove("open"));
  });

  // Cuadros de diálogo
  $("#alertDemo")?.addEventListener("click", () => {
    alert("¡Hola! Este es un cuadro de diálogo alert().");
    setText("#dialogOutput", "Se mostró un mensaje con alert().");
  });
  $("#promptDemo")?.addEventListener("click", () => {
    const answer = prompt("¿Cómo te llamas?");
    setText("#dialogOutput", answer === null ? "Cancelaste el cuadro prompt()." : `¡Hola, ${answer}! Dato recibido con prompt().`);
  });
  $("#confirmDemo")?.addEventListener("click", () => {
    const answer = confirm("¿Te está gustando aprender JavaScript?");
    setText("#dialogOutput", answer ? "¡Qué bueno! Elegiste Aceptar." : "Elegiste Cancelar. ¡Sigue explorando!");
  });

  // Datos de formulario
  $("#nameForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#visitorName").value.trim();
    setText("#formOutput", name ? `JavaScript obtuvo este dato: ${name}` : "Escribe un nombre.");
  });

  // parseInt y parseFloat
  $("#parseIntButton")?.addEventListener("click", () => {
    const value = parseInt($("#numberInput").value, 10);
    setText("#parseOutput", Number.isNaN(value) ? "No se pudo convertir a entero (NaN)." : `parseInt() = ${value}`);
  });
  $("#parseFloatButton")?.addEventListener("click", () => {
    const value = parseFloat($("#numberInput").value);
    setText("#parseOutput", Number.isNaN(value) ? "No se pudo convertir a decimal (NaN)." : `parseFloat() = ${value}`);
  });

  // if / else
  $("#gradeButton")?.addEventListener("click", () => {
    const grade = Number($("#gradeInput").value);
    if ($("#gradeInput").value.trim() === "" || grade < 0 || grade > 10 || Number.isNaN(grade)) {
      setText("#gradeOutput", "Ingresa una calificación válida entre 0 y 10.");
    } else if (grade >= 6) {
      setText("#gradeOutput", `Con ${grade}: ¡Aprobado! 🎉`);
    } else {
      setText("#gradeOutput", `Con ${grade}: sigue practicando, tú puedes.`);
    }
  });

  // switch
  $("#dayButton")?.addEventListener("click", () => {
    let message;
    switch (Number($("#daySelect").value)) {
      case 1: message = "Lunes: comienza una nueva oportunidad."; break;
      case 2: message = "Martes: sigue avanzando."; break;
      case 3: message = "Miércoles: mitad de semana."; break;
      case 4: message = "Jueves: ya casi."; break;
      case 5: message = "Viernes: ¡lo lograste!"; break;
      case 6: message = "Sábado: tiempo para crear."; break;
      case 7: message = "Domingo: recarga energía."; break;
      default: message = "Día no reconocido.";
    }
    setText("#dayOutput", message);
  });

  // Funciones y return
  function saludar(nombre) {
    return `¡Hola, ${nombre || "programador/a"}! Sigue creando. 💜`;
  }
  $("#functionButton")?.addEventListener("click", () => {
    setText("#functionOutput", saludar($("#functionName").value.trim()));
  });

  // Métodos DOM
  $("#tagButton")?.addEventListener("click", () => {
    const card = $("#tagButton").closest(".lesson-card");
    const paragraphs = card.getElementsByTagName("p");
    setText("#tagOutput", `getElementsByTagName("p") encontró ${paragraphs.length} párrafo(s) en esta tarjeta.`);
  });
  $("#classButton")?.addEventListener("click", () => {
    const cards = document.getElementsByClassName("lesson-card");
    setText("#classOutput", `getElementsByClassName("lesson-card") encontró ${cards.length} tarjetas.`);
  });
  $("#queryButton")?.addEventListener("click", () => {
    const title = document.querySelector("#dom .section-heading h2");
    title.textContent = "¡El DOM acaba de cambiar este título!";
    title.style.color = "#c5a3ff";
  });
  $("#queryAllButton")?.addEventListener("click", () => {
    const buttons = document.querySelectorAll(".demo-button");
    setText("#queryAllOutput", `querySelectorAll(".demo-button") encontró ${buttons.length} botones.`);
  });
  const originalDomText = "Este texto será modificado desde JavaScript utilizando el DOM.";
  $("#changeDomButton")?.addEventListener("click", () => {
    const value = $("#domTextInput").value.trim();
    $("#domMessage").textContent = value || "Escribe algo en el campo para modificar este texto.";
  });
  $("#resetDomButton")?.addEventListener("click", () => {
    $("#domMessage").textContent = originalDomText;
    $("#domTextInput").value = "";
  });

  // Local Storage
  const memoryKey = "webverse-recuerdo";
  $("#saveMemory")?.addEventListener("click", () => {
    const value = $("#memoryInput").value.trim();
    if (!value) { setText("#memoryOutput", "Escribe un mensaje antes de guardarlo."); return; }
    localStorage.setItem(memoryKey, value);
    setText("#memoryOutput", "Guardado correctamente en este navegador. 💜");
  });
  $("#loadMemory")?.addEventListener("click", () => {
    const value = localStorage.getItem(memoryKey);
    setText("#memoryOutput", value ? `Recuperado: ${value}` : "Todavía no hay ningún mensaje guardado.");
  });
  $("#deleteMemory")?.addEventListener("click", () => {
    localStorage.removeItem(memoryKey);
    setText("#memoryOutput", "El dato se eliminó del Local Storage.");
  });
});
