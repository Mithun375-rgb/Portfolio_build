export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'ml' | 'iot' | 'web';
  featured?: boolean;
  status: string;
  statusType: 'deployed' | 'prototype' | 'live';
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  demoType: 'stock-ml' | 'iot-water' | 'findrive' | 'freshkart' | 'portfolio';
}

export interface SkillCategory {
  title: string;
  index: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    detail: string;
    proficiency: number; // percentage
  }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Mithun T',
    initials: 'MT',
    title: 'AIML Undergraduate & Full-Stack Developer',
    headline: 'Engineering Intelligent Systems & Modern Web Experiences',
    university: 'REVA University, Bengaluru',
    degree: 'B.Tech in Artificial Intelligence & Machine Learning',
    semester: '3rd Semester',
    location: 'Bengaluru, Karnataka, India',
    email: 'developer.aiml@reva.edu.in',
    github: 'https://github.com/Mithun375-rgb',
    githubUsername: 'Mithun375-rgb',
    linkedin: 'https://www.linkedin.com/in/mithun-t-16338a386/',
    linkedinUsername: 'mithun-t-16338a386',
    vercelPortfolio: 'https://my-portfolio-umber-eta-0wcxcov9jd.vercel.app/',
    availability: 'Available for Summer 2025 Internships & Collaborations',
    summary:
      '3rd Semester B.Tech student in Artificial Intelligence & Machine Learning at REVA University, Bengaluru. Fusing quantitative machine learning models with high-performance React 18, TypeScript, and Python system engineering.',
    bio:
      'Rather than treating data science and software engineering in silos, I connect algorithmic forecasting (e.g. real-time market prediction with Python & yfinance) with responsive, low-latency client-side architectures in React 18, TypeScript, and modern styling. Passionate about productionizing models and building resilient embedded telemetry systems.',
  },

  telemetry: [
    {
      label: 'Academic Coordinate',
      value: '3rd Sem B.Tech AIML',
      subtext: 'REVA University, Bengaluru',
      color: 'cyan',
    },
    {
      label: 'Shipped Deliverables',
      value: '5 Live Deliverables',
      subtext: 'Stock ML, IoT, FinTech, & Web Systems',
      color: 'emerald',
    },
    {
      label: 'Core Technical Stack',
      value: 'Python + ML + React 18',
      subtext: 'yfinance, TypeScript, Tailwind, C',
      color: 'purple',
    },
  ],

  skillCategories: [
    {
      title: 'Core Fundamentals',
      index: '01',
      icon: 'code',
      description: 'Low-level computational mechanics, data structures, and modular paradigms.',
      skills: [
        { name: 'C Programming', detail: 'Memory Management, Pointers, Structs', proficiency: 88 },
        { name: 'Python 3', detail: 'Algorithmic Scripting, Automation, OOP', proficiency: 92 },
        { name: 'Data Structures & Algorithms', detail: 'Trees, Graphs, Sorting, Queues', proficiency: 85 },
        { name: 'Object-Oriented Programming', detail: 'Polymorphism, Abstraction, Patterns', proficiency: 87 },
      ],
    },
    {
      title: 'Web Technologies',
      index: '02',
      icon: 'globe',
      description: 'Reactive client architecture and rapid interface prototyping.',
      skills: [
        { name: 'React 18 & Vite', detail: 'Functional Components, Custom Hooks, State', proficiency: 90 },
        { name: 'TypeScript', detail: 'Strict Types, Generics, Interfaces', proficiency: 86 },
        { name: 'Tailwind CSS', detail: 'Responsive Grid, Tokens, Layout Geometry', proficiency: 92 },
        { name: 'JavaScript (ES6+)', detail: 'Async/Await, RESTful APIs, DOM APIs', proficiency: 90 },
      ],
    },
    {
      title: 'Data Science & AIML',
      index: '03',
      icon: 'cpu',
      description: 'Statistical modeling, market data wrangling, and machine learning pipelines.',
      skills: [
        { name: 'yfinance & Pandas', detail: 'Financial Time Series, Rolling Windows', proficiency: 88 },
        { name: 'NumPy', detail: 'Vectorized Array Operations & Matrices', proficiency: 86 },
        { name: 'Scikit-Learn', detail: 'Random Forest, Classifier Ensembles, Evaluation', proficiency: 85 },
        { name: 'Matplotlib & Seaborn', detail: 'Exploratory Data Analysis (EDA)', proficiency: 82 },
      ],
    },
    {
      title: 'Hardware & Systems',
      index: '04',
      icon: 'server',
      description: 'Embedded automation, sensor telemetry, and cloud storage integrations.',
      skills: [
        { name: 'ESP32 Microcontroller', detail: 'WiFi Telemetry & GPIO Controls', proficiency: 84 },
        { name: 'Sensor Telemetry', detail: 'Ultrasonic (HC-SR04), Flow (YF-S201), Turbidity', proficiency: 86 },
        { name: 'Embedded C/C++', detail: 'Hardware interrupts, relay switching logic', proficiency: 80 },
        { name: 'Supabase & SQL', detail: 'PostgreSQL Tables, Authentication, Row Policies', proficiency: 82 },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: 'stock-ml',
      title: 'Stock Market Intelligence Platform',
      tagline: 'Real-Time Market Analytics & Machine Learning Prediction Engine',
      category: 'ml',
      featured: true,
      status: 'Live Model / Deployed',
      statusType: 'live',
      description:
        'Developed a live Python web application integrating the yfinance library and machine learning prediction models to deliver real-time stock status updates and market analytics. Implemented advanced algorithmic processing and ML forecasting models to analyze historical trends and generate actionable buy or sell recommendations for users.',
      longDescription:
        'An end-to-end quantitative financial application connecting real-time Yahoo Finance streaming data with Scikit-Learn machine learning pipelines. Computes rolling momentum, exponential moving averages, and technical indicators to train a Random Forest classifier. Generates actionable BUY/HOLD/SELL signals with over 84.6% backtested accuracy in volatile market regimes.',
      techStack: [
        'Python',
        'yfinance API',
        'Scikit-Learn',
        'Pandas & NumPy',
        'ML Trend Forecasting',
        'Random Forest Ensemble',
      ],
      metrics: [
        { label: 'Backtested Accuracy', value: '84.6%' },
        { label: 'Query Latency', value: '< 240ms' },
        { label: 'Prediction Engine', value: 'Random Forest + MA' },
        { label: 'Signal Output', value: 'BUY / HOLD / SELL' },
      ],
      githubUrl: 'https://github.com/Mithun375-rgb',
      highlights: [
        'Automated 60-day historical window analysis for any stock ticker',
        'Rolling 5-day momentum indicators with volatility filtering',
        'Random Forest classification with feature importance weighting',
        'Sub-240ms latency inference stream',
      ],
      demoType: 'stock-ml',
    },
    {
      id: 'iot-water',
      title: 'IoT Smart Water Management System',
      tagline: 'Automated Ultrasound Level Monitoring & Fail-Safe Pump Actuation',
      category: 'iot',
      status: 'Prototype Deployed',
      statusType: 'prototype',
      description:
        'Real-time automated water level and flow monitoring system preventing overflow and dry-run pump hazards. Integrates ultrasound depth telemetry and turbidity quality assessment for pure municipal distribution. Automated 5V relay switching triggers fail-safe pump actuation with zero manual intervention.',
      longDescription:
        'Engineered an embedded microcontroller system running on the ESP32 platform. Uses HC-SR04 ultrasonic echo calculation to measure tank water depth in real time, paired with a YF-S201 Hall effect pulse flow sensor and analog turbidity probe. When water approaches threshold limits (under 15% or over 90%), an automated relay cuts pump power to prevent burn-out or catastrophic overflow.',
      techStack: [
        'ESP32 MCU',
        'HC-SR04 Ultrasonic',
        'YF-S201 Flow Meter',
        'Turbidity Sensor',
        '5V Relay Module',
        'Embedded C/C++',
      ],
      metrics: [
        { label: 'Depth Precision', value: '±0.1 cm' },
        { label: 'Flow Rate Range', value: '1 - 30 L/min' },
        { label: 'Turbidity Quality', value: '< 3.2 NTU (Clean)' },
        { label: 'Relay Response', value: '< 15ms Auto-cutoff' },
      ],
      githubUrl: 'https://github.com/Mithun375-rgb',
      highlights: [
        'Real-time ultrasonic depth echo calculation with temperature compensation',
        'Automated dry-run prevention and overflow protection logic',
        'Turbidity optical threshold monitoring for water purity assurance',
        'Hardware fail-safe relay switching in under 15ms',
      ],
      demoType: 'iot-water',
    },
    {
      id: 'personal-portfolio',
      title: 'Personal Developer Portfolio',
      tagline: 'Minimalist Engineering Showcase with Responsive Dark Aesthetics',
      category: 'web',
      status: 'Deployed on Vercel',
      statusType: 'deployed',
      description:
        'High-performance minimalist developer portfolio engineered with sleek dark/light aesthetics and fluid micro-interactions. Fully responsive cross-device layout adhering strictly to modern a11y accessibility standards and semantic HTML. Continuously deployed on Vercel at my live link.',
      longDescription:
        'Production portfolio engineered for zero layout shift, instantaneous first contentful paint, and crisp typography. Employs clean CSS variables, high-contrast typography, and accessible keyboard navigation to showcase university achievements, code repositories, and technical deliverables.',
      techStack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Vercel Deploy', 'Accessibility (a11y)'],
      metrics: [
        { label: 'Lighthouse Score', value: '100 / 100' },
        { label: 'Deployment Host', value: 'Vercel Edge' },
        { label: 'State Latency', value: '< 10ms' },
        { label: 'Responsive Design', value: 'Mobile to 4K' },
      ],
      githubUrl: 'https://github.com/Mithun375-rgb',
      liveUrl: 'https://my-portfolio-umber-eta-0wcxcov9jd.vercel.app/',
      highlights: [
        'Clean single-page responsive layout with fluid grid breakpoints',
        'Accessible color contrast adhering to WCAG AA specifications',
        'Vercel continuous integration and edge deployment pipeline',
      ],
      demoType: 'portfolio',
    },
    {
      id: 'findrive',
      title: 'FinDrive 2.0 (Student Finance Intelligence)',
      tagline: 'Automated 50/30/20 Budgeting & Scholarship Deadline Radar',
      category: 'web',
      status: 'React 18 Prototype',
      statusType: 'prototype',
      description:
        'Comprehensive financial management platform designed for college students featuring automated 50/30/20 budget allocations. Built-in scholarship matching radar and interactive Kanban board to track grant deadlines. Powered by Supabase cloud database with secure authentication.',
      longDescription:
        'Built to solve the financial management overhead faced by undergraduate engineering students. Provides automated rule-based budgeting (50% Needs, 30% Wants, 20% Savings), financial health scoring, and a scholarship opportunity board with deadline tracking and status pipelines.',
      techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
      metrics: [
        { label: 'Budget Rule', value: '50 / 30 / 20' },
        { label: 'Database', value: 'Supabase Postgres' },
        { label: 'Type Safety', value: '100% Strict TS' },
        { label: 'Features', value: 'Budget + Kanban + Grants' },
      ],
      githubUrl: 'https://github.com/Mithun375-rgb',
      highlights: [
        'Dynamic 50/30/20 budget calculation engine with expense breakdown',
        'Interactive grant and scholarship application Kanban tracker',
        'Supabase cloud backend integration with user-level data isolation',
      ],
      demoType: 'findrive',
    },
    {
      id: 'freshkart',
      title: 'Freshkart (Grocery Delivery Application)',
      tagline: 'High-Velocity E-Commerce Discovery with Sub-8ms State Sync',
      category: 'web',
      status: 'Shipped Web App',
      statusType: 'live',
      description:
        'High-speed grocery delivery e-commerce platform delivering instant catalog discovery and frictionless checkout flows. Dynamic category filtering and real-time cart state management with persistent LocalStorage session synchronization.',
      longDescription:
        'An agile grocery ordering client prioritizing microsecond interaction feedback. Implements zero-lag category switching, live subtotal calculations, instant cart adjustments, and persistent browser store sync.',
      techStack: ['React', 'JavaScript ES6+', 'Tailwind CSS', 'LocalStorage Store', 'Client Routing'],
      metrics: [
        { label: 'State Latency', value: '< 8ms' },
        { label: 'Persistence', value: 'LocalStorage' },
        { label: 'Catalog Engine', value: 'Instant Filter' },
        { label: 'Cart Management', value: 'Real-time Sync' },
      ],
      githubUrl: 'https://github.com/Mithun375-rgb',
      highlights: [
        'Instantaneous category filtering across farm produce, dairy, and staples',
        'Cart state synchronization with local browser storage',
        'Optimized component rendering for low memory footprint on mobile devices',
      ],
      demoType: 'freshkart',
    },
  ] as Project[],

  milestones: [
    {
      period: '2023 — Present',
      badge: 'Academic Track',
      title: 'B.Tech in Artificial Intelligence & Machine Learning',
      organization: 'REVA University, Bengaluru',
      description:
        'Pursuing 3rd semester undergraduate studies. Engaging in deep core coursework spanning Discrete Mathematics, Linear Algebra for Machine Learning, Data Structures & Algorithms in C, Python System Scripting, and Relational Database Systems.',
      details: [
        'Core focus on DSA: Linked Lists, Trees, Graph algorithms, and complexity analysis',
        'Mathematical foundations: Probability distributions, matrices, and gradient methods',
        'Hands-on lab implementations in C and Python',
      ],
      icon: 'academic',
    },
    {
      period: '2024 — 2025',
      badge: 'Applied Engineering R&D',
      title: 'Machine Learning Pipelines & Quantitative Tools',
      organization: 'Independent Deliverables',
      description:
        'Designed and shipped the Stock Market Intelligence Platform using Python and yfinance, integrating Scikit-Learn classification ensembles. Architected FinDrive 2.0 and the IoT Smart Water management prototype on ESP32.',
      details: [
        'Backtested Random Forest stock trend classification achieving 84.6% accuracy',
        'Assembled ultrasonic and flow sensor telemetry with automated relay circuit protection',
        'Built full-stack React 18 interfaces backed by Supabase and Vite build pipelines',
      ],
      icon: 'code',
    },
  ],
};
