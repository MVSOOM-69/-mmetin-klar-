const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");


// Mobile menu
menuToggle?.addEventListener("click", () => {

  const isOpen =
    mainNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


// Close mobile menu after clicking a link
document
  .querySelectorAll("#mainNav a")
  .forEach(link => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


// Important announcement close button
const closeAlert =
  document.getElementById("closeAlert");

const topAlert =
  document.getElementById("topAlert");

closeAlert?.addEventListener("click", () => {

  topAlert.remove();

});


// Scroll reveal animations
const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {

    observer.observe(element);

  });

} else {

  revealElements.forEach(element => {

    element.classList.add("visible");

  });

}