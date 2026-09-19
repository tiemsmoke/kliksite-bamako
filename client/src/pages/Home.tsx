import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  Menu,
  MessageCircle,
  MousePointer2,
  PanelTop,
  Plane,
  ScanLine,
  Send,
  Sparkles,
  X,
} from "lucide-react";

const whatsappNumber = "22392780508";
const whatsappLink = `https://wa.me/${whatsappNumber}`;

const sectors = [
  {
    number: "01",
    title: "Restauration rapide",
    description: "Transformez les recherches locales en commandes.",
    image: "assets/kliksite-food.webp",
    href: "https://snack-eclair-bamako.netlify.app",
    className: "sector-card sector-card-wide",
    objectPosition: "center 46%",
  },
  {
    number: "02",
    title: "Salon de beauté",
    description: "Présentez vos services et simplifiez les réservations.",
    image: "assets/kliksite-beauty.webp",
    href: "https://sublime-coiffure-bamako.netlify.app",
    className: "sector-card",
    objectPosition: "center 48%",
  },
  {
    number: "03",
    title: "Immobilier",
    description: "Donnez à vos biens l'image qu'ils méritent.",
    image: "assets/kliksite-realestate.webp",
    href: "https://bamako-immo.netlify.app",
    className: "sector-card sector-card-tall",
    objectPosition: "center 54%",
  },
  {
    number: "04",
    title: "Transit et logistique",
    description: "Présentez clairement vos services et facilitez les demandes.",
    image: "assets/kliksite-logistics.webp",
    href: "https://sahel-transit-bamako.netlify.app",
    className: "sector-card sector-card-wide",
    objectPosition: "center 52%",
  },
];

const demos = [
  { name: "Snack Éclair", type: "Restauration", href: "https://snack-eclair-bamako.netlify.app", accent: "orange" },
  { name: "Sublime Coiffure", type: "Beauté", href: "https://sublime-coiffure-bamako.netlify.app", accent: "blue" },
  { name: "Bamako Voyages", type: "Voyage", href: "https://bamako-voyages.netlify.app", accent: "navy" },
  { name: "Bamako Immo", type: "Immobilier", href: "https://bamako-immo.netlify.app", accent: "orange" },
  { name: "Sahel Transit", type: "Transit", href: "https://sahel-transit-bamako.netlify.app", accent: "blue" },
  { name: "Sira BTP", type: "Bâtiment", href: "https://sira-btp-bamako.netlify.app", accent: "navy" },
];

const plans = [
  {
    name: "Starter",
    price: "20 000",
    suffix: "FCFA",
    intro: "Pour lancer rapidement une présence professionnelle.",
    features: ["1 page vitrine", "Commande ou réservation vers WhatsApp", "Optimisation Google", "Jusqu'à 6 photos", "1 tour de retouches", "Livraison 24-48h"],
    cta: "Choisir Starter",
  },
  {
    name: "Standard",
    price: "35 000-50 000",
    suffix: "FCFA",
    intro: "Pour une entreprise qui veut une présence plus complète.",
    features: ["Tout le Starter", "3-4 sections", "Design sur mesure", "Domaine personnalisé inclus", "Statistiques de visite", "Fiche Google Business incluse", "Jusqu'à 15 photos", "2 tours de retouches", "Livraison 48-72h"],
    cta: "Choisir Standard",
    featured: true,
  },
  {
    name: "Premium",
    price: "60 000",
    suffix: "FCFA et plus",
    intro: "Pour une entreprise qui veut un véritable outil commercial digital.",
    features: ["Tout le Standard", "5+ sections ou multi-pages", "Animations avancées", "Plusieurs formulaires", "WhatsApp Business organisé", "Page Actualités", "Email professionnel en option", "Photos illimitées", "3 tours de retouches", "Livraison 3-5 jours"],
    cta: "Choisir Premium",
  },
];

const faqs = [
  { question: "Je n'ai pas encore de logo ni de photos. Est-ce un problème ?", answer: "Non. Nous pouvons démarrer avec ce que vous avez et vous guider sur les éléments à préparer. L'objectif est de vous montrer une première direction rapidement, sans vous bloquer." },
  { question: "Comment fonctionne la démo gratuite ?", answer: "Vous nous écrivez sur WhatsApp avec votre activité. Nous préparons une première idée de site adaptée à votre entreprise. Vous voyez le résultat avant de décider d'aller plus loin." },
  { question: "Le site sera-t-il visible sur Google ?", answer: "Oui. Chaque formule comprend une base claire pour la visibilité locale. Les formules Standard et Premium incluent en plus la fiche Google Business ou des optimisations plus poussées." },
  { question: "Est-ce que je peux modifier le site plus tard ?", answer: "Oui. Nous gardons une base propre et pouvons faire évoluer le site avec de nouvelles sections, photos, offres ou pages lorsque votre activité grandit." },
  { question: "Quels sont les délais de livraison ?", answer: "Starter est généralement livré sous 24 à 48 heures. Standard demande 48 à 72 heures. Premium est livré sous 3 à 5 jours selon le contenu et le niveau de personnalisation." },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`brand-mark ${light ? "brand-mark-light" : ""}`} aria-label="KlikSite, retour en haut">
      <span className="brand-icon"><img src="assets/kliksite-logo.png" alt="" /></span>
      <span className="brand-name">Klik<span>Site</span></span>
    </a>
  );
}

function WhatsAppButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <a className={`button button-primary ${className}`} href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      <MessageCircle size={17} strokeWidth={2.1} />
      <span>{children}</span>
    </a>
  );
}

function TravelVisual() {
  return (
    <div className="travel-visual" aria-hidden="true">
      <div className="route route-one" />
      <div className="route route-two" />
      <div className="travel-orb"><Plane size={31} strokeWidth={1.55} /></div>
    <div className="travel-info"><span>Destination</span><strong>Bamako</strong><small>Votre prochain départ</small></div>
      <div className="travel-pin pin-one" />
      <div className="travel-pin pin-two" />
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const activity = String(data.get("activity") ?? "");
    const message = `Bonjour KlikSite, je m'appelle ${name}. Mon activité est : ${activity}. Je souhaite recevoir ma démo gratuite.`;
    window.open(`${whatsappLink}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormSent(true);
  };

  return (
    <div className="site-shell" id="top">
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navigation principale">
            <a href="#secteurs">Nos secteurs</a>
            <a href="#formules">Nos formules</a>
            <a href="#methode">Comment ça marche</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <WhatsAppButton className="header-cta">Demander ma démo</WhatsAppButton>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.22 }}>
            <a href="#secteurs" onClick={closeMenu}>Nos secteurs</a>
            <a href="#formules" onClick={closeMenu}>Nos formules</a>
            <a href="#methode" onClick={closeMenu}>Comment ça marche</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </motion.nav>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="container hero-grid">
            <Reveal className="hero-copy">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" />Agence web locale · Bamako</div>
              <h1>Un site simple, votre business en <em>grand.</em></h1>
              <p className="hero-lede">Vos clients cliquent une fois et le message arrive directement dans votre WhatsApp, comme un vendeur qui travaille 24h/24.</p>
              <div className="hero-actions">
                <WhatsAppButton>Demander ma démo gratuite sur WhatsApp</WhatsAppButton>
                <a className="text-link text-link-light" href="#demos">Voir nos exemples <ArrowDown size={16} /></a>
              </div>
              <div className="hero-note"><Check size={14} /> Démo gratuite · sans engagement</div>
            </Reveal>
            <Reveal className="hero-visual-wrap" delay={0.1}>
              <div className="hero-visual">
                <img src="assets/kliksite-hero.webp" alt="Maquette de site web sur ordinateur et smartphone" loading="eager" fetchPriority="high" decoding="async" />
                <div className="hero-float hero-float-message"><MessageCircle size={15} /><span>Nouvelle demande</span><strong>WhatsApp</strong></div>
                <div className="hero-float hero-float-cursor"><MousePointer2 size={15} /><span>Votre site, clair</span></div>
              </div>
              <div className="hero-visual-caption"><span>Design sur mesure</span><span className="caption-line" /><span>Prêt à convertir</span></div>
            </Reveal>
          </div>
          <div className="container hero-bottom-row">
            <div className="hero-location"><span className="location-mark">+</span> Bamako, ACI 2000 et environs</div>
            <div className="hero-price"><span>À partir de</span><strong>20 000</strong><span>FCFA</span></div>
          </div>
        </section>

        <section className="reassurance-section" aria-label="Nos engagements">
          <div className="container reassurance-row">
            <div className="reassurance-item"><span className="reassurance-number">01</span><div><strong>Zéro compétence requise</strong><span>On s'occupe de la technique.</span></div></div>
            <div className="reassurance-item"><span className="reassurance-number">02</span><div><strong>Vous voyez avant de payer</strong><span>Une direction claire avant de décider.</span></div></div>
            <div className="reassurance-item"><span className="reassurance-number">03</span><div><strong>À partir de 20 000 FCFA</strong><span>Un point d'entrée accessible.</span></div></div>
          </div>
        </section>

        <section className="section sectors-section" id="secteurs">
          <div className="container">
            <Reveal className="section-heading split-heading">
              <div><div className="eyebrow">Des sites pensés pour votre activité</div><h2>Votre activité mérite son propre site.</h2></div>
              <p>Nous créons des expériences adaptées à la façon dont vos clients recherchent, choisissent et contactent votre entreprise.</p>
            </Reveal>
            <div className="sector-grid">
              {sectors.map((sector, index) => (
                <Reveal key={sector.title} className={sector.className} delay={index * 0.05}>
                  <div className="sector-image-wrap"><img src={sector.image} alt={`Illustration ${sector.title}`} loading="lazy" decoding="async" style={{ objectPosition: sector.objectPosition }} /><span className="sector-number">{sector.number}</span></div>
                  <div className="sector-content"><div><h3>{sector.title}</h3><p>{sector.description}</p></div><a href={sector.href} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={`Voir un exemple ${sector.title}`}><ArrowUpRight size={19} /></a></div>
                </Reveal>
              ))}
              <Reveal className="sector-card travel-card" delay={0.2}>
                <div className="sector-image-wrap travel-image-wrap"><TravelVisual /><span className="sector-number">05</span></div>
                <div className="sector-content"><div><h3>Agence de voyage</h3><p>Transformez l'envie de partir en réservation.</p></div><a href="https://bamako-voyages.netlify.app" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="Voir un exemple agence de voyage"><ArrowUpRight size={19} /></a></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section dark-section demos-section" id="demos">
          <div className="container">
            <Reveal className="section-heading dark-heading">
              <div><div className="eyebrow eyebrow-light">Des exemples concrets</div><h2>Regardez ce que votre activité peut devenir.</h2></div>
              <p>Chaque démo part d'un besoin réel. Cliquez, explorez, imaginez la vôtre.</p>
            </Reveal>
            <div className="demos-layout">
              <div className="demos-intro"><div className="demo-index">06 <span>/ exemples</span></div><p>Pas de promesses abstraites. Des sites que vous pouvez ouvrir maintenant.</p><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-link text-link-light">Parler de votre projet <ArrowUpRight size={16} /></a></div>
              <div className="demo-list">
                {demos.map((demo, index) => (
                  <Reveal key={demo.name} delay={index * 0.04}>
                    <a href={demo.href} target="_blank" rel="noopener noreferrer" className={`demo-row demo-${demo.accent}`}><span className="demo-row-index">0{index + 1}</span><span className="demo-row-type">{demo.type}</span><strong>{demo.name}</strong><ExternalLink size={17} /></a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section" id="methode">
          <div className="container">
            <Reveal className="section-heading centered-heading"><div><div className="eyebrow">Une méthode simple</div><h2>Du premier message au site en ligne.</h2></div><p>Pas de jargon. Pas de parcours compliqué. Juste les bonnes étapes, dans le bon ordre.</p></Reveal>
            <div className="process-track">
              <Reveal className="process-step" delay={0}><span className="process-step-number">01</span><div className="process-icon"><MessageCircle size={24} /></div><h3>Vous nous écrivez</h3><p>Votre activité, vos envies, même en quelques mots sur WhatsApp.</p></Reveal>
              <div className="process-connector" aria-hidden="true" />
              <Reveal className="process-step" delay={0.08}><span className="process-step-number">02</span><div className="process-icon"><PanelTop size={24} /></div><h3>On crée votre démo</h3><p>Nous transformons votre idée en une première direction claire.</p></Reveal>
              <div className="process-connector" aria-hidden="true" />
              <Reveal className="process-step" delay={0.16}><span className="process-step-number">03</span><div className="process-icon process-icon-accent"><Sparkles size={24} /></div><h3>Vous décidez</h3><p>Vous voyez le résultat avant de payer quoi que ce soit.</p></Reveal>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="formules">
          <div className="container">
            <Reveal className="section-heading split-heading pricing-heading"><div><div className="eyebrow">Des formules simples</div><h2>Choisissez le niveau de site dont votre activité a besoin.</h2></div><p>Commencez avec l'essentiel. Montez en gamme lorsque votre activité grandit.</p></Reveal>
            <div className="pricing-grid">
              {plans.map((plan, index) => (
                <Reveal key={plan.name} className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""}`} delay={index * 0.06}>
                  {plan.featured && <div className="plan-badge">Le plus choisi</div>}
                  <div className="pricing-top"><span className="plan-name">{plan.name}</span><span className="plan-mark">0{index + 1}</span></div>
                  <div className="plan-price"><strong>{plan.price}</strong><span>{plan.suffix}</span></div>
                  <p className="plan-intro">{plan.intro}</p>
                  <div className="plan-rule" />
                  <ul className="feature-list">{plan.features.map(feature => <li key={feature}><Check size={15} /> <span>{feature}</span></li>)}</ul>
                  <a href={`${whatsappLink}?text=${encodeURIComponent(`Bonjour KlikSite, je suis intéressé par la formule ${plan.name}.`)}`} target="_blank" rel="noopener noreferrer" className={`button ${plan.featured ? "button-primary" : "button-secondary"}`}>{plan.cta} <ArrowUpRight size={16} /></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <Reveal className="faq-title"><div className="eyebrow">Questions fréquentes</div><h2>Tout devient plus simple quand on sait à quoi s'attendre.</h2><p>Une question qui n'est pas ici ? Écrivez-nous directement sur WhatsApp.</p><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-link">Poser ma question <ArrowUpRight size={16} /></a></Reveal>
            <div className="faq-list">{faqs.map((faq, index) => { const isOpen = openFaq === index; return <div className={`faq-item ${isOpen ? "faq-item-open" : ""}`} key={faq.question}><button className="faq-question" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}><span>{faq.question}</span>{isOpen ? <X size={18} /> : <ChevronDown size={18} />}</button>{isOpen && <motion.div className="faq-answer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.2 }}><p>{faq.answer}</p></motion.div>}</div>; })}</div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <Reveal className="contact-copy"><div className="eyebrow eyebrow-light">Votre prochain clic</div><h2>Parlons de ce que votre business peut devenir en ligne.</h2><p>Quelques mots suffisent pour commencer. Nous vous répondons directement sur WhatsApp.</p><div className="contact-meta"><span><Clock3 size={16} /> Réponse rapide</span><span><ScanLine size={16} /> Démo sans engagement</span></div></Reveal>
            <Reveal className="contact-form-wrap" delay={0.1}><form className="contact-form" onSubmit={handleForm}><div className="form-heading"><span>01 / Demande de démo</span><strong>Votre activité mérite une première direction.</strong></div><label htmlFor="name">Votre nom</label><input id="name" name="name" type="text" placeholder="Ex : Awa Traoré" required /><label htmlFor="activity">Votre activité</label><input id="activity" name="activity" type="text" placeholder="Ex : restaurant, salon, agence..." required /><button type="submit" className="button button-primary form-button"><Send size={16} /> Recevoir ma démo gratuite</button>{formSent && <p className="form-success" role="status">Votre message est prêt. WhatsApp va s'ouvrir dans un nouvel onglet.</p>}<small>En cliquant, vous serez redirigé vers WhatsApp au +223 92 78 05 08.</small></form></Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><div><Logo light /><p>Un site simple, votre business en grand.</p></div><div className="footer-links"><a href="#secteurs">Secteurs</a><a href="#formules">Formules</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div><div className="footer-contact"><span>Bamako, Mali</span><a href={whatsappLink} target="_blank" rel="noopener noreferrer">+223 92 78 05 08 <ArrowUpRight size={14} /></a></div></div><div className="container footer-bottom"><span>© 2025 KlikSite. Tous droits réservés.</span><span>Créé pour les entreprises locales.</span></div></footer>
      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Écrire à KlikSite sur WhatsApp"><MessageCircle size={22} /></a>
    </div>
  );
}

export default App;
