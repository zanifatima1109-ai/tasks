/* =========================================================
   Zainab Fatima Portfolio — script.js
   Vanilla JS: mobile nav, smooth scroll, active link, reveal,
   year, contact form (mailto, no backend).
   ========================================================= */

(function () {
    "use strict";

    /* ---------- Mobile nav toggle ---------- */
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu on outside click
        document.addEventListener("click", function (e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        let current = "";
        const scrollY = window.scrollY + 120;
        sections.forEach(function (sec) {
            if (scrollY >= sec.offsetTop) current = sec.getAttribute("id");
        });
        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    }
    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();

    /* ---------- Reveal on scroll ---------- */
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("visible"); });
    }

    /* ---------- Back to top ---------- */
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) backToTop.classList.add("show");
            else backToTop.classList.remove("show");
        }, { passive: true });
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Contact form -> mailto ---------- */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = (document.getElementById("name").value || "").trim();
            const email = (document.getElementById("email").value || "").trim();
            const message = (document.getElementById("message").value || "").trim();

            // Basic validation
            if (!name || !email || !message) {
                showToast("Please fill in all fields.", "error");
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast("Please enter a valid email address.", "error");
                return;
            }

            // Real contact email
            const to = "zaniejaz007@gmail.com";
            const subject = encodeURIComponent("Portfolio contact from " + name);
            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );
            window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
            showToast("Opening your email client…", "success");
            form.reset();
        });
    }

    /* ---------- Toast helper ---------- */
    function showToast(text, type) {
        const toast = document.createElement("div");
        toast.className = "toast toast-" + type;
        toast.textContent = text;
        toast.style.cssText =
            "position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);" +
            "background:" + (type === "error" ? "#ef4444" : "#22c55e") + ";" +
            "color:#fff;padding:12px 20px;border-radius:10px;font-size:0.9rem;font-weight:600;" +
            "box-shadow:0 10px 30px rgba(0,0,0,.3);opacity:0;transition:all .3s ease;z-index:9999;";
        document.body.appendChild(toast);
        requestAnimationFrame(function () {
            toast.style.opacity = "1";
            toast.style.transform = "translateX(-50%) translateY(0)";
        });
        setTimeout(function () {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(-50%) translateY(20px)";
            setTimeout(function () { toast.remove(); }, 300);
        }, 3000);
    }
})();
