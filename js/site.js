/* Mobile navigation and the contact mailto handoff.
   The form never posts to a server. */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var label = toggle ? toggle.querySelector(".nav-toggle-label") : null;

  function setOpen(open) {
    if (!toggle || !nav) {
      return;
    }
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    if (label) {
      label.textContent = open ? "Close" : "Menu";
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 860px)").matches) {
        setOpen(false);
      }
    });
  }

  var form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  var planField = form.elements.namedItem("plan");
  var planNote = document.getElementById("plan-note");
  var names = { starter: "Starter", growth: "Growth", business: "Business" };
  var params = new URLSearchParams(window.location.search);
  var plan = (params.get("plan") || "").toLowerCase();

  if (planField && names[plan]) {
    planField.value = names[plan];
    if (planNote) {
      planNote.hidden = false;
      planNote.textContent =
        "You are asking about the " +
        names[plan] +
        " tier. The price shown for it is an example, not a quote.";
    }
  }

  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (typeof form.reportValidity === "function" && !form.reportValidity()) {
      return;
    }

    var name = fieldValue("name");
    var email = fieldValue("email");
    var company = fieldValue("company");
    var website = fieldValue("website");
    var chosen = fieldValue("plan");
    var message = fieldValue("message");
    var subject = "ListenUp walkthrough";

    if (company) {
      subject += " - " + company;
    } else if (name) {
      subject += " - " + name;
    }

    var lines = [
      "Name: " + name,
      "Work email: " + email,
      "Company: " + (company || "(not given)"),
      "Website: " + (website || "(not given)"),
      "Plan of interest: " + (chosen || "(not given)"),
      "",
      message
    ];

    if (status) {
      status.textContent =
        "Your email app should open with a message to hello@listenuptestimonials.com. If it does not, copy your note and send it to that address yourself. This page does not store or send the form.";
    }

    window.location.href =
      "mailto:hello@listenuptestimonials.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));
  });

  function fieldValue(name) {
    var field = form.elements.namedItem(name);
    if (!field || !("value" in field)) {
      return "";
    }
    return String(field.value).trim();
  }
})();
