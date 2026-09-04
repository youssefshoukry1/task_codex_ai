"use client";

import { useEffect, useState } from "react";

const TEMPLATE_PATH = "/personal-portfolio.html";

const menuItems = [
  ["01", "Startseite", "#home"],
  ["02", "Herzsprache® für Firmen", "#services"],
  ["03", "Einzelberatung mit Herz", "#services"],
  ["04", "Vorträge über Herzsprache®", "#services"],
  ["05", "TV Auftritte – Sendungen", "#services"],
  ["06", "Ziele & Arbeitsweise", "#about"],
  ["07", "Seminarraum Diesel8", "#seminarraum"],
  ["08", "Newsletter", "#newsletter"],
  ["09", "TV Auftritte / Kontakt", "#contact"],
];

const serviceItems = [
  ["Herzsprache® für Firmen", "Maßgeschneiderte Impulse für mehr Kundenzufriedenheit und die Gewinnung neuer Kundinnen und Kunden.", ["Kundenzufriedenheit", "Neukunden", "Teams", "Wirkung"]],
  ["Einzelberatung mit Herz", "Persönliche Beratung für Führungskräfte, Unternehmerinnen und Unternehmer sowie Menschen im beruflichen Wandel.", ["Führung", "Berufung", "Klarheit", "Entwicklung"]],
  ["Vorträge über Herzsprache®", "Wissenschaftlich fundierte, praxisnahe Vorträge für bewusstes Denken und wirkungsvolle Kommunikation.", ["Wissen", "Kommunikation", "Praxis", "Inspiration"]],
  ["TV Auftritte – Sendungen", "Erleben Sie Britta Marbs in Medienauftritten – unter anderem mit wöchentlichen Markteinschätzungen im NDR.", ["NDR", "Medien", "Markteinschätzung", "Präsenz"]],
];

const serviceImages = [
  "/img/services/service-1.webp",
  "/img/services/service-2.webp",
  "/img/services/service-3.webp",
  "/img/services/service-4.webp",
];

const journeyItems = [
  ["Kompetenzen erweitern", "Praxisnahe Trainings", "Trainingsziel"],
  ["Wirkungsvoll kommunizieren", "Bewusst und klar", "Trainingsziel"],
  ["Mitarbeitende motivieren", "Vertrauen fördern", "Trainingsziel"],
  ["Leadership 4.0", "Zukunftsfähig führen", "Trainingsziel"],
  ["Wirtschaft & Wirkung", "Zusammenhänge verstehen", "Arbeitsweise"],
  ["Motivationswissenschaft", "Erkenntnisse wirksam anwenden", "Arbeitsweise"],
  ["Interaktive Formate", "Vor Ort und online", "Arbeitsweise"],
  ["Individuelle Umsetzung", "Passend zu Ihrem Alltag", "Arbeitsweise"],
];

const journeyImages = {
  "Kompetenzen erweitern": "/img/services3/Kompetenzen erweitern.webp",
  "Wirkungsvoll kommunizieren": "/img/services3/Wirkungsvoll kommunizieren.webp",
  "Mitarbeitende motivieren": "/img/services3/Mitarbeitende motivieren.webp",
  "Leadership 4.0": "/img/services3/Leadership 4.0.webp",
  "Wirtschaft & Wirkung": "/img/services3/Wirtschaft & Wirkung.webp",
  Motivationswissenschaft: "/img/services3/Motivationswissenschaft.webp",
  "Interaktive Formate": "/img/services3/Interaktive Formate.webp",
  "Individuelle Umsetzung": "/img/services3/Individuelle Umsetzung.webp",
};

const seminarRoomImages = [
  "/img/services4/brain.png",
  "/img/services4/clock.png",
  "/img/services4/dollar.png",
  "/img/services4/globe.png",
  "/img/services4/id-card.png",
  "/img/services4/notes.png",
];

const loaderImages = [
  "/img/sevices2/4.webp",
  "/img/sevices2/5.webp",
  "/img/sevices2/6.webp",
  "/img/sevices2/Mitarbeitermotivation.webp",
  "/img/sevices2/Einzelberatung.webp",
  "/img/sevices2/Seminarraum_Diesel8.webp",
];

function loadScript(source) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = source;
    script.async = false;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Unable to load ${source}`));
    document.body.appendChild(script);
  });
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function setLink(element, label, href) {
  if (!element) return;
  element.href = href;
  setText(element, label);
}

function makeLink(document, label, href, className = "") {
  const link = document.createElement("a");
  link.href = href;
  link.className = className;
  const text = document.createElement("span");
  text.className = "mxd-scramble";
  text.textContent = label;
  link.append(text);
  return link;
}

function replaceList(document, list, entries, className = "") {
  if (!list) return;
  list.replaceChildren(...entries.map(([label, href]) => {
    const item = document.createElement("li");
    item.append(makeLink(document, label, href, className));
    return item;
  }));
}

function populateTemplate(template) {
  const all = (selector, root = template) => [...root.querySelectorAll(selector)];
  const one = (selector, root = template) => root.querySelector(selector);

  template.documentElement.lang = "de";
  template.title = "Herzsprache® by Britta Marbs";

  all(".menu-logo, .mxd-logo").forEach((logo) => {
    logo.href = "#home";
    const parts = all("span", logo);
    setText(parts[0], "HERZSPRACHE®");
    setText(parts[1], "BY BRITTA MARBS");
  });
  all(".mxd-loader__images img").forEach((image, index) => {
    image.src = loaderImages[index % loaderImages.length];
    image.alt = "Herzsprache®";
  });
  const menuCaption = one(".mxd-menu__caption p");
  if (menuCaption) menuCaption.innerHTML = "Von Mensch zu Mensch<br>mit Herzsprache®";

  const mainMenu = one("#main-menu");
  const menuTemplate = one(".main-menu__item", mainMenu)?.cloneNode(true);
  if (mainMenu && menuTemplate) {
    mainMenu.replaceChildren(...menuItems.map(([number, label, href]) => {
      const item = menuTemplate.cloneNode(true);
      one(".submenu", item)?.remove();
      const toggle = one(".main-menu__toggle", item);
      const link = template.createElement("a");
      link.className = "main-menu__link";
      link.href = href;
      link.innerHTML = `<span class="main-menu__number">/ ${number}</span><span class="main-menu__caption"></span>`;
      setText(one(".main-menu__caption", link), label);
      toggle.replaceChildren(link);
      return item;
    }));
  }

  const menuContacts = all(".menu-contact__list");
  replaceList(template, menuContacts[0], [["info@herzsprache.net", "mailto:info@herzsprache.net"], ["+49 (0) 40 22 60 24 27", "tel:+494022602427"], ["+49 (0) 172 56 10 587", "tel:+491725610587"]], "tag tag-m");
  replaceList(template, menuContacts[1], [["Postfach 1116, 21361 Adendorf", "#contact"]], "tag tag-m");
  replaceList(template, menuContacts[2], [["Twitter", "https://twitter.com/"], ["Facebook", "https://facebook.com/"]], "tag tag-m");
  setText(one(".menu-data__left .menu-data__text"), "Herzsprache® by Britta Marbs");
  const menuData = all(".menu-data__right .menu-data__text");
  setText(menuData[0], "Herzsprache® Akademie");
  setText(menuData[1], "©2026");

  const headerLink = one(".mxd-header__link");
  if (headerLink) {
    headerLink.href = "#contact";
    headerLink.ariaLabel = "Kontakt";
    setText(one(".btn-caption", headerLink), "Kontakt");
  }

  const pageContent = one("#mxd-page-content");
  if (pageContent) pageContent.id = "home";
  const heroTitle = one(".hero-10-headline__content");
  if (heroTitle) {
    heroTitle.href = "#about";
    heroTitle.dataset.cursorText = "Mehr erfahren";
    setText(one(".loading-chars", heroTitle), "Britta Marbs");
  }
  setText(one(".mxd-hero__mark .mark-text"), "Neu in Adendorf: Diesel8");
  setText(one(".mxd-hero-10__descr p"), "Bundesweite Expertin für Business Coaching, Teamentwicklung und die Gestaltung eines guten Arbeitsumfelds.");
  const heroBooking = one(".mxd-hero-10__video-btn a");
  if (heroBooking) {
    heroBooking.href = "#seminarraum";
    setText(one(".btn-caption", heroBooking), "JETZT BUCHEN");
  }
  setLink(one(".hero-10-video__name a"), "Diesel8", "#seminarraum");
  const heroVenue = one(".mxd-hero-10__media");
  heroVenue?.removeAttribute("id");
  ["Seminarraum", "Konferenz", "Adendorf"].forEach((tag, index) => setText(all(".hero-10-video__tags span")[index], tag));
  replaceList(template, one(".mxd-hero-10__socials ul"), [["Twitter", "https://twitter.com/"], ["Facebook", "https://facebook.com/"]], "mxd-socials-line__link");
  const exploreLink = one(".mxd-hero-10__controls a");
  if (exploreLink) {
    exploreLink.href = "#services";
    setText(one(".btn-caption", exploreLink), "Leistungen entdecken");
  }
  const heroDivider = one(".divider-image-10");
  if (heroDivider) {
    heroDivider.classList.add("responsive-divider-image");
    const image = template.createElement("img");
    image.className = "parallax-img";
    image.src = "/img/sevices2/4.webp";
    image.alt = "Herzsprache®";
    heroDivider.replaceChildren(image);
  }

  const philosophy = one(".mxd-stats-lines")?.closest(".mxd-section");
  if (philosophy) {
    philosophy.id = "herzsprache";
    setText(one(".title-number", philosophy), "P/01");
    const manifest = one(".manifest", philosophy);
    if (manifest) {
      manifest.href = "#herzsprache";
      manifest.dataset.cursorText = "Herzsprache®";
      setText(manifest, "Von Mensch zu Mensch. Herzsprache® stellt Menschen – Kundinnen, Kunden und Mitarbeitende – vor den Profit. So wachsen Service, Verbundenheit und Teamproduktivität nachhaltig.");
    }
    [["01", "Menschen vor Profit"], ["02", "Herzsprache® im Alltag"], ["03", "Besserer Kundenservice"], ["04", "Stärkere Teams"]].forEach(([number, label], index) => {
      const item = all(".mxd-stats-lines__item", philosophy)[index];
      setText(one(".mxd-stats-lines__number p", item), number);
      setText(one(".mxd-stats-lines__caption p", item), label);
    });
  }

  // Keep only the requested promotional components from the portfolio template.
  one("#works")?.remove();
  const promotions = one(".mxd-dv-sticky-img")?.closest(".mxd-section");
  if (promotions) {
    promotions.id = "promotions";
    const promotionTitles = [
      "Mitarbeitermotivation",
      "Einzelberatung",
      "Seminarraum_Diesel8",
    ];
    all(".mxd-dv-sticky-img__titleitem h2", promotions).forEach((title, index) => {
      setText(title, promotionTitles[index]);
    });
    const promotionImages = [
      "/img/sevices2/Mitarbeitermotivation.webp",
      "/img/sevices2/Einzelberatung.webp",
      "/img/sevices2/Seminarraum_Diesel8.webp",
    ];
    all(".images__img", promotions).forEach((image, index) => {
      image.src = promotionImages[index];
      image.alt = promotionTitles[index];
    });
    const promotionButton = one(".mxd-dv-sticky-img__btnholder a", promotions);
    if (promotionButton) {
      promotionButton.href = "#services";
      setText(one(".btn-caption", promotionButton), "Leistungen entdecken");
    }
  }
  const sections = all(".mxd-section");
  const philosophyIndex = sections.indexOf(philosophy);
  const dividerBeforePhilosophy = sections[philosophyIndex - 1];
  if (dividerBeforePhilosophy?.querySelector(".mxd-divider")) {
    dividerBeforePhilosophy.remove();
  }

  const servicesList = one(".mxd-cpb-list");
  const services = servicesList?.closest(".mxd-section");
  if (servicesList && services) {
    services.id = "services";
    setText(one(".title-number", services), "L/02");
    const headingLink = one(".mxd-section-title__title a", services);
    if (headingLink) {
      headingLink.href = "#services";
      headingLink.dataset.cursorText = "Leistungen";
      setText(one("h2", headingLink), "Leistungen mit Herz");
    }
    const cards = all(".mxd-cpb-list__item", servicesList);
    while (cards.length < serviceItems.length) {
      const card = cards.at(-1).cloneNode(true);
      servicesList.append(card);
      cards.push(card);
    }
    cards.forEach((card, index) => {
      const [title, description, tags] = serviceItems[index];
      const image = one(".mxd-cpb-list__image img", card);
      setText(one(".mxd-cpb-list__number .meta-tag", card), `[0${index + 1}]`);
      setText(one(".mxd-cpb-list__name", card), title);
      setText(one(".mxd-cpb-list__descr p", card), description);
      all(".mxd-cpb-list__meta .meta-tag", card).forEach((tag, tagIndex) => setText(tag, tags[tagIndex % tags.length]));
      if (image) {
        image.src = serviceImages[index];
        image.alt = title;
      }
    });
  }

  const servicesDivider = one(".divider-image-4");
  if (servicesDivider) {
    servicesDivider.classList.add("responsive-divider-image");
    const image = template.createElement("img");
    image.className = "parallax-img";
    image.src = "/img/sevices2/6.webp";
    image.alt = "Herzsprache® Leistungen";
    servicesDivider.replaceChildren(image);
  }

  const about = one(".mxd-resume")?.closest(".mxd-section");
  if (about) {
    about.id = "about";
    setText(one(".title-number", about), "Z/03");
    const aboutHeading = one(".mxd-section-title__title a", about);
    if (aboutHeading) {
      aboutHeading.href = "#about";
      aboutHeading.dataset.cursorText = "Arbeitsweise";
      setText(one("h2", aboutHeading), "Ziele & Arbeitsweise");
    }
    const aboutIntro = one(".mxd-section-info__descr a", about);
    if (aboutIntro) {
      aboutIntro.href = "#about";
      aboutIntro.dataset.cursorText = "Herzsprache®";
      setText(aboutIntro, "Britta Marbs verbindet wirtschaftliches Denken, Motivationswissenschaft und interaktive Formate – persönlich vor Ort und online.");
    }
    ["[01] Trainingsziele", "[02] Arbeitsweise"].forEach((tag, index) => setText(all(".mxd-section-subtitle .meta-tag", about)[index], tag));
    all(".mxd-resume__item", about).forEach((item, index) => {
      const [title, partner, type] = journeyItems[index] || journeyItems.at(-1);
      const image = one(".mxd-resume__image img", item);
      setText(one(".mxd-resume__title p", item), title);
      if (image) {
        image.src = journeyImages[title];
        image.alt = title;
      }
      const partnerLink = one(".mxd-resume__link a", item);
      if (partnerLink) {
        partnerLink.href = "#about";
        setText(partnerLink, partner);
        one(".mxd-resume__link p", item)?.replaceChildren(partnerLink);
      }
      setText(one(".mxd-resume__date p", item), type);
    });
    all(".mxd-section-subtitle", about).at(-1)?.closest(".mxd-block")?.remove();
    one(".mxd-toolbox", about)?.closest(".mxd-block")?.remove();
  }

  const news = one(".mxd-blog-grid")?.closest(".mxd-section");
  news?.remove();

  const seminarRoom = one(".mxd-promo")?.closest(".mxd-section");
  if (seminarRoom) {
    seminarRoom.id = "seminarraum";
    const booking = one(".mxd-promo__btngroup a", seminarRoom);
    if (booking) {
      booking.href = "#contact";
      setText(one(".btn-caption", booking), "JETZT BUCHEN");
    }
    const seminarTitle = one(".mxd-promo__caption a", seminarRoom);
    if (seminarTitle) {
      seminarTitle.href = "#contact";
      seminarTitle.dataset.cursorText = "Jetzt buchen";
      setText(one("h2", seminarTitle), "Diesel8 in Adendorf buchen");
    }
    ["Herz", "Team", "Raum", "Ideen", "Seminar", "Begegnung"].forEach((word, index) => {
      setText(all(".object-type p", seminarRoom)[index], word);
    });
    all(".object-image img", seminarRoom).forEach((image, index) => {
      image.src = seminarRoomImages[index];
      image.alt = "Herzsprache® Seminarraum";
    });
  }

  const footer = one("#mxd-footer");
  if (footer) {
    footer.id = "contact";
    replaceList(template, one(".footer-nav-v01", footer), [["Startseite", "#home"], ["Sitemap", "#sitemap"], ["Datenschutz", "#datenschutz"], ["AGB", "#agb"], ["Newsletter", "#newsletter"]], "anim-uni-slide-down");
    const footerData = all(".footer-blocks__data", footer);
    const contactData = footerData[0];
    if (contactData) {
      const paragraphs = all(".footer-data", contactData);
      setLink(one("a", paragraphs[0]), "info@herzsprache.net", "mailto:info@herzsprache.net");
      setLink(one("a", paragraphs[1]), "+49 (0) 40 22 60 24 27", "tel:+494022602427");
      setText(one("span", paragraphs[2]), "Mobil +49 (0) 172 56 10 587 · Adendorf");
    }
    const legalData = footerData[1];
    if (legalData) {
      const paragraphs = all(".footer-data", legalData);
      setText(one("span", paragraphs[0]), "©2026");
      setText(one("span", paragraphs[1]), "Herzsprache® by Britta Marbs");
      setText(one("span", paragraphs[2]), "Von Mensch zu Mensch");
    }
    setText(one(".fw-mark__content span", footer), "Herzsprache®");
    const newsletterTarget = one(".footer-blocks__socials", footer);
    if (newsletterTarget) newsletterTarget.id = "newsletter";
    replaceList(template, one(".footer-blocks__socials ul", footer), [["Twitter", "https://twitter.com/"], ["Facebook", "https://facebook.com/"]], "mxd-socials-line__link");
    setText(one("#to-top .btn-caption", footer), "Nach oben");
  }

  all('img[alt*="Azurio"]').forEach((image) => {
    image.alt = "Herzsprache®";
  });

  all('a[href$=".html"]').forEach((link) => {
    link.href = link.closest(".mxd-project-item") ? "#services" : "#home";
  });

  return template.body.innerHTML;
}

export default function Home() {
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    let isActive = true;
    fetch(TEMPLATE_PATH)
      .then((response) => {
        if (!response.ok) throw new Error("Portfolio template could not be loaded.");
        return response.text();
      })
      .then((html) => {
        if (!isActive) return;
        const template = new DOMParser().parseFromString(html, "text/html");
        template.querySelectorAll("script").forEach((script) => script.remove());
        setMarkup(populateTemplate(template));
      })
      .catch((error) => console.error(error));

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!markup || window.__azurioPortfolioInitialized) return;
    window.__azurioPortfolioInitialized = true;
    loadScript("/js/libs.min.js")
      .then(() => loadScript("/js/app.js"))
      .then(() => document.dispatchEvent(new Event("DOMContentLoaded")))
      .catch((error) => console.error(error));
  }, [markup]);

  return <div className="azurio-portfolio" dangerouslySetInnerHTML={{ __html: markup }} suppressHydrationWarning />;
}
