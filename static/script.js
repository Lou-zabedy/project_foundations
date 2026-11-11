
document.addEventListener("DOMContentLoaded", () => {

    // 1. Animate browser tab title
    const originalTitle = document.title;
    const spacer = " ";
    const title = spacer + originalTitle + spacer;
    let position = 0;

    function animateTitle() {
        document.title = title.slice(position) + title.slice(0, position);
        position = (position + 1) % title.length;
    }

    setInterval(animateTitle, 250);

    // 2. Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Reveal projects and skills on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(
        ".project, .skills, .projects"
    ).forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });

    // 4. Interactive project cards
    document.querySelectorAll(".project").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.borderColor = "#e5b94c";
        });

        card.addEventListener("mouseleave", () => {
            card.style.borderColor = "rgba(229, 185, 76, 0.2)";
        });
    });

    // 5. Back to top
    const backToTop = document.createElement("button");

    backToTop.textContent = "↑ TOP";
    backToTop.id = "backToTop";
    backToTop.setAttribute("aria-label", "Back to top");

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    console.log("PES 2013 Football Portfolio Loaded!");
});
