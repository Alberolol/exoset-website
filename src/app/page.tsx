"use client";

import Navigation from "@/components/Navigation";
import MountainLandscape from "@/components/MountainLandscape";
import ScrollExpandingCard from "@/components/ScrollExpandingCard";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState(0);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % 3);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Parallax and scroll animations effect
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElement = document.getElementById("parallax-divider");
      if (parallaxElement) {
        const scrolled = window.pageYOffset;
        const rect = parallaxElement.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate parallax movement with bounds checking
        const maxMovement = elementHeight * 0.2; // Maximum 20% of container height movement

        // Calculate scroll progress through the element (0 to 1)
        const scrollProgress = Math.max(
          0,
          Math.min(
            1,
            (scrolled + windowHeight - elementTop) /
              (windowHeight + elementHeight)
          )
        );

        // Apply bounded parallax movement
        const yPos = -(scrollProgress - 0.5) * maxMovement;
        const backgroundImage = parallaxElement.querySelector(
          ".parallax-bg"
        ) as HTMLElement;
        if (backgroundImage) {
          backgroundImage.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      }

      // Scroll animations for sections
      const animatedElements = document.querySelectorAll(".scroll-animate");
      animatedElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          element.classList.add("animate-in");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Fixed Background */}
      <section className="fixed inset-0 overflow-hidden bg-black text-white">
        <MountainLandscape />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vos <span className="text-white">TI</span> entre de bonnes mains
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Avec plus de 40 ans d&apos;expérience dans le domaine des
              technologies de l&apos;information, Exoset se distingue par son
              savoir-faire et son agilité pour sa clientèle diversifiée.
            </p>

            <div className="flex justify-center mb-12">
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200">
                Planifier une consultation gratuite
              </button>
            </div>

            {/* Partner Logos in Hero Section */}
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center items-center gap-1 md:gap-2 opacity-80 overflow-hidden">
                {/* Partner 1 */}
                <div className="relative flex items-center justify-center h-20 w-40 md:w-48 flex-shrink-0">
                  <Image
                    src="/images/partners/partner1.png"
                    alt="Partner 1"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                {/* Partner 2 */}
                <div className="relative flex items-center justify-center h-20 w-40 md:w-48 flex-shrink-0">
                  <Image
                    src="/images/partners/partner2.png"
                    alt="Partner 2"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                {/* Partner 3 */}
                <div className="relative flex items-center justify-center h-20 w-40 md:w-48 flex-shrink-0">
                  <Image
                    src="/images/partners/partner3.png"
                    alt="Partner 3"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                {/* Partner 4 */}
                <div className="relative flex items-center justify-center h-20 w-40 md:w-48 flex-shrink-0">
                  <Image
                    src="/images/partners/partner4.png"
                    alt="Partner 4"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                {/* Partner 5 */}
                <div className="relative flex items-center justify-center h-20 w-40 md:w-48 flex-shrink-0">
                  <Image
                    src="/images/partners/partner5.png"
                    alt="Partner 5"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                {/* Partner 6 */}
                <div className="relative flex items-center justify-center h-20 w-40 md:w-48 flex-shrink-0">
                  <Image
                    src="/images/partners/partner6.png"
                    alt="Partner 6"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white bg-opacity-60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Scrollable Content Card */}
      <div className="relative z-20 mt-screen">
        <ScrollExpandingCard className="bg-white rounded-t-3xl shadow-2xl min-h-screen">
          {/* Services Overview */}
          <section className="pt-20 pb-20 bg-gray-50 rounded-t-3xl scroll-animate">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Votre infrastructure, notre passion
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Forte de quatre décennies d&apos;innovation, Exoset transforme
                  vos défis technologiques en opportunités de croissance grâce à
                  une approche intégrée et des partenariats stratégiques avec
                  les leaders mondiaux.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Service 1 */}
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-exoset-gradient rounded-lg flex items-center justify-center mb-6 shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Solutions d&apos;hébergement adaptées
                  </h3>
                  <p className="text-gray-600">
                    Avec des infrastructures serveurs et de stockage de pointe
                    avec nos partenaires Dell, Synology et VMWare, sécurité et
                    réseau avec Fortinet, Cisco et Kemp.
                  </p>
                </div>

                {/* Service 2 */}
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-exoset-gradient rounded-lg flex items-center justify-center mb-6 shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Fournisseur officiel et revendeur
                  </h3>
                  <p className="text-gray-600">
                    Accompagné par les plus grands acteurs de la scène
                    technologique mondiale, Exoset est pleinement capable
                    d&apos;acquérir l&apos;équipement technologique requis.
                  </p>
                </div>

                {/* Service 3 */}
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-exoset-gradient rounded-lg flex items-center justify-center mb-6 shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Support professionnel et service
                  </h3>
                  <p className="text-gray-600">
                    En tant que partenaire officiel, le personnel d&apos;Exoset
                    est capable d&apos;accéder au support jusqu&apos;au
                    fabricant afin de vous accompagner dans vos défis.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 bg-gradient-to-r from-exoset-blue to-exoset-pink text-white scroll-animate">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">40+</div>
                  <div className="text-lg opacity-90">Années d'expertise</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    1000+
                  </div>
                  <div className="text-lg opacity-90">Clients accompagnés</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    99.9%
                  </div>
                  <div className="text-lg opacity-90">
                    Disponibilité garantie
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    24/7
                  </div>
                  <div className="text-lg opacity-90">Support technique</div>
                </div>
              </div>
            </div>
          </section>

          {/* Process Steps */}
          <section className="py-20 bg-gray-50 scroll-animate">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Notre processus en 3 étapes
                </h2>
                <p className="text-xl text-gray-600">
                  Une approche structurée pour votre succès
                </p>
              </div>

              <div className="relative">
                {/* Continuous Gradient Line */}
                <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-exoset-blue to-exoset-pink rounded-full">
                  {/* Arrowhead */}
                  <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2">
                    <svg
                      className="w-full h-full text-exoset-pink"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="6"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative pt-8">
                  {[
                    {
                      number: "1",
                      title: "Audit technique",
                      description:
                        "Évaluation complète de votre infrastructure existante et identification des opportunités d'optimisation.",
                    },
                    {
                      number: "2",
                      title: "Architecture sur mesure",
                      description:
                        "Conception d'une solution adaptée à vos besoins spécifiques et à votre budget.",
                    },
                    {
                      number: "3",
                      title: "Migration assistée",
                      description:
                        "Déploiement et formation avec support dédié pour une transition en douceur.",
                    },
                  ].map((step, index) => (
                    <div key={index} className="relative text-center">
                      {/* Number Circle Centered on Timeline */}
                      <div className="flex justify-center absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-14 h-14 bg-gradient-to-r from-exoset-blue to-exoset-pink rounded-full p-1 z-10">
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-900">
                              {step.number}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Clean Content */}
                      <div className="pt-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learn More Button */}
              <div className="text-center mt-12">
                <button className="relative px-8 py-3 rounded-full text-gray-900 font-semibold bg-transparent hover:shadow-lg transition-all duration-200 group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-exoset-blue to-exoset-pink opacity-100"></div>
                  <div className="absolute inset-[2px] rounded-full bg-white group-hover:bg-gray-50 transition-colors duration-200"></div>
                  <span className="relative z-10">En apprendre plus</span>
                </button>
              </div>
            </div>
          </section>

          {/* Parallax Divider */}
          <section
            id="parallax-divider"
            className="relative h-64 overflow-hidden"
          >
            <div
              className="parallax-bg absolute bg-cover bg-center"
              style={{
                backgroundImage: "url(/images/serveur.png)",
                backgroundColor: "#0a0a0a",
                willChange: "transform",
                top: "-10%",
                left: 0,
                right: 0,
                height: "120%",
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
          </section>

          {/* Key Technologies */}
          <section className="py-20 bg-white scroll-animate">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nos domaines d&apos;expertise
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Pour tous vos besoins informatiques, nous livrons dans les
                  délais et le budget
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Cloud",
                    desc: "Réduisez vos coûts IT tout en augmentant votre agilité et votre scalabilité avec nos solutions cloud",
                    benefit: "Économies + Flexibilité",
                    icon: (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Réseau",
                    desc: "Éliminez les interruptions réseau coûteuses avec une infrastructure fiable et performante",
                    benefit: "Fiabilité + Performance",
                    icon: (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Communications unifiées",
                    desc: "Améliorez la productivité avec des outils de collaboration modernes et intégrés",
                    benefit: "Productivité + Collaboration",
                    icon: (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Virtualisation",
                    desc: "Optimisez l'utilisation de vos serveurs et réduisez significativement vos coûts matériels",
                    benefit: "Optimisation + Économies",
                    icon: (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Sécurité",
                    desc: "Protégez votre entreprise contre les cybermenaces avec des solutions de sécurité avancées",
                    benefit: "Protection + Continuité",
                    icon: (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Stockage et sauvegarde",
                    desc: "Assurez la récupération rapide de vos données avec nos solutions de sauvegarde redondantes",
                    benefit: "Sécurité + Rapidité",
                    icon: (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                        />
                      </svg>
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
                  >
                    <div className="mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={`url(#expertiseGradient${index})`}
                        strokeWidth={2}
                      >
                        <defs>
                          <linearGradient
                            id={`expertiseGradient${index}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#091EFF" />
                            <stop offset="100%" stopColor="#FF28B0" />
                          </linearGradient>
                        </defs>
                        {item.icon.props.children}
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-exoset-blue group-hover:to-exoset-pink transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>

                    {/* Arrow indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-5 h-5 text-exoset-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quote Carousel Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                {/* Quote icon */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <svg
                    className="w-12 h-12 text-exoset-pink opacity-30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                {/* Carousel Container */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentQuote * 100}%)` }}
                  >
                    {[
                      {
                        text: "Exoset a transformé notre infrastructure IT avec une expertise remarquable. Leur approche personnalisée et leur réactivité font toute la différence dans notre réussite technologique.",
                        author: "Marie-Claire Dubois",
                        title: "Directrice TI, Groupe Innovation Montréal",
                      },
                      {
                        text: "Grâce à Exoset, nous avons modernisé nos systèmes avec une solution cloud robuste et sécurisée. Leur support technique de premier plan nous donne une tranquillité d'esprit totale.",
                        author: "Jean-François Tremblay",
                        title: "PDG, Solutions Technologiques Québec",
                      },
                      {
                        text: "L'équipe d'Exoset comprend nos défis uniques et propose toujours des solutions innovantes adaptées à nos besoins. Un partenaire technologique de confiance depuis plus de 15 ans.",
                        author: "Sophie Bergeron",
                        title:
                          "Responsable Informatique, Industries Laval Inc.",
                      },
                    ].map((quote, index) => (
                      <div
                        key={index}
                        className="w-full flex-shrink-0 text-center px-4"
                      >
                        <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-8 pt-8">
                          &quot;{quote.text}&quot;
                        </blockquote>

                        <div className="flex flex-col items-center">
                          <div className="w-16 h-0.5 bg-exoset-gradient mb-4"></div>
                          <p className="text-lg font-semibold text-gray-900">
                            {quote.author}
                          </p>
                          <p className="text-gray-600">{quote.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center space-x-2 mt-8">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuote(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentQuote === index
                          ? "bg-exoset-pink"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Actualités et expertise
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Découvrez nos derniers articles sur les tendances
                  technologiques et nos conseils d&apos;experts
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Migration vers le cloud Azure : guide complet 2025",
                    excerpt:
                      "Découvrez les meilleures pratiques pour migrer votre infrastructure vers Azure en toute sécurité. Nos experts partagent leur expérience de plus de 100 migrations réussies.",
                    date: "15 mars 2025",
                    readTime: "5 min",
                    category: "Cloud",
                    image: "/images/migration.png",
                  },
                  {
                    title: "Cybersécurité : 7 menaces émergentes à connaître",
                    excerpt:
                      "L'évolution constante des cybermenaces nécessite une vigilance accrue. Analysons les nouvelles techniques d'attaque et les stratégies de protection adaptées.",
                    date: "8 mars 2025",
                    readTime: "7 min",
                    category: "Sécurité",
                    image: "/images/cybersécurité.png",
                  },
                  {
                    title: "Virtualisation VMware : optimiser les performances",
                    excerpt:
                      "Maximisez l'efficacité de votre infrastructure virtualisée avec nos techniques d'optimisation éprouvées. Réduisez les coûts tout en améliorant les performances.",
                    date: "2 mars 2025",
                    readTime: "6 min",
                    category: "Virtualisation",
                    image: "/images/vmware.png",
                  },
                ].map((article, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                  >
                    {/* Article Image */}
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-exoset-gradient text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <time>{article.date}</time>
                        <span className="mx-2">•</span>
                        <span>{article.readTime} de lecture</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-exoset-blue group-hover:to-exoset-pink transition-all duration-300">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>

                      {/* Read more link */}
                      <div className="flex items-center text-exoset-blue font-medium group-hover:text-exoset-pink transition-colors duration-300">
                        Lire la suite
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* View all blog button */}
              <div className="text-center mt-12">
                <button className="relative px-8 py-3 rounded-full text-gray-900 font-semibold bg-transparent hover:shadow-lg transition-all duration-200 group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-exoset-blue to-exoset-pink opacity-100"></div>
                  <div className="absolute inset-[2px] rounded-full bg-white group-hover:bg-gray-50 transition-colors duration-200"></div>
                  <span className="relative z-10">Voir tous les articles</span>
                </button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-r from-exoset-blue to-exoset-pink text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à transformer votre infrastructure IT ?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Contactez-nous dès aujourd&apos;hui pour découvrir comment nous
                pouvons vous accompagner dans vos projets technologiques.
              </p>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200">
                Planifier une consultation gratuite
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">EXOSET</h3>
                  <p className="text-gray-400">
                    Plus de 40 ans d&apos;expérience dans les technologies de
                    l&apos;information.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Services</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>Cloud Computing</li>
                    <li>Virtualisation</li>
                    <li>Sécurité IT</li>
                    <li>Support Professionnel</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Industries</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>Entreprises</li>
                    <li>PME</li>
                    <li>Organismes publics</li>
                    <li>Secteur privé</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact</h4>
                  <div className="text-gray-400 space-y-2">
                    <p>info@exoset.com</p>
                    <p>+1 (514) 000-0000</p>
                    <div className="flex space-x-4 mt-4">
                      <a href="#" className="text-exoset-cyan hover:text-white">
                        LinkedIn
                      </a>
                      <a href="#" className="text-exoset-cyan hover:text-white">
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Exoset Inc. Tous droits réservés.</p>
              </div>
            </div>
          </footer>
        </ScrollExpandingCard>
      </div>
    </div>
  );
}
