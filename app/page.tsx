'use client';

import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import JinyuModel from '../components/JinyuModel';

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
    name: 'Digital Products & Web Devleopment',
    description:
      'I turn ideas into functional, responsive digital experiences - from early concepts and prototypes to working web applications.',
    tools: 'React . TypeScript . Python . Django . HTML/CSS . APIs . Databases . Git',
  },
  {
    name: 'AI & Rapid Prototyping',
    description:
      'I explore how AI can make digital products more useful, intuitive and responsive - especially when it supports people rather than replaces them.',
    tools: 'AI-assisted workflows . LLM integration . Prototyping . Automation . Experimentation',
  },
  {
    name: 'Human-Central Research & Service Thinking',
    description:
      'I look beyond the interface to understand the people, behaviours and systems behind a problem.',
    tools: 'User needs . Accessibility . Service journeys. Qualitative thinking . Social impact . Policy context',
  },
  {
    name: 'Visual Design & Creative Direction',
    description:
      'I shape ideas visually through interfacce design, motion, digital charaters and storytelling.',
    tools: 'Figma . UI concepts . Motion design . 3D assets . Personal branding . Filming and photography',
  },
  {
    name: 'People, Operations & Collaboration',
    description:
      'I am comfortable working where people, pressure and imperfect real-world situations meet.',
    tools: 'Diversity . Team collaboration . Training . Service operations . Problem solving . Communication . Coordination',
  },
  {
    name: 'Technology should make difficult parts of life a little easier.',
    description:'I am on: ageing, care, accessibility and public services - areas where thoughtful technology can have a tangible impact on everday life',
  }
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
    <a className="contact-button" href="https://www.linkedin.com/in/jinyu-f-b5501623b/">
      contact me
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
    </a>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="top">
      <FadeIn delay={0} y={-20} className="hero-nav-wrap">
        <nav className="hero-nav" aria-label="Main navigation">
          <a href="#about">About Me</a>
          <a href="#services">How I Work</a>
          <a href="#projects">Projects</a>
          <a href="#playground">Playground</a>
          <a href="#notes">Notes&Thoughts</a>
          <a href="#posts">Life</a>
        </nav>
      </FadeIn>

      <div className="hero-title-mask">
        <FadeIn delay={0.15} y={40}>
          <h1
            aria-label="Hi, I'm Jinyu"
            className="hero-heading hero-title"
            data-text="Hi, I'm Jinyu"
          >
            Hi, I&apos;m Jinyu
          </h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="hero-portrait">
        <JinyuModel />
      </FadeIn>

      <div className="hero-bottom">
        <FadeIn delay={0.35} y={20}>
          <p className="hero-intro">
            A digital space for the things I build, explore, and care about.
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
    'To be updated later';

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
        <h2 className="section-heading services-heading">How I Work</h2>
      </FadeIn>
      <div className="services-list">
        {services.map((service, index) => (
          <FadeIn delay={index * 0.1} y={30} key={service.name}>
            <article className="service-item">
              <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="service-copy">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                {service.tools && (
                  <p className="service-tools">{service.tools}</p>
                )}
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
