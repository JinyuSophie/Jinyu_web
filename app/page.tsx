'use client';

import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

const PORTRAIT_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const aboutArt = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Chrome moon sculpture',
    className: 'about-art about-art--moon',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: 'Abstract glass sculpture',
    className: 'about-art about-art--glass',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Playful 3D block sculpture',
    className: 'about-art about-art--lego',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: 'Cluster of translucent 3D forms',
    className: 'about-art about-art--group',
    delay: 0.3,
    x: 80,
  },
];

const services = [
  {
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    name: 'Branding',
    description:
      'Crafting cohesive visual identities—from logos to full brand systems—that communicate a clear and memorable presence.',
  },
  {
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

const projects = [
  {
    name: 'Nextlevel Studio',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    name: 'Solaris Digital',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <a className="contact-button" href="mailto:hello@jinyu.design">
      Contact me
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
    </a>
  );
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const closestX = Math.max(rect.left - 150, Math.min(event.clientX, rect.right + 150));
    const closestY = Math.max(rect.top - 150, Math.min(event.clientY, rect.bottom + 150));
    const isActive = closestX === event.clientX && closestY === event.clientY;

    if (isActive) {
      setPosition({
        x: (event.clientX - (rect.left + rect.width / 2)) / 3,
        y: (event.clientY - (rect.top + rect.height / 2)) / 3,
      });
    }
  }

  return (
    <div
      ref={ref}
      className="magnet"
      onMouseMove={handleMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="top">
      <FadeIn delay={0} y={-20} className="hero-nav-wrap">
        <nav className="hero-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#services">Price</a>
          <a href="#projects">Projects</a>
          <a href="mailto:hello@jinyu.design">Contact</a>
        </nav>
      </FadeIn>

      <div className="hero-title-mask">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading hero-title">Hi, I&apos;m Jinyu</h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="hero-portrait">
        <Magnet>
          <img src={PORTRAIT_URL} alt="Stylized 3D portrait of Jinyu" />
        </Magnet>
      </FadeIn>

      <div className="hero-bottom">
        <FadeIn delay={0.35} y={20}>
          <p className="hero-intro">
            A 3D creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rows = [marqueeImages.slice(0, 11), marqueeImages.slice(11)];

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sectionTop = sectionRef.current?.offsetTop ?? 0;
        setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="marquee-section" aria-label="Selected motion work">
      {rows.map((row, rowIndex) => (
        <div className="marquee-viewport" key={rowIndex}>
          <div
            className="marquee-track"
            style={{
              transform:
                rowIndex === 0
                  ? `translate3d(calc(-33.333% + ${offset - 200}px), 0, 0)`
                  : `translate3d(calc(-33.333% - ${offset - 200}px), 0, 0)`,
            }}
          >
            {[...row, ...row, ...row].map((src, index) => (
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                key={`${rowIndex}-${index}`}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function AnimatedCharacter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1 / total + 0.035);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="animated-character">
      <span className="animated-character-placeholder">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span aria-hidden="true" style={{ opacity }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });
  const characters = Array.from(text);

  return (
    <p ref={paragraphRef} className="about-copy" aria-label={text}>
      {characters.map((char, index) => (
        <AnimatedCharacter
          char={char}
          index={index}
          key={`${char}-${index}`}
          progress={scrollYProgress}
          total={characters.length}
        />
      ))}
    </p>
  );
}

function AboutSection() {
  const copy =
    "With more than five years of experience in design, I focus on branding, web design, and user experience. I truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

  return (
    <section className="about-section" id="about">
      {aboutArt.map((item) => (
        <FadeIn
          className={item.className}
          delay={item.delay}
          duration={0.9}
          key={item.src}
          x={item.x}
          y={0}
        >
          <img src={item.src} alt={item.alt} loading="lazy" />
        </FadeIn>
      ))}

      <div className="about-content">
        <FadeIn y={40}>
          <h2 className="hero-heading section-heading">About me</h2>
        </FadeIn>
        <AnimatedText text={copy} />
        <FadeIn y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <FadeIn y={40}>
        <h2 className="section-heading services-heading">Services</h2>
      </FadeIn>
      <div className="services-list">
        {services.map((service, index) => (
          <FadeIn delay={index * 0.1} y={30} key={service.name}>
            <article className="service-item">
              <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="service-copy">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start end', 'end start'],
  });
  const targetScale = 1 - (projects.length - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div className="project-card-stage" ref={cardContainerRef}>
      <motion.article
        className="project-card"
        style={{
          scale,
          top: `calc(clamp(6rem, 8vw, 8rem) + ${index * 28}px)`,
        }}
      >
        <div className="project-card-header">
          <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
          <div className="project-meta">
            <span>{project.category}</span>
            <h3>{project.name}</h3>
          </div>
          <a className="live-project-button" href="mailto:hello@jinyu.design">
            Live project
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="project-images">
          <div className="project-images-left">
            <img src={project.images[0]} alt={`${project.name} project detail one`} loading="lazy" />
            <img src={project.images[1]} alt={`${project.name} project detail two`} loading="lazy" />
          </div>
          <img
            className="project-image-main"
            src={project.images[2]}
            alt={`${project.name} featured project view`}
            loading="lazy"
          />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <FadeIn y={40}>
        <h2 className="hero-heading section-heading projects-heading">Project</h2>
      </FadeIn>

      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectCard index={index} key={project.name} project={project} />
        ))}
      </div>

      <footer className="project-footer" id="contact">
        <p>Have a world you want to bring to life?</p>
        <a href="mailto:hello@jinyu.design">hello@jinyu.design</a>
        <span>© {new Date().getFullYear()} Jinyu</span>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
