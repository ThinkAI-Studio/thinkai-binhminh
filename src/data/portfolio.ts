export type Language = "en" | "vi";

export type Localized<T> = Record<Language, T>;

export type ArchitectureSecurityCard = {
  title: Localized<string>;
  description: Localized<string>;
  tag: string;
  icon: "shield" | "lock" | "git" | "check" | "cpu" | "code";
};

export type ArchitectureFlowStep = {
  step: string;
  title: string;
  subtitle: Localized<string>;
  protocol: string;
  status: string;
};

export type ArchitectureSpecSnippet = {
  filename: string;
  language: string;
  code: string;
};

export type ArchitectureProvenanceItem = {
  hash: string;
  message: Localized<string>;
  branch: string;
  url: string;
  verified: boolean;
};

export type ArchitectureMetadata = {
  specId: string;
  constraint: Localized<string>;
  mechanism: Localized<string>;
  standard: Localized<string>;
  flowSteps: ArchitectureFlowStep[];
  securityCards: ArchitectureSecurityCard[];
  specSnippet: ArchitectureSpecSnippet;
  provenance: ArchitectureProvenanceItem[];
};

export type Project = {
  id: "thinkai-ui" | "homelab" | "thinkai";
  repo: string;
  liveUrl?: string;
  cliCommand?: string;
  period: string;
  stack: string[];
  accent: "teal" | "pink" | "emerald";
  mark: string;
  metric: {
    value: string;
    label: Localized<string>;
  };
  evidence: {
    cv: string;
    repository: Array<{ claim: string; url: string }>;
  };
  preview: {
    assetStem: string;
    image: string;
    ready: boolean;
    capture: Localized<string>;
  };
  content: Localized<{
    category: string;
    title: string;
    summary: string;
    story: {
      problem: string;
      approach: string;
      outcome: string;
    };
    diagramLabel: string;
  }>;
  architecture?: ArchitectureMetadata;
};

export const profile = {
  name: "Bình Minh",
  role: "DevOps Engineer",
  email: "pata10102004@gmail.com",
  phone: "+84 372 064 929",
  location: "Thu Duc, Ho Chi Minh City, Vietnam",
  domain: "https://binhminh.thinkai.id.vn",
  github: "https://github.com/bnhminh1010",
  linkedin: "https://www.linkedin.com/in/b%C3%ACnh-minh-4a953434b/",
};

export type PortfolioCopy = {
  nav: {
    work: string;
    experience: string;
    skills: string;
    about: string;
    resume: string;
    contact: string;
    menu: string;
    close: string;
    switchLangAria: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subline: string;
    status: string;
    roleHeadline: string;
    statement: string;
    body: string;
    primary: string;
    secondary: string;
  };
  carousel: {
    slides: Array<{ tag: string; title: string; desc: string }>;
    narrativeHeadline: string;
    narrativeBody: string;
    prevSlide: string;
    nextSlide: string;
  };
  work: {
    sectionLabel: string;
    systemsLive: string;
    copyCli: string;
    copied: string;
    openSystem: string;
    architecture: string;
    title: string;
    body: string;
    source: string;
    live: string;
    statusLive: string;
    preview: string;
    storyLabels: { problem: string; approach: string; outcome: string };
  };
  experience: {
    sectionLabel: string;
    eyebrow: string;
    title: string;
    role: string;
    period: string;
    columns: {
      problemLabel: string;
      problemDesc: string;
      approachLabel: string;
      approachDesc: string;
      outcomeLabel: string;
      outcomeDesc: string;
    };
    tags: string[];
    body: string;
    story: { problem: string; approach: string; outcome: string };
  };
  education: {
    sectionLabel: string;
    eyebrow: string;
    degree: string;
    school: string;
    gpaText: string;
    coursework: string;
    tags: string[];
    title: string;
    recognitionEyebrow: string;
    recognitions: Array<{ title: string; subtitle: string; tags: string[] }>;
    recognition: { label: string; title: string; detail: string };
  };
  stack: {
    cliLabel: string;
    browseBlueprint: string;
    modernTechStack: { line1: string; line2: string };
    professionalAt: string;
  };
  cta: {
    headline: string;
    startProject: string;
  };
  contact: {
    title: string;
    body: string;
    email: string;
    cv: string;
    close: string;
    primaryLabel: string;
    responseSla: string;
    copyEmail: string;
    copiedEmail: string;
    openGmail: string;
    defaultMail: string;
    mailSubject: string;
    mailBody: string;
    cvTitle: string;
    cvSubtitle: string;
    downloadCv: string;
    phoneLabel: string;
  };
  aboutDrawer: {
    headerLabel: string;
    close: string;
    founderName: string;
    founderRole: string;
    founderStatus: string;
    downloadCv: string;
    bioParagraphs: string[];
    productsLabel: string;
    productsList: string[];
    stackLabel: string;
    stackList: string[];
    educationLabel: string;
    degree: string;
    schoolMeta: string;
    awardTitle: string;
    awardMeta: string;
    principlesLabel: string;
    principlesList: string[];
    cvPdf: string;
  };
  footer: {
    navigation: string;
    studioDetails: string;
    location: {
      based: string;
      mode: string;
    };
    askAiTitle: string;
    askAiPrompt: string;
    askAiHint: string;
    askAiAria: string;
    connect: string;
    backToTop: string;
    availability: string;
    copyright: string;
  };
  ocean: {
    reloadAria: string;
    quote: string;
    holdPrompt: string;
    stirring: string;
    equilibrium: string;
  };
  skills: { title: string; groups: Array<{ label: string; proof: string; items: string[] }> };
};

export const copy: Localized<PortfolioCopy> = {
  en: {
    nav: {
      work: "Products",
      experience: "Experience",
      skills: "Skills",
      about: "About",
      resume: "DevOps CV ↗",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      switchLangAria: "Switch language to Vietnamese",
    },
    hero: {
      eyebrow: "A SYSTEMS STUDIO",
      headline: "RELIABLE\nDELIVERY",
      subline: "INFRASTRUCTURE AS CODE · GITOPS PLATFORMS · CRAFT WEB SYSTEMS",
      status: "Available for DevOps opportunities",
      roleHeadline: "DevOps Engineer",
      statement: "I build delivery systems that are easier to ship, operate and recover.",
      body: "Software Engineering graduate focused on the delivery systems behind dependable services: CI/CD, containers, Linux infrastructure and practical security controls.",
      primary: "Start a project",
      secondary: "Download DevOps CV",
    },
    carousel: {
      slides: [
        {
          tag: "01/03",
          title: "CLI & REPEATABILITY",
          desc: "Every application and infrastructure configuration is provisioned predictably through CLI and GitOps automation, with zero unreproducible manual clicks.",
        },
        {
          tag: "02/03",
          title: "GITOPS & ZERO-TRUST",
          desc: "Continuous reconciliation with Argo CD, rootless Podman execution, and strict Zero-Trust Tailscale mesh networking for all interconnected host nodes.",
        },
        {
          tag: "03/03",
          title: "OBSERVABILITY & RECOVERY",
          desc: "Real-time metrics, automated SLO tracking, instant alerting with n8n webhooks, and sub-second automated recovery baselines.",
        },
      ],
      narrativeHeadline: "I build delivery systems that are easier to ship, operate and recover, spanning self-hosted homelabs, GitOps CI/CD pipelines, and high-performance web platforms. Every release is repeatable, observable, and fully under your control.",
      narrativeBody: "Software Engineering graduate from HUTECH University (GPA 3.24/4.0), founder of ThinkAI Studio. Grounded in real-world DevOps practices: rootless Podman container orchestration, SAST security quality gates at Ung Buou Hospital, and zero-trust mesh networking.",
      prevSlide: "Previous slide",
      nextSlide: "Next slide",
    },
    work: {
      sectionLabel: "Products",
      systemsLive: "03 Systems Live",
      copyCli: "COPY CLI",
      copied: "COPIED",
      openSystem: "Open System",
      architecture: "Architecture & Case Study",
      title: "The work behind the release.",
      body: "Two case studies grounded in CV outcomes and repository evidence: a private operations workbench and an education-platform delivery path.",
      source: "View source",
      live: "Visit live",
      statusLive: "LIVE",
      preview: "OpenScreen preview",
      storyLabels: { problem: "Challenge", approach: "Engineering decision", outcome: "Evidence delivered" },
    },
    experience: {
      sectionLabel: "Experience",
      eyebrow: "HOSPITAL SAST SECURITY GATES",
      title: "Information Security & Operations Intern",
      role: "Information Security & Operations Intern",
      period: "Ho Chi Minh City Oncology Hospital · 05/2026 – 07/2026",
      columns: {
        problemLabel: "PROBLEM",
        problemDesc: "Hospital Web & API systems faced CSRF risks, legacy packages, and lacked automated security gating.",
        approachLabel: "APPROACH",
        approachDesc: "Integrated SAST (SonarQube & CodeQL) into GitHub Actions; resolved vulnerabilities and standardized secure FTP baselines.",
        outcomeLabel: "OUTCOME",
        outcomeDesc: "100% of High/Medium SAST vulnerabilities remediated before release; established continuous automated security gates.",
      },
      tags: [".NET 8", "CodeQL SAST", "SonarQube Gates", "CSRF Remediation", "Package Fixes", "FTP Secure Baseline"],
      body: "A DevOps internship focused on safeguarding an internal .NET workflow and making its delivery path repeatable.",
      story: {
        problem: "An internal .NET procurement workflow needed stronger request boundaries and a repeatable release path before its approved hospital deployment.",
        approach: "I added GitHub Actions checks, CodeQL and SonarQube visibility, API-security review, CSRF remediation and package-vulnerability fixes; repository contracts clarify the access and request risks behind those controls.",
        outcome: "The release baseline put checks before handoff and supported deployment to the hospital server through the approved FTP workflow.",
      },
    },
    education: {
      sectionLabel: "Education",
      eyebrow: "EDUCATION",
      degree: "Bachelor of Software Engineering",
      school: "HUTECH University · 2022 - 2026",
      gpaText: "GPA: 3.24 / 4.0 · English Proficiency: B1",
      coursework: "Focused coursework on Cloud Computing, Distributed Systems, Network Security, Linux Administration, and Software Architecture.",
      tags: ["GPA 3.24", "Software Engineering", "HUTECH 2022-2026", "English B1"],
      title: "A software engineering foundation.",
      recognitionEyebrow: "RECOGNITION",
      recognitions: [
        {
          title: "IT Got Talent 2025",
          subtitle: "Semifinalist Award · Top Technical Talent Recognition",
          tags: ["IT Got Talent 2025", "Semifinalist", "Top Technical Talent", "DevOps Focus"],
        },
      ],
      recognition: { label: "Recognition", title: "IT Got Talent 2025", detail: "Semifinalist" },
    },
    stack: {
      cliLabel: "CLI",
      browseBlueprint: "Browse Architecture Blueprint",
      modernTechStack: { line1: "MODERN", line2: "TECH STACK" },
      professionalAt: "PROFESSIONAL AT",
    },
    cta: {
      headline: "RELIABLE\nSYSTEMS\nYOU OWN\n→ SHIP",
      startProject: "Start a project",
    },
    contact: {
      title: "Start a Project",
      body: "Have a web platform, self-hosted infrastructure, or systems project in mind? Reach out directly via email or your preferred mail client:",
      email: "Email Minh",
      cv: "Download DevOps CV",
      close: "Close",
      primaryLabel: "(PRIMARY CONTACT)",
      responseSla: "4-8h Response SLA",
      copyEmail: "Copy Email",
      copiedEmail: "Copied!",
      openGmail: "Open in Gmail",
      defaultMail: "Default Mail App",
      mailSubject: "Project Inquiry · ThinkAI Studio",
      mailBody: "Hi Binh Minh,\n\nI would like to discuss a project regarding...\n\n- Scope/Needs:\n- Timeline:\n- Budget range:\n\nBest regards,",
      cvTitle: "DevOps Curriculum Vitae",
      cvSubtitle: "Nguyen Binh Minh · 2026 Updated · B.S. Software Engineering (PDF)",
      downloadCv: "Download CV",
      phoneLabel: "Phone / Zalo:",
    },
    aboutDrawer: {
      headerLabel: "About the engineer & studio",
      close: "Close",
      founderName: "Nguyen Binh Minh",
      founderRole: "DevOps & Systems Engineer · Founder of ThinkAI Studio",
      founderStatus: "HCMC, Vietnam · Available for Engineering & Projects",
      downloadCv: "Download DevOps CV (PDF)",
      bioParagraphs: [
        "Hey, I'm Binh Minh. I engineer reliable infrastructure, GitOps CI/CD delivery pipelines, and high-performance web systems under ThinkAI Studio, focused on infrastructure as code, automated workflows, and Zero-Trust security primitives.",
        "I focus on the intersection of systems engineering, automated security gating, and craft product experiences: from bare-metal servers (HostDeck) to enterprise K3s pipelines and high-speed web platforms.",
        "I believe the mix of disciplined systems thinking and deep observability is what makes software delivery predictable, resilient, and bulletproof.",
      ],
      productsLabel: "Products",
      productsList: [
        "HostDeck Bare-Metal Console (hostdeck.thinkai.id.vn)",
        "ThinkAI Delivery Platform (learning.thinkai.id.vn)",
        "Hospital SAST Quality Gate Automation",
      ],
      stackLabel: "Stack",
      stackList: [
        "Go & Kubernetes (K3s)",
        "Rootless Podman & Docker",
        "Tailscale Zero-Trust Mesh",
        "GitHub Actions & Argo CD",
        "SonarQube & CodeQL SAST",
        "Next.js & Modern Frontend Systems",
      ],
      educationLabel: "Education",
      degree: "B.S. in Software Engineering",
      schoolMeta: "HUTECH University · 2022-2026 · GPA 3.24 / 4.0 · English B1",
      awardTitle: "IT Got Talent 2025 Semifinalist",
      awardMeta: "Top Technical Talent Recognition · HUTECH University",
      principlesLabel: "Principles",
      principlesList: [
        "Infrastructure as Code (Declarative Everything)",
        "Continuous Observability & Automated SLOs",
        "Zero-Trust Security by Default",
        "Repeatability over Manual Clicks",
      ],
      cvPdf: "CV (PDF)",
    },
    footer: {
      navigation: "Navigation",
      studioDetails: "(STUDIO DETAILS)",
      location: {
        based: "Based in Vietnam.",
        mode: "Remote-first. Working worldwide.",
      },
      askAiTitle: "(ASK AI ABOUT BINH MINH · THINKAI STUDIO)",
      askAiPrompt: `Please analyze and summarize the background, engineering skills, and portfolio of Binh Minh (Nguyen Binh Minh), a DevOps & Systems Engineer based in Vietnam and the creator of ThinkAI Studio.

Key information & resources:
- Portfolio & Studio: https://binhminh.thinkai.id.vn
- GitHub: https://github.com/bnhminh1010
- Key Production Projects & Systems:
  1. HostDeck Bare-Metal Console (https://hostdeck.thinkai.id.vn) - Homelab multi-node observability, rootless Podman container orchestration, automated backups, and 1-line CLI installer.
  2. ThinkAI Delivery Platform (https://learning.thinkai.id.vn) - Continuous GitOps CI/CD delivery platform with Argo CD, Tailscale Zero-Trust mesh networking, and automated recovery baselines.
  3. Enterprise SAST Quality Gates & Security Hardening (Healthcare Web & API Infrastructure at Ho Chi Minh City Oncology Hospital with SonarQube & CodeQL).
- Core Technical Stack: Go, Kubernetes (K3s), Linux Administration, Docker, Podman, Argo CD, SonarQube SAST Security Gates, PostgreSQL, Tailscale Zero-Trust, Next.js.
- Academic Background & Honors: Bachelor of Software Engineering from HUTECH University (GPA 3.24/4.0), IT Got Talent 2025 Semifinalist.

Provide a comprehensive technical assessment of his architectural expertise, DevOps & systems engineering capabilities, and craft web delivery standards.`,
      askAiHint: "Click to query ChatGPT, Gemini, Claude, Perplexity or Manus with engineering background & studio products.",
      askAiAria: "Ask {name} about Binh Minh and ThinkAI Studio",
      connect: "(CONNECT)",
      backToTop: "Back to top ↑",
      availability: "Open for DevOps, Systems & Web Engineering",
      copyright: "ThinkAI Studio · Binh Minh",
    },
    ocean: {
      reloadAria: "Reload and return to top",
      quote: "『Reliable Infrastructure for Production.』",
      holdPrompt: "HOLD TO CREATE WAVES (PRESS & HOLD)",
      stirring: "STIRRING OCEAN TIDES",
      equilibrium: "EQUILIBRIUM REACHED · WAVES SURGING",
    },
    skills: {
      title: "Capabilities proven in the work.",
      groups: [
        { label: "Build and automate", proof: "Source checks, container builds and repeatable delivery paths represented in the work above.", items: ["Go", "Git", "GitHub Actions", "Spring Boot", "Docker"] },
        { label: "Operate and recover", proof: "Operate containerized services with private connectivity, host controls and retained service evidence.", items: ["Podman", "Tailscale", "SQLite", "PostgreSQL", "Redis", "WebSocket", "systemd", "K3s"] },
        { label: "Protect and deliver", proof: "Quality gates and security controls used before handing work to production.", items: ["CodeQL", "SonarQube", "Trivy", "Argo CD"] },
        { label: "Familiar with", proof: "Used in labs, coursework or smaller exercises; not presented here as production evidence.", items: ["Python", "Bash", "GitLab CI/CD", "Terraform", "Cloudflare"] },
      ],
    },
  },
  vi: {
    nav: {
      work: "Sản phẩm",
      experience: "Kinh nghiệm",
      skills: "Kỹ năng",
      about: "Giới thiệu",
      resume: "CV DevOps ↗",
      contact: "Liên hệ",
      menu: "Menu",
      close: "Đóng",
      switchLangAria: "Chuyển sang Tiếng Anh",
    },
    hero: {
      eyebrow: "STUDIO HỆ THỐNG & VẬN HÀNH",
      headline: "PHÁT HÀNH\nTIN CẬY",
      subline: "HẠ TẦNG DẠNG MÃ NGUỒN · NỀN TẢNG GITOPS · HỆ THỐNG WEB TINH GỌN",
      status: "Sẵn sàng cho cơ hội DevOps",
      roleHeadline: "Kỹ sư DevOps",
      statement: "Tôi xây hệ thống phân phối dễ phát hành, vận hành và phục hồi hơn.",
      body: "Kỹ sư Phần mềm mới tốt nghiệp, tập trung vào hệ thống phía sau các dịch vụ đáng tin cậy: CI/CD, container, Linux infrastructure và kiểm soát bảo mật thực dụng.",
      primary: "Bắt đầu dự án",
      secondary: "Tải CV DevOps",
    },
    carousel: {
      slides: [
        {
          tag: "01/03",
          title: "CLI & KHẢ NĂNG LẶP LẠI",
          desc: "Mọi ứng dụng và cấu hình hạ tầng đều được cấp phát dự đoán được qua CLI và tự động hóa GitOps, hoàn toàn không thao tác thủ công thiếu kiểm soát.",
        },
        {
          tag: "02/03",
          title: "GITOPS & ZERO-TRUST",
          desc: "Đồng bộ liên tục với Argo CD, vận hành Podman rootless và mạng Tailscale Zero-Trust riêng tư cho mọi máy chủ kết nối.",
        },
        {
          tag: "03/03",
          title: "GIÁM SÁT & PHỤC HỒI",
          desc: "Chỉ số thời gian thực, tự động theo dõi SLO, cảnh báo tức thì qua webhook n8n và baseline tự động phục hồi dưới một giây.",
        },
      ],
      narrativeHeadline: "Tôi xây dựng các hệ thống phân phối dễ phát hành, vận hành và phục hồi hơn, từ homelab bare-metal cá nhân, CI/CD pipeline GitOps đến nền tảng web hiệu năng cao. Mỗi bản phát hành đều lặp lại được, đo lường được và hoàn toàn trong tầm kiểm soát.",
      narrativeBody: "Cử nhân Kỹ thuật Phần mềm từ Đại học HUTECH (GPA 3.24/4.0), người sáng lập ThinkAI Studio. Thực chứng qua kinh nghiệm DevOps thực tế: điều phối container Podman rootless, cổng kiểm soát bảo mật SAST tại Bệnh viện Ung Bướu và mạng riêng ảo zero-trust.",
      prevSlide: "Slide trước",
      nextSlide: "Slide tiếp theo",
    },
    work: {
      sectionLabel: "Sản phẩm",
      systemsLive: "03 Hệ thống trực tiếp",
      copyCli: "SAO CHÉP CLI",
      copied: "ĐÃ CHÉP",
      openSystem: "Mở Hệ Thống",
      architecture: "Kiến trúc & Báo cáo",
      title: "Công việc phía sau mỗi lần phát hành.",
      body: "Hai case study đặt kết quả trong CV cạnh bằng chứng repository: một operations workbench riêng tư và một delivery path cho nền tảng giáo dục.",
      source: "Xem mã nguồn",
      live: "Xem live",
      statusLive: "TRỰC TUYẾN",
      preview: "Xem preview OpenScreen",
      storyLabels: { problem: "Thách thức", approach: "Quyết định kỹ thuật", outcome: "Bằng chứng bàn giao" },
    },
    experience: {
      sectionLabel: "Kinh nghiệm",
      eyebrow: "CỔNG BẢO MẬT SAST BỆNH VIỆN",
      title: "Thực tập sinh An toàn thông tin & Vận hành",
      role: "Thực tập sinh An toàn thông tin & Vận hành",
      period: "Bệnh viện Ung Bướu TP. Hồ Chí Minh · 05/2026 – 07/2026",
      columns: {
        problemLabel: "THÁCH THỨC",
        problemDesc: "Hệ thống Web & API bệnh viện đối mặt với rủi ro CSRF, thư viện lỗi thời và thiếu kiểm tra bảo mật tự động.",
        approachLabel: "GIẢI PHÁP",
        approachDesc: "Tích hợp SAST (SonarQube & CodeQL) vào GitHub Actions; khắc phục lỗ hổng và chuẩn hóa baseline FTP an toàn.",
        outcomeLabel: "KẾT QUẢ",
        outcomeDesc: "Khắc phục 100% lỗ hổng SAST mức High/Medium trước khi phát hành; thiết lập cổng kiểm soát bảo mật tự động liên tục.",
      },
      tags: [".NET 8", "SAST CodeQL", "Cổng SonarQube", "Xử lý CSRF", "Vá lỗ hổng gói", "Baseline FTP an toàn"],
      body: "Kỳ thực tập DevOps tập trung vào bảo vệ workflow .NET nội bộ và làm cho đường phát hành có thể lặp lại.",
      story: {
        problem: "Một workflow mua sắm .NET nội bộ cần boundary request chặt hơn và một đường phát hành lặp lại được trước khi triển khai theo quy trình bệnh viện đã duyệt.",
        approach: "Tôi bổ sung GitHub Actions, CodeQL, SonarQube, rà soát API, xử lý CSRF và package-vulnerability; các contract trong repo làm rõ rủi ro access/request mà các kiểm soát này giải quyết.",
        outcome: "Baseline phát hành đặt kiểm tra trước handoff và hỗ trợ triển khai lên máy chủ bệnh viện qua FTP workflow được phê duyệt.",
      },
    },
    education: {
      sectionLabel: "Học vấn",
      eyebrow: "HỌC VẤN",
      degree: "Cử nhân Kỹ thuật Phần mềm",
      school: "Đại học HUTECH · 2022 - 2026",
      gpaText: "GPA: 3.24 / 4.0 · Trình độ tiếng Anh: B1",
      coursework: "Chuyên sâu về Điện toán đám mây, Hệ thống phân tán, An toàn mạng, Quản trị Linux và Kiến trúc phần mềm.",
      tags: ["GPA 3.24", "Kỹ thuật Phần mềm", "HUTECH 2022-2026", "Tiếng Anh B1"],
      title: "Nền tảng kỹ thuật phần mềm.",
      recognitionEyebrow: "GHI NHẬN & GIẢI THƯỞNG",
      recognitions: [
        {
          title: "IT Got Talent 2025",
          subtitle: "Giải Bán kết · Cuộc thi Tài năng Kỹ thuật Hàng đầu",
          tags: ["IT Got Talent 2025", "Bán kết", "Tài năng Kỹ thuật", "Trọng tâm DevOps"],
        },
      ],
      recognition: { label: "Ghi nhận", title: "IT Got Talent 2025", detail: "Bán kết" },
    },
    stack: {
      cliLabel: "CLI",
      browseBlueprint: "Xem Bản vẽ Kiến trúc",
      modernTechStack: { line1: "CÔNG NGHỆ", line2: "HIỆN ĐẠI" },
      professionalAt: "NĂNG LỰC CHUYÊN SÂU",
    },
    cta: {
      headline: "HỆ THỐNG\nTIN CẬY\nLÀM CHỦ\n→ TRIỂN KHAI",
      startProject: "Bắt đầu dự án",
    },
    contact: {
      title: "Bắt đầu dự án",
      body: "Bạn đang ấp ủ một nền tảng web, hạ tầng tự vận hành (self-hosted) hay một dự án hệ thống? Hãy liên hệ trực tiếp qua email hoặc ứng dụng thư điện tử của bạn:",
      email: "Email cho Minh",
      cv: "Tải CV DevOps",
      close: "Đóng",
      primaryLabel: "(LIÊN HỆ CHÍNH)",
      responseSla: "Phản hồi trong 4-8h",
      copyEmail: "Sao chép Email",
      copiedEmail: "Đã chép!",
      openGmail: "Mở trong Gmail",
      defaultMail: "Ứng dụng Mail mặc định",
      mailSubject: "Trao đổi dự án · ThinkAI Studio",
      mailBody: "Chào Bình Minh,\n\nTôi muốn thảo luận về dự án liên quan đến...\n\n- Phạm vi / Nhu cầu:\n- Thời gian dự kiến:\n- Ngân sách ước tính:\n\nTrân trọng,",
      cvTitle: "Hồ sơ Năng lực DevOps",
      cvSubtitle: "Nguyễn Bình Minh · Cập nhật 2026 · Cử nhân Kỹ thuật Phần mềm (PDF)",
      downloadCv: "Tải CV",
      phoneLabel: "Điện thoại / Zalo:",
    },
    aboutDrawer: {
      headerLabel: "Về kỹ sư & studio",
      close: "Đóng",
      founderName: "Nguyễn Bình Minh",
      founderRole: "Kỹ sư DevOps & Hệ thống · Sáng lập ThinkAI Studio",
      founderStatus: "TP. Hồ Chí Minh, Việt Nam · Sẵn sàng cho dự án & công việc kỹ thuật",
      downloadCv: "Tải CV DevOps (PDF)",
      bioParagraphs: [
        "Xin chào, tôi là Bình Minh. Tôi xây dựng các hệ thống hạ tầng tin cậy, quy trình GitOps CI/CD và website hiệu năng cao dưới thương hiệu ThinkAI Studio, tập trung vào cấu hình dạng mã nguồn (IaC), tự động hóa, và quy trình bảo mật Zero-Trust.",
        "Tôi tập trung vào giao điểm giữa kỹ thuật hệ thống, an toàn thông tin và trải nghiệm sản phẩm: từ máy chủ Bare-Metal (HostDeck), cụm K3s Kubernetes đến website mượt mà tối ưu chi phí.",
        "Tôi tin rằng sự kết hợp giữa tư duy hệ thống chặt chẽ và khả năng giám sát toàn diện (Observability) là chìa khóa để giữ cho mọi bản phát hành luôn ổn định, an toàn và dễ phục hồi.",
      ],
      productsLabel: "Sản phẩm",
      productsList: [
        "HostDeck Bare-Metal Console (hostdeck.thinkai.id.vn)",
        "Nền tảng phân phối ThinkAI (learning.thinkai.id.vn)",
        "Tự động hóa cổng kiểm soát SAST bệnh viện",
      ],
      stackLabel: "Công nghệ",
      stackList: [
        "Go & Kubernetes (K3s)",
        "Rootless Podman & Docker",
        "Mạng Tailscale Zero-Trust",
        "GitHub Actions & Argo CD",
        "SonarQube & CodeQL SAST",
        "Next.js & Hệ thống Frontend hiện đại",
      ],
      educationLabel: "Học vấn",
      degree: "Cử nhân Kỹ thuật Phần mềm",
      schoolMeta: "Đại học HUTECH · 2022-2026 · GPA 3.24 / 4.0 · Tiếng Anh B1",
      awardTitle: "Bán kết IT Got Talent 2025",
      awardMeta: "Vinh danh tài năng kỹ thuật xuất sắc · Đại học HUTECH",
      principlesLabel: "Nguyên tắc cốt lõi",
      principlesList: [
        "Hạ tầng dạng mã nguồn (Khai báo toàn diện)",
        "Giám sát liên tục & Tự động hóa chỉ số SLO",
        "Bảo mật Zero-Trust mặc định",
        "Khả năng lặp lại thay vì thao tác thủ công",
      ],
      cvPdf: "CV (PDF)",
    },
    footer: {
      navigation: "Điều hướng",
      studioDetails: "(THÔNG TIN STUDIO)",
      location: {
        based: "Trụ sở tại Việt Nam.",
        mode: "Làm việc từ xa. Phục vụ toàn cầu.",
      },
      askAiTitle: "(HỎI AI VỀ BÌNH MINH · THINKAI STUDIO)",
      askAiPrompt: `Vui lòng phân tích và tóm tắt năng lực kỹ thuật, tiểu sử và portfolio của Nguyễn Bình Minh (Bình Minh), Kỹ sư DevOps & Hệ thống tại Việt Nam và là nhà sáng lập ThinkAI Studio.

Thông tin và tài nguyên chính:
- Portfolio & Studio: https://binhminh.thinkai.id.vn
- GitHub: https://github.com/bnhminh1010
- Các dự án và hệ thống trọng điểm:
  1. HostDeck Bare-Metal Console (https://hostdeck.thinkai.id.vn) - Giám sát bare-metal homelab đa node, điều phối container Podman rootless, sao lưu SQLite tự động và bộ cài CLI 1 dòng lệnh.
  2. Nền tảng phân phối ThinkAI (https://learning.thinkai.id.vn) - Nền tảng phân phối GitOps CI/CD liên tục với Argo CD, mạng Tailscale Zero-Trust riêng tư và baseline tự động phục hồi.
  3. Kiểm soát chất lượng SAST & Gia cố bảo mật (Hạ tầng Web & API tại Bệnh viện Ung Bướu TP.HCM với SonarQube & CodeQL).
- Kỹ năng cốt lõi: Go, Kubernetes (K3s), Quản trị Linux, Docker, Podman, Argo CD, SonarQube SAST, PostgreSQL, Tailscale Zero-Trust, Next.js.
- Học vấn & Giải thưởng: Cử nhân Kỹ thuật Phần mềm Đại học HUTECH (GPA 3.24/4.0), Bán kết IT Got Talent 2025.

Hãy đưa ra đánh giá kỹ thuật toàn diện về chuyên môn kiến trúc, năng lực kỹ thuật hệ thống & DevOps, cùng tiêu chuẩn phân phối web hiện đại của anh ấy.`,
      askAiHint: "Bấm để hỏi ChatGPT, Gemini, Claude, Perplexity hoặc Manus về kỹ năng kỹ thuật & các sản phẩm của studio.",
      askAiAria: "Hỏi {name} về Bình Minh và ThinkAI Studio",
      connect: "(KẾT NỐI)",
      backToTop: "Về đầu trang ↑",
      availability: "Sẵn sàng cho các dự án DevOps, Hệ thống & Web Engineering",
      copyright: "ThinkAI Studio · Bình Minh",
    },
    ocean: {
      reloadAria: "Tải lại và về đầu trang",
      quote: "『Hạ tầng tin cậy sẵn sàng cho Production.』",
      holdPrompt: "GIỮ CHUỘT ĐỂ TẠO SÓNG (NHẤN & GIỮ)",
      stirring: "ĐANG KHUẤY ĐỘNG THỦY TRIỀU",
      equilibrium: "ĐẠT TRẠNG THÁI CÂN BẰNG · SÓNG DÂNG TRÀO",
    },
    skills: {
      title: "Năng lực được chứng minh qua công việc.",
      groups: [
        { label: "Xây dựng và tự động hóa", proof: "Source check, container build và delivery path có thể lặp lại xuất hiện trong các phần phía trên.", items: ["Go", "Git", "GitHub Actions", "Spring Boot", "Docker"] },
        { label: "Vận hành và phục hồi", proof: "Vận hành service container với kết nối riêng, host control và service evidence được lưu lại.", items: ["Podman", "Tailscale", "SQLite", "PostgreSQL", "Redis", "WebSocket", "systemd", "K3s"] },
        { label: "Bảo vệ và phân phối", proof: "Quality gate và security control được dùng trước khi bàn giao production.", items: ["CodeQL", "SonarQube", "Trivy", "Argo CD"] },
        { label: "Đã làm quen", proof: "Đã dùng trong lab, môn học hoặc bài tập nhỏ; không trình bày tại đây như bằng chứng production.", items: ["Python", "Bash", "GitLab CI/CD", "Terraform", "Cloudflare"] },
      ],
    },
  },
};

export const projects: Project[] = [
  {
    id: "thinkai-ui",
    repo: "https://github.com/bnhminh1010/thinkai-ui",
    liveUrl: "https://ui.thinkai.id.vn",
    cliCommand: "npx thinkai-ui init",
    period: "2026",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Motion", "Radix UI", "Three.js"],
    accent: "emerald",
    mark: "UI",
    metric: {
      value: "CLI",
      label: {
        en: "npx thinkai-ui init • 47 Components Ready",
        vi: "npx thinkai-ui init • 47 Components Sẵn Sàng",
      },
    },
    evidence: {
      cv: "Decentralized architectural UI registry with 47 zero-radius primitives, dynamic alpha hairlines, and mechanical spring physics.",
      repository: [
        { claim: "Registry schema & generator engine", url: "https://github.com/bnhminh1010/thinkai-ui" },
        { claim: "47 production-grade components manifest", url: "https://ui.thinkai.id.vn/r/registry.json" },
      ],
    },
    preview: {
      assetStem: "thinkai-ui-preview",
      image: "/images/products/thinkai-ui-screen.png",
      ready: true,
      capture: {
        en: "Interactive component workbench with live preview, code inspection, and 1-click CLI installer.",
        vi: "Component workbench tương tác với live preview, code inspector và bộ cài đặt CLI 1-click.",
      },
    },
    content: {
      en: {
        category: "Decentralized Architectural UI Registry",
        title: "ThinkAI UI",
        summary: "An infrastructure-grade component registry crafted with 0px sharp geometry, obsidian depth, and mechanical spring physics.",
        story: {
          problem: "Modern frontend codebases suffer from severe runtime bundle bloat, monolithic component coupling, and the lack of a zero-overhead CLI distribution model for precision studio design systems.",
          approach: "I built a decentralized shadcn/ui-compatible registry hosting 47 primitives with strict 0px geometry, dynamic alpha hairlines, and calibrated spring physics (damping: 32, stiffness: 280).",
          outcome: "Developers install primitives instantly via CLI with zero runtime overhead, 100% WCAG AAA contrast, and native TypeScript type safety.",
        },
        diagramLabel: "CLI Request → Registry API (/r/*.json) → AST Transformer → Zero-Runtime Component",
      },
      vi: {
        category: "Thư viện Component Hạ Tầng Phân Tán",
        title: "ThinkAI UI",
        summary: "Registry component kiến trúc cao cấp với hình học 0px sắc nét, sắc thái obsidian thuần khiết và vật lý lò xo cơ học.",
        story: {
          problem: "Hệ sinh thái frontend hiện nay đối mặt với gánh nặng bundle runtime phình to, sự phụ thuộc cứng nhắc vào các thư viện monolithic cồng kềnh và thiếu cơ chế phân phối CLI độc lập cho studio design system.",
          approach: "Tôi xây dựng registry phân tán tương thích chuẩn shadcn/ui gồm 47 primitive với hình học 0px, viền hairline alpha và vật lý chuyển động lò xo chính xác.",
          outcome: "Lập trình viên cài đặt trực tiếp qua CLI không runtime overhead, đáp ứng chuẩn tương phản WCAG AAA và an toàn kiểu dữ liệu 100%.",
        },
        diagramLabel: "CLI Request → Registry API (/r/*.json) → Bộ chuyển đổi AST → Component Zero-Runtime",
      },
    },
    architecture: {
      specId: "SPEC-TAI-UI-2026",
      constraint: {
        en: "Constraint: Zero-Runtime Dependency & Tree-Shakeable Source",
        vi: "Ràng buộc: Không phụ thuộc runtime & Mã nguồn Tree-shakeable",
      },
      mechanism: {
        en: "Mechanism: AST Source Synthesis & Decentralized CLI Registry",
        vi: "Cơ chế: Tổng hợp mã nguồn AST & Registry phân phối qua CLI",
      },
      standard: {
        en: "Standard: WCAG AAA 7:1 Contrast & Pure TypeScript Strictness",
        vi: "Tiêu chuẩn: Tương phản WCAG AAA 7:1 & TypeScript Nghiêm ngặt",
      },
      flowSteps: [
        {
          step: "01",
          title: "CLI Trigger",
          protocol: "npx / HTTPS",
          status: "ACTIVE",
          subtitle: {
            en: "Automated CLI initialization & component fetch without package install",
            vi: "Khởi tạo CLI tự động & tải component không cần cài package runtime",
          },
        },
        {
          step: "02",
          title: "Registry API",
          protocol: "HTTP/2 JSON",
          status: "VERIFIED",
          subtitle: {
            en: "Static manifests served via /r/[name].json with schema validation",
            vi: "Manifest tĩnh phục vụ qua /r/[name].json kèm kiểm tra schema",
          },
        },
        {
          step: "03",
          title: "AST Engine",
          protocol: "TypeScript Compiler",
          status: "TRANSFORM",
          subtitle: {
            en: "In-place Tailwind v4 class synthesis and local token resolution",
            vi: "Tổng hợp class Tailwind v4 và phân giải design token tại chỗ",
          },
        },
        {
          step: "04",
          title: "Zero-Runtime Primitive",
          protocol: "Native React 19",
          status: "OPTIMIZED",
          subtitle: {
            en: "0px sharp geometry, dynamic alpha hairlines, and spring physics",
            vi: "Hình học 0px sắc nét, viền hairline alpha và vật lý chuyển động lò xo",
          },
        },
      ],
      securityCards: [
        {
          title: {
            en: "AST Injection Immunity",
            vi: "Miễn nhiễm can thiệp AST",
          },
          description: {
            en: "Raw TypeScript source code is written directly to the project tree. No opaque runtime wrappers, eliminating prototype pollution and hidden execution vectors.",
            vi: "Mã nguồn TypeScript được ghi trực tiếp vào project tree. Không có wrapper runtime mờ ám, triệt tiêu nguy cơ prototype pollution và rủi ro thực thi ngầm.",
          },
          tag: "SUPPLY-CHAIN SAFE",
          icon: "shield",
        },
        {
          title: {
            en: "Static Supply-Chain Provenance",
            vi: "Xác thực chuỗi cung ứng tĩnh",
          },
          description: {
            en: "All 47 component manifests validate strictly against public JSON schemas with immutable GitHub release tags and SHA integrity checks.",
            vi: "Toàn bộ 47 manifest component được xác thực nghiêm ngặt theo JSON schema công khai với tag phát hành GitHub bất biến và kiểm tra toàn vẹn SHA.",
          },
          tag: "SCHEMA VERIFIED",
          icon: "check",
        },
        {
          title: {
            en: "Strict WCAG AAA Automated Gates",
            vi: "Quality Gate tương phản WCAG AAA",
          },
          description: {
            en: "Design tokens enforce minimum 7:1 contrast ratios across obsidian dark mode, with mandatory focus-visible indicators and ARIA semantics.",
            vi: "Design tokens áp dụng tỉ lệ tương phản tối thiểu 7:1 trên nền dark obsidian, bắt buộc có chỉ báo focus-visible và chuẩn ngữ nghĩa ARIA.",
          },
          tag: "A11Y AAA",
          icon: "lock",
        },
        {
          title: {
            en: "Deterministic Zero-Runtime Tree-Shaking",
            vi: "Tree-shaking không runtime thừa",
          },
          description: {
            en: "Pure ES modules marked with sideEffects: false guarantee 0kB dead code in production bundles; components compile away with pure Tailwind classes.",
            vi: "Module ES thuần cấu hình sideEffects: false bảo đảm 0kB code thừa trong bundle production; component chỉ chứa class Tailwind thuần túy.",
          },
          tag: "0kB OVERHEAD",
          icon: "code",
        },
      ],
      specSnippet: {
        filename: "r/button.json",
        language: "json",
        code: `{\n  "$schema": "https://ui.thinkai.id.vn/schema/registry-item.json",\n  "name": "button",\n  "type": "registry:ui",\n  "title": "Architectural Button",\n  "dependencies": ["@radix-ui/react-slot"],\n  "registryDependencies": ["utils"],\n  "files": [\n    {\n      "path": "ui/button.tsx",\n      "type": "registry:ui",\n      "target": "components/ui/button.tsx"\n    }\n  ]\n}`,
      },
      provenance: [
        {
          hash: "4a71b2e",
          message: {
            en: "feat: decentralized CLI registry schema & 47 primitives manifest",
            vi: "feat: schema registry phân tán qua CLI và manifest 47 primitive",
          },
          branch: "main",
          url: "https://github.com/bnhminh1010/thinkai-ui",
          verified: true,
        },
        {
          hash: "9f32c10",
          message: {
            en: "feat: zero-radius architectural tokens & spring physics integration",
            vi: "feat: design tokens kiến trúc góc nhọn 0px và tích hợp vật lý lò xo",
          },
          branch: "main",
          url: "https://ui.thinkai.id.vn/r/registry.json",
          verified: true,
        },
      ],
    },
  },
  {
    id: "homelab",
    repo: "https://github.com/bnhminh1010/HomeLab-Dashboard",
    liveUrl: "https://hostdeck.thinkai.id.vn",
    cliCommand: "curl -fsSL https://hostdeck.thinkai.id.vn/install.sh | bash",
    period: "2026 to present",
    stack: ["Go", "Podman", "Tailscale", "SQLite", "WebSocket"],
    accent: "teal",
    mark: "SYS",
    metric: {
      value: "2.4 ms",
      label: {
        en: "Telemetry Latency • 99.9% Uptime",
        vi: "Độ trễ đo đạc • 99.9% Thời gian hoạt động",
      },
    },
    evidence: {
      cv: "Nine containerized services, SLO tracking, alerting, PTY terminal and host hardening.",
      repository: [
        { claim: "Initial Go operations dashboard", url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/a335a03c639ead022e6a5e8b9532846d4b8c5997" },
        { claim: "Host-agent security boundary", url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/06d7be6073c846fab95393e159d9bfc7422429da" },
        { claim: "SLO, TLS and backup checks", url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/7a6571886569d787101a4ceeb7cdc5624ff232e1" },
      ],
    },
    preview: {
      assetStem: "homelab-preview",
      image: "/images/products/hostdeck-screen.png",
      ready: true,
      capture: {
        en: "Maps the private path from the Tailscale mesh to the host agent, Podman services and operations dashboard.",
        vi: "Mô tả đường đi riêng tư từ Tailscale mesh đến host agent, Podman service và operations dashboard.",
      },
    },
    content: {
      en: {
        category: "Self-hosted operations workbench",
        title: "HostDeck",
        summary: "A private bare-metal operations workbench for a nine-service Podman homelab.",
        story: {
          problem: "Nine containerized services needed one view of host, Podman and remote-node health without exposing the control plane on the public internet.",
          approach: "I built a Go and WebSocket workbench with retained SQLite history, Tailscale-connected outbound agents and a separate protected host-action boundary.",
          outcome: "The lab now tracks service evidence, SLOs, alerts and terminal sessions; systemd, OOM handling, automatic reboot and ZRAM harden the operating baseline.",
        },
        diagramLabel: "Tailscale mesh → host agent → Podman services → operations dashboard",
      },
      vi: {
        category: "Operations workbench self-hosted",
        title: "HostDeck",
        summary: "Operations workbench bare-metal riêng tư cho homelab Podman gồm chín service.",
        story: {
          problem: "Chín service container cần một góc nhìn chung về host, Podman và remote node mà không mở control plane ra Internet.",
          approach: "Tôi xây workbench Go và WebSocket với SQLite history, Tailscale/outbound agent và host-action boundary riêng được bảo vệ.",
          outcome: "Homelab theo dõi service evidence, SLO, alert và terminal session; systemd, OOM handling, tự khởi động lại và ZRAM tạo baseline hardening cho vận hành.",
        },
        diagramLabel: "Tailscale mesh → host agent → Podman services → operations dashboard",
      },
    },
    architecture: {
      specId: "SPEC-HOSTDECK-2026",
      constraint: {
        en: "Constraint: Zero Public Inbound WAN Ports (UFW Deny All)",
        vi: "Ràng buộc: Không mở bất kỳ cổng WAN inbound công cộng nào (UFW Deny All)",
      },
      mechanism: {
        en: "Mechanism: Rootless Podman & Tailscale WireGuard Overlay",
        vi: "Cơ chế: Rootless Podman & Mạng WireGuard Tailscale Riêng Tư",
      },
      standard: {
        en: "Standard: Systemd Cgroup Memory Isolation & ZRAM Hardening",
        vi: "Tiêu chuẩn: Cô lập bộ nhớ Systemd Cgroup & Tối ưu hóa ZRAM",
      },
      flowSteps: [
        {
          step: "01",
          title: "Private Ingress",
          protocol: "WireGuard UDP (100.x)",
          status: "ENCRYPTED",
          subtitle: {
            en: "Encrypted point-to-point mesh tunnel bypassing public WAN routing",
            vi: "Đường truyền mã hóa point-to-point qua mesh, không qua định tuyến WAN công cộng",
          },
        },
        {
          step: "02",
          title: "Traefik Gateway",
          protocol: "mTLS / Reverse Proxy",
          status: "ROUTED",
          subtitle: {
            en: "Internal domain routing with automated local TLS certificate validation",
            vi: "Định tuyến domain nội bộ kèm xác thực chứng chỉ TLS tự động",
          },
        },
        {
          step: "03",
          title: "Rootless Runtime",
          protocol: "Unix Socket (UID 1000)",
          status: "ISOLATED",
          subtitle: {
            en: "Daemonless Podman execution isolating the Linux host kernel",
            vi: "Podman daemonless cô lập hoàn toàn nhân Linux của máy chủ",
          },
        },
        {
          step: "04",
          title: "Telemetry Engine",
          protocol: "Go / WebSocket / SQLite",
          status: "STREAMING",
          subtitle: {
            en: "2.4ms real-time metrics streaming with retained SQLite history",
            vi: "Luồng đo đạc thời gian thực 2.4ms với lịch sử lưu trữ SQLite",
          },
        },
      ],
      securityCards: [
        {
          title: {
            en: "Rootless Namespace Isolation (UID 1000)",
            vi: "Cô lập Namespace không đặc quyền (UID 1000)",
          },
          description: {
            en: "Containers execute in user namespaces without root privileges. Even if a containerized process is compromised, the host kernel treats it as an unprivileged user.",
            vi: "Container chạy trong user namespace không có quyền root. Nếu tiến trình container bị chiếm quyền, kernel máy chủ vẫn chỉ xem đó là người dùng thường không đặc quyền.",
          },
          tag: "KERNEL HARDENED",
          icon: "shield",
        },
        {
          title: {
            en: "Zero-Trust Private WireGuard Overlay",
            vi: "Mạng lưới WireGuard Zero-Trust Riêng Tư",
          },
          description: {
            en: "Zero inbound WAN ports exposed to the public internet (UFW default deny). All communication occurs via encrypted 100.x.x.x Tailscale private IPs.",
            vi: "Không mở bất kỳ cổng WAN nào ra ngoài Internet (UFW chặn toàn bộ kết nối đến). Toàn bộ giao tiếp đều qua IP riêng 100.x.x.x mã hóa WireGuard.",
          },
          tag: "NO OPEN PORTS",
          icon: "lock",
        },
        {
          title: {
            en: "Host-Agent Privilege Boundary",
            vi: "Ranh giới đặc quyền Host-Agent",
          },
          description: {
            en: "Telemetry collectors run in read-only mode. Destructive actions and PTY terminal interactions require explicit session auth and command allowlists.",
            vi: "Bộ thu thập telemetry chạy ở chế độ chỉ đọc. Các thao tác can thiệp hệ thống và PTY terminal yêu cầu xác thực phiên và danh sách lệnh cho phép.",
          },
          tag: "LEAST PRIVILEGE",
          icon: "cpu",
        },
        {
          title: {
            en: "Systemd Cgroups & ZRAM Hardening",
            vi: "Gia cố Systemd Cgroups & ZRAM",
          },
          description: {
            en: "Strict memory limits, ZRAM swap-on-RAM compression, and tuned OOM score adjustments prevent rogue services from freezing bare-metal hardware.",
            vi: "Giới hạn RAM nghiêm ngặt, nén RAM qua ZRAM và điều chỉnh OOM score ngăn chặn service quá tải làm treo máy chủ bare-metal.",
          },
          tag: "OOM PROTECTED",
          icon: "check",
        },
      ],
      specSnippet: {
        filename: "containers/traefik-podman.yml",
        language: "yaml",
        code: `version: "3.8"\nservices:\n  traefik:\n    image: docker.io/library/traefik:v3.1\n    security_opt:\n      - no-new-privileges:true\n    userns_mode: "keep-id:uid=1000,gid=1000"\n    networks:\n      - internal-mesh\n    ports:\n      - "127.0.0.1:8080:8080"\n    command:\n      - "--providers.podman=true"\n      - "--entrypoints.websecure.address=:443"`,
      },
      provenance: [
        {
          hash: "a335a03",
          message: {
            en: "Initial Go operations dashboard & telemetry collection loop",
            vi: "Khởi tạo Go operations dashboard & vòng lặp thu thập telemetry",
          },
          branch: "main",
          url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/a335a03c639ead022e6a5e8b9532846d4b8c5997",
          verified: true,
        },
        {
          hash: "06d7be6",
          message: {
            en: "Enforce host-agent security boundary and read-only telemetry constraints",
            vi: "Thiết lập ranh giới bảo mật host-agent và ràng buộc telemetry chỉ đọc",
          },
          branch: "main",
          url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/06d7be6073c846fab95393e159d9bfc7422429da",
          verified: true,
        },
        {
          hash: "7a65718",
          message: {
            en: "Automated SLO verification, TLS rotation, and backup health checks",
            vi: "Tự động hóa kiểm tra SLO, chứng chỉ TLS và sức khỏe bản sao lưu",
          },
          branch: "main",
          url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/7a6571886569d787101a4ceeb7cdc5624ff232e1",
          verified: true,
        },
      ],
    },
  },
  {
    id: "thinkai",
    repo: "https://github.com/ThinkAI-team/thinkai-backend",
    liveUrl: "https://learning.thinkai.id.vn",
    cliCommand: "git push origin main && argo app sync thinkai-prod",
    period: "2025-2026",
    stack: ["Spring Boot", "GitHub Actions", "Docker", "Kubernetes", "Argo CD", "Trivy"],
    accent: "pink",
    mark: "K3S",
    metric: {
      value: "0-Trust",
      label: {
        en: "100% Automated Deployment Flow • SAST Verified",
        vi: "Luồng triển khai tự động 100% • Xác thực SAST",
      },
    },
    evidence: {
      cv: "Two-pod K3s delivery, GitOps/DevSecOps pipeline, health checks, signed images and protected collaboration across a 329+ commit, 47-branch repository.",
      repository: [
        { claim: "Security and quality CI", url: "https://github.com/ThinkAI-team/thinkai-backend/commit/1db47cf4271744b6a8117cd3d0189646eb7b9adf" },
        { claim: "Java 21 multi-stage container build", url: "https://github.com/ThinkAI-team/thinkai-backend/commit/4fb5a62eebab4213a5fb127704f5ea93b187693a" },
        { claim: "Compose database health gate", url: "https://github.com/ThinkAI-team/thinkai-backend/commit/77a8a31c5a824befecf8cf1677494708a1d026ce" },
      ],
    },
    preview: {
      assetStem: "thinkai-preview",
      image: "/images/products/thinkai-screen.png",
      ready: true,
      capture: {
        en: "Maps the pull request security gate, multi-stage image build and local Docker Compose dependencies.",
        vi: "Mô tả security gate của pull request, multi-stage image build và dependency Docker Compose cục bộ.",
      },
    },
    content: {
      en: {
        category: "Education platform delivery pipeline",
        title: "ThinkAI Learning",
        summary: "A DevSecOps delivery path for an AI-powered education backend.",
        story: {
          problem: "As the Spring Boot backend grew across shared services and deployment targets, manual release work made quality, dependency and secret checks inconsistent.",
          approach: "I contributed CI security and quality gates plus a multi-stage container delivery path; the surrounding repository explains the MySQL, Redis, K3s, Argo CD and monitoring context it serves.",
          outcome: "The result was a two-pod K3s path with GitOps, signed-image and health-check controls, delivered within a repository collaboration spanning 329+ commits and 47 branches.",
        },
        diagramLabel: "Pull request → security gates → Spring Boot image → GitOps delivery path",
      },
      vi: {
        category: "Pipeline phân phối nền tảng giáo dục",
        title: "ThinkAI Learning",
        summary: "DevSecOps delivery path cho backend nền tảng giáo dục tích hợp AI.",
        story: {
          problem: "Khi Spring Boot backend mở rộng qua service dùng chung và nhiều deployment target, phát hành thủ công khiến kiểm tra chất lượng, dependency và secret thiếu nhất quán.",
          approach: "Tôi đóng góp CI security/quality gates cùng container delivery path hai giai đoạn; repository xung quanh làm rõ ngữ cảnh MySQL, Redis, K3s, Argo CD và monitoring mà luồng này phục vụ.",
          outcome: "Kết quả là đường đi hai pod K3s với GitOps, signed image và health-check controls, được triển khai trong một repository collaboration gồm 329+ commit và 47 branch.",
        },
        diagramLabel: "Pull request → security gates → Spring Boot image → GitOps delivery path",
      },
    },
    architecture: {
      specId: "SPEC-THINKAI-K3S-2026",
      constraint: {
        en: "Constraint: Automated DevSecOps Pre-Merge & Zero Direct Secrets",
        vi: "Ràng buộc: DevSecOps tự động trước khi merge & Không lộ thông tin bí mật",
      },
      mechanism: {
        en: "Mechanism: GitHub Actions CI Gates & Argo CD GitOps Pull Reconciliation",
        vi: "Cơ chế: Cổng kiểm thử GitHub Actions CI & Đồng bộ hóa GitOps qua Argo CD",
      },
      standard: {
        en: "Standard: CodeQL SAST Zero-Regression & Trivy Container CVE Blocker",
        vi: "Tiêu chuẩn: Phân tích CodeQL SAST an toàn & Trivy chặn CVE High/Critical",
      },
      flowSteps: [
        {
          step: "01",
          title: "Pull Request Trigger",
          protocol: "GitHub Webhook",
          status: "TRIGGERED",
          subtitle: {
            en: "Automated trigger validating main branch pull requests",
            vi: "Kích hoạt tự động xác thực các pull request vào nhánh main",
          },
        },
        {
          step: "02",
          title: "SAST CodeQL & Sonar",
          protocol: "Static Analysis Engine",
          status: "AUDITED",
          subtitle: {
            en: "Deep code analysis blocking security regressions and code smells",
            vi: "Phân tích mã chuyên sâu ngăn chặn lỗ hổng bảo mật và code smells",
          },
        },
        {
          step: "03",
          title: "Trivy CVE Gate",
          protocol: "Container Vulnerability Scan",
          status: "SCAN_PASSED",
          subtitle: {
            en: "Multi-stage Java 21 image build audit blocking HIGH and CRITICAL CVEs",
            vi: "Quét build image Java 21 đa giai đoạn, chặn mọi CVE mức High và Critical",
          },
        },
        {
          step: "04",
          title: "Signed GHCR Digest",
          protocol: "SHA-256 Cosign / OCI",
          status: "SIGNED",
          subtitle: {
            en: "Immutable image digest pushed to GitHub Container Registry",
            vi: "Image digest bất biến được đẩy lên GitHub Container Registry",
          },
        },
        {
          step: "05",
          title: "Argo CD GitOps Rollout",
          protocol: "Kubernetes K3s CRD",
          status: "DEPLOYED",
          subtitle: {
            en: "Declarative synchronization with zero-downtime health verification",
            vi: "Đồng bộ hóa khai báo với kiểm tra sức khỏe pod không gây gián đoạn",
          },
        },
      ],
      securityCards: [
        {
          title: {
            en: "Automated SAST & CodeQL Gates",
            vi: "Cổng phân tích tĩnh SAST & CodeQL tự động",
          },
          description: {
            en: "Every pull request triggers automated CodeQL scans detecting SQL injection, insecure deserialization, and path traversal prior to merging.",
            vi: "Mọi pull request đều kích hoạt quét CodeQL tự động nhằm phát hiện SQL injection, deserialization không an toàn và path traversal trước khi merge.",
          },
          tag: "PRE-MERGE GATE",
          icon: "shield",
        },
        {
          title: {
            en: "Trivy Container Vulnerability Scan",
            vi: "Quét lỗ hổng Container bằng Trivy",
          },
          description: {
            en: "Multi-stage Java 21 base images are audited for known CVEs. CI pipelines automatically abort if any HIGH or CRITICAL vulnerabilities are found.",
            vi: "Image gốc Java 21 được rà soát lỗ hổng CVE đã biết. Pipeline CI tự động hủy nếu phát hiện bất kỳ lỗ hổng nào mức độ High hoặc Critical.",
          },
          tag: "ZERO HIGH/CRIT CVE",
          icon: "check",
        },
        {
          title: {
            en: "Signed Immutable Image Digests",
            vi: "Ký số Image Digest bất biến",
          },
          description: {
            en: "Container images deployed to production are referenced by exact SHA-256 digest, preventing image poisoning and runtime tag mutation attacks.",
            vi: "Image triển khai production được chỉ định chính xác bằng SHA-256 digest, ngăn chặn tấn công đầu độc image và tráo đổi tag khi chạy.",
          },
          tag: "SHA-256 IMMUTABLE",
          icon: "lock",
        },
        {
          title: {
            en: "GitOps Continuous Reconciliation",
            vi: "Đồng bộ hóa GitOps liên tục",
          },
          description: {
            en: "Argo CD continuously compares Git declarations against active K3s clusters, auto-healing configuration drift without exposing kubeconfig credentials.",
            vi: "Argo CD liên tục đối soát khai báo Git với trạng thái cụm K3s thực tế, tự khắc phục sai lệch mà không cần cấp quyền kubeconfig cho bên ngoài.",
          },
          tag: "GITOPS HEALING",
          icon: "git",
        },
      ],
      specSnippet: {
        filename: "gitops/thinkai-prod-app.yml",
        language: "yaml",
        code: `apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: thinkai-prod\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/ThinkAI-team/thinkai-backend.git\n    targetRevision: main\n    path: k8s/overlays/prod\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: thinkai\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true`,
      },
      provenance: [
        {
          hash: "1db47cf",
          message: {
            en: "Security and quality CI pipeline with automated SAST checks",
            vi: "CI pipeline bảo mật và chất lượng với kiểm tra SAST tự động",
          },
          branch: "main",
          url: "https://github.com/ThinkAI-team/thinkai-backend/commit/1db47cf4271744b6a8117cd3d0189646eb7b9adf",
          verified: true,
        },
        {
          hash: "4fb5a62",
          message: {
            en: "Java 21 multi-stage container build with minimal runtime surface",
            vi: "Build container Java 21 đa giai đoạn tối ưu diện tích runtime",
          },
          branch: "main",
          url: "https://github.com/ThinkAI-team/thinkai-backend/commit/4fb5a62eebab4213a5fb127704f5ea93b187693a",
          verified: true,
        },
        {
          hash: "77a8a31",
          message: {
            en: "Compose database health gate and dependency readiness probe",
            vi: "Cổng kiểm tra sức khỏe database Compose và readiness probe",
          },
          branch: "main",
          url: "https://github.com/ThinkAI-team/thinkai-backend/commit/77a8a31c5a824befecf8cf1677494708a1d026ce",
          verified: true,
        },
      ],
    },
  },
];
