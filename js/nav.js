const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = form.querySelector(".form-success");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          form.reset();
          if (success) success.hidden = false;
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(() => alert("Something went wrong. Please try again."));
  });
}
