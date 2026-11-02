// Starter content, in English with an Indonesian version of every text. All of it is editable from /admin.
// Facts come from github.com/LuisFerdinand (repos, dates, package.json files, live sites, profile).
// Projects whose purpose could not be verified are seeded as unpublished drafts.

const GH = "https://github.com/LuisFerdinand";

export const SEED_VERSION = 2;

export const site = {
  hero_title: "Luis Ferdinand",
  hero_subtitle: "Full-Stack Web Developer",
  hero_description:
    "I build web products for small and growing businesses: cashier and point-of-sale apps, company websites, and platforms with accounts, payments and dashboards. Next.js, TypeScript and PostgreSQL, from the database to the browser.",
  hero_primary_label: "View portfolio",
  hero_primary_href: "/portfolio",
  hero_secondary_label: "Get in touch",
  hero_secondary_href: "/contact",
  hero_availability: "Open to new projects",

  about_heading: "Web products that small businesses can run on.",
  about_body:
    "I’m a full-stack web developer based in Jakarta. I started building for the web in 2024 with HTML, Vue and React, moved on to Laravel, and now build full-stack products with Next.js, TypeScript and PostgreSQL.\n\nMost of what I make is software for small businesses: a phone-first cashier for laundries, a multi-tenant point of sale, a platform for selling business apps, and sites for companies and courses in Indonesia and Timor-Leste. I work at PT Panatrade Caraka in West Jakarta.",
  about_quote: "Built to be used every day, not only to be demoed.",
  about_highlights: [
    {
      title: "Products for small businesses",
      text: "LaundryFlow, Selu POS and Kerjalin are built around how shops, laundries and sales agents actually work.",
    },
    {
      title: "Indonesian and English",
      text: "Interfaces and copy in Indonesian and English, including a bilingual football platform.",
    },
    {
      title: "Learned by shipping",
      text: "From ten small Vue components in 2024 to a multi-tenant point of sale in 2026.",
    },
  ],
  about_skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "PHP", "HTML & CSS"] },
    { group: "Front end", items: ["React", "Next.js", "Vue", "Tailwind CSS", "shadcn/ui", "Recharts"] },
    { group: "Back end & data", items: ["Node.js", "PostgreSQL", "Neon", "Drizzle ORM", "tRPC", "Laravel", "NextAuth", "Better Auth"] },
    { group: "Tools & deploy", items: ["Git & GitHub", "Vercel", "Vite", "Cloudinary", "Resend"] },
  ],
  vision:
    "Software that small and growing businesses can rely on every day: simple to use, dependable and built to last.",
  mission:
    "Build full-stack web products, from the database to the browser, with clean and maintainable code.\nDesign around real operations: cashiers, laundry owners, organisers and sales agents who use the screen all day.\nKeep learning in the open, ship small and often, and document what I build.",

  contact_heading: "Let’s build something together.",
  contact_body: "Tell me about your business and what you need, and I’ll get back to you by email.",
  contact_email: "ferdinandluis88@gmail.com",
  location: "Jakarta, Indonesia",
  address:
    "Jl. Daan Mogot No.151 4, RT.4/RW.5, Duri Kepa, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11510",
  phone: "",
  whatsapp: "",
  company: "PT Panatrade Caraka",
  company_url: "https://panatrade.id/",
  github_url: GH,
  linkedin_url: "",
  instagram_url: "",
  resume_url: "",
};

// Indonesian versions, keyed by the camelCase field names the app uses.
export const siteId = {
  heroSubtitle: "Full-Stack Web Developer",
  heroDescription:
    "Saya membangun produk web untuk bisnis kecil dan berkembang: aplikasi kasir dan point of sale, situs perusahaan, serta platform dengan akun, pembayaran, dan dasbor. Next.js, TypeScript, dan PostgreSQL, dari database sampai browser.",
  heroPrimaryLabel: "Lihat portofolio",
  heroSecondaryLabel: "Hubungi saya",
  heroAvailability: "Terbuka untuk proyek baru",
  aboutHeading: "Produk web yang bisa dijalankan bisnis kecil.",
  aboutBody:
    "Saya full-stack web developer yang berbasis di Jakarta. Saya mulai membuat web pada 2024 dengan HTML, Vue, dan React, lalu beralih ke Laravel, dan kini membangun produk full-stack dengan Next.js, TypeScript, dan PostgreSQL.\n\nSebagian besar karya saya adalah perangkat lunak untuk bisnis kecil: kasir laundry yang berjalan di HP, point of sale multi-tenant, platform untuk menjual aplikasi bisnis, serta situs untuk perusahaan dan kursus di Indonesia dan Timor-Leste. Saya bekerja di PT Panatrade Caraka, Jakarta Barat.",
  aboutQuote: "Dibuat untuk dipakai setiap hari, bukan hanya untuk didemokan.",
  aboutHighlights: [
    {
      title: "Produk untuk bisnis kecil",
      text: "LaundryFlow, Selu POS, dan Kerjalin dibangun berdasarkan cara kerja toko, laundry, dan agen penjualan yang sebenarnya.",
    },
    {
      title: "Bahasa Indonesia dan Inggris",
      text: "Antarmuka dan teks dalam bahasa Indonesia dan Inggris, termasuk platform sepak bola dwibahasa.",
    },
    {
      title: "Belajar sambil merilis",
      text: "Dari sepuluh komponen Vue kecil pada 2024 sampai point of sale multi-tenant pada 2026.",
    },
  ],
  vision:
    "Perangkat lunak yang bisa diandalkan bisnis kecil dan berkembang setiap hari: mudah dipakai, tepercaya, dan dibangun untuk bertahan lama.",
  mission:
    "Membangun produk web full-stack, dari database sampai browser, dengan kode yang bersih dan mudah dirawat.\nMerancang berdasarkan operasional nyata: kasir, pemilik laundry, penyelenggara, dan agen penjualan yang memakai layar sepanjang hari.\nTerus belajar secara terbuka, merilis sedikit demi sedikit tetapi sering, dan mendokumentasikan apa yang saya bangun.",
  contactHeading: "Mari membangun sesuatu bersama.",
  contactBody: "Ceritakan tentang bisnis Anda dan apa yang dibutuhkan, lalu saya akan membalas lewat email.",
};

const p = (o) => ({ kind: "personal", role: "", live_url: "", image_url: null, featured: false, published: true, ...o });

export const projects = [
  p({
    slug: "kerjalin",
    title: "Kerjalin",
    summary: "Agent platform for selling business apps to small businesses.",
    description:
      "A platform where anyone can earn commission by selling digital subscription apps (laundry, cashier and online-store software) to small businesses. It has product listings, referral links, an agent dashboard and sign-up. In Indonesian.",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "Neon", "Better Auth", "Tailwind CSS"],
    repo_url: `${GH}/kerjalin`,
    live_url: "https://kerjalin.vercel.app",
    image_url: "/projects/kerjalin.jpg",
    started_on: "2026-10-25",
    last_activity: "2026-11-01",
    sort_order: 10,
    featured: true,
    id: {
      summary: "Platform agen untuk menjual aplikasi bisnis ke UMKM.",
      description:
        "Platform tempat siapa saja bisa mendapat komisi dengan menjual aplikasi langganan digital (aplikasi laundry, kasir, dan toko online) ke UMKM. Ada daftar produk, tautan referral, dasbor agen, dan pendaftaran. Berbahasa Indonesia.",
    },
  }),
  p({
    slug: "laundryflow",
    title: "LaundryFlow",
    summary: "Phone-first cashier app for laundry businesses.",
    description:
      "A cashier app for Indonesian laundries that runs in the phone browser: kiloan and per-piece orders, order status tracking, deposits and payments (cash, transfer, QRIS) and WhatsApp receipts with customer tracking links. The site also covers pricing, a demo and a 14-day free trial.",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Tailwind CSS"],
    repo_url: `${GH}/laundry-saas`,
    live_url: "https://laundry-saas-ten.vercel.app",
    image_url: "/projects/laundryflow.jpg",
    started_on: "2026-10-05",
    last_activity: "2026-10-11",
    sort_order: 20,
    featured: true,
    id: {
      summary: "Aplikasi kasir laundry yang mengutamakan HP.",
      description:
        "Aplikasi kasir untuk laundry di Indonesia yang berjalan di browser HP: pesanan kiloan dan satuan, pelacakan status pesanan, DP dan pembayaran (tunai, transfer, QRIS), serta nota WhatsApp dengan tautan pelacakan untuk pelanggan. Situsnya juga memuat harga, demo, dan uji coba gratis 14 hari.",
    },
  }),
  p({
    slug: "viem",
    title: "VIEM Konekta Farms",
    summary: "Site for connected, solar-powered farms in Timor-Leste.",
    description:
      "The site for VIEM: connected, solar-powered aquaponic and hydroponic farms run by suco cooperatives in Timor-Leste, with sensor monitoring, Tetum-first alerts by WhatsApp or SMS, a live dashboard demo and a proposal for the Vorakai Konekta Challenge 2026.",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "Neon", "Vercel Blob", "Recharts"],
    repo_url: `${GH}/viem`,
    live_url: "https://viem-beta.vercel.app",
    image_url: "/projects/viem.jpg",
    started_on: "2026-09-28",
    last_activity: "2026-10-22",
    sort_order: 30,
    featured: true,
    id: {
      summary: "Situs untuk pertanian terhubung bertenaga surya di Timor-Leste.",
      description:
        "Situs untuk VIEM: pertanian akuaponik dan hidroponik bertenaga surya yang terhubung dan dikelola koperasi suco di Timor-Leste, dengan pemantauan sensor, peringatan berbahasa Tetum lewat WhatsApp atau SMS, demo dasbor langsung, dan proposal untuk Vorakai Konekta Challenge 2026.",
    },
  }),
  p({
    slug: "ligalokal",
    title: "LigaLokal",
    summary: "Football platform for grassroots competitions, with AI scouting.",
    description:
      "A football platform for grassroots competitions: player and club data, tournament administration, real-time match operations and AI-assisted talent scouting, with a workspace for operators, referees, coaches and scouts. The site is available in Indonesian and English.",
    tags: ["Next.js", "TypeScript", "NextAuth", "Drizzle ORM", "Gemini AI", "Cloudinary"],
    repo_url: `${GH}/footgrit`,
    live_url: "https://liga-lokal.vercel.app",
    image_url: "/projects/ligalokal.jpg",
    started_on: "2026-09-10",
    last_activity: "2026-10-29",
    sort_order: 40,
    featured: true,
    id: {
      summary: "Platform sepak bola kompetisi akar rumput, dengan scouting AI.",
      description:
        "Platform sepak bola untuk kompetisi akar rumput: data pemain dan klub, administrasi turnamen, operasional pertandingan secara real-time, dan scouting bakat berbantuan AI, dengan ruang kerja untuk operator, wasit, pelatih, dan scout. Situsnya tersedia dalam bahasa Indonesia dan Inggris.",
    },
  }),
  p({
    slug: "selu-pos",
    title: "Selu POS",
    summary: "Multi-tenant point of sale with a flow for each business type.",
    description:
      "A multi-tenant point-of-sale system with a tailored flow per business type: supermarket (barcode-scanning cashier), workshop (spare parts and services on one ticket) and cafe (a public ordering page feeding a live queue). It has an income and expense ledger, sales analytics, receipt printing to thermal printers and owner and employee roles.",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "Neon", "shadcn/ui", "Recharts"],
    repo_url: `${GH}/selu-pos`,
    started_on: "2026-08-17",
    last_activity: "2026-09-06",
    sort_order: 50,
    id: {
      summary: "Point of sale multi-tenant dengan alur untuk tiap jenis usaha.",
      description:
        "Sistem point of sale multi-tenant dengan alur khusus untuk tiap jenis usaha: supermarket (kasir dengan pemindai barcode), bengkel (suku cadang dan jasa dalam satu nota), dan kafe (halaman pemesanan publik yang masuk ke antrean langsung). Dilengkapi buku besar pemasukan dan pengeluaran, analitik penjualan, cetak struk ke printer thermal, serta peran pemilik dan karyawan.",
    },
  }),
  p({
    slug: "inggris-go",
    title: "Inggris Go",
    summary: "Site for an English course in Kampung Inggris Pare.",
    description:
      "A public site for an English-speaking course provider in Kampung Inggris Pare, Indonesia: the learning method, programs with pricing, testimonials, a blog and WhatsApp consultation, including a low-cost 10-day speaking challenge.",
    tags: ["Next.js", "TypeScript", "tRPC", "Drizzle ORM", "Better Auth", "Tailwind CSS"],
    repo_url: `${GH}/inggris-go`,
    live_url: "https://inggris-go.vercel.app",
    image_url: "/projects/inggris-go.jpg",
    started_on: "2026-06-04",
    last_activity: "2026-10-24",
    sort_order: 60,
    id: {
      summary: "Situs untuk kursus bahasa Inggris di Kampung Inggris Pare.",
      description:
        "Situs publik untuk penyedia kursus speaking bahasa Inggris di Kampung Inggris Pare: metode belajar, program beserta harga, testimoni, blog, dan konsultasi lewat WhatsApp, termasuk tantangan speaking 10 hari yang terjangkau.",
    },
  }),
  p({
    slug: "lofi-finance",
    title: "LoFi Finance",
    summary: "A cozy money and work tracker in a pixel-art interface.",
    description:
      "A personal finance and productivity tracker: income and expenses, savings goals, tasks with email reminders and projects in list, kanban or calendar views, wrapped in a pixel-art interface.",
    tags: ["Next.js", "TypeScript", "Auth.js", "Drizzle ORM", "Neon", "Recharts"],
    repo_url: `${GH}/lofi-finance`,
    live_url: "https://lofi-finance.vercel.app",
    image_url: "/projects/lofi-finance.jpg",
    started_on: "2026-04-11",
    last_activity: "2026-10-01",
    sort_order: 70,
    id: {
      summary: "Pencatat uang dan pekerjaan yang santai, dengan tampilan pixel-art.",
      description:
        "Aplikasi pencatat keuangan dan produktivitas pribadi: pemasukan dan pengeluaran, target tabungan, tugas dengan pengingat email, serta proyek dalam tampilan daftar, kanban, atau kalender, dibungkus antarmuka pixel-art.",
    },
  }),
  p({
    slug: "akiro-laundry",
    title: "Akiro Laundry & Perfume",
    summary: "Website for a laundry service in Dili, Timor-Leste.",
    description:
      "The website for Akiro Laundry & Perfume in Dili, Timor-Leste: washing, dry cleaning, ironing, bedding care, fragrance add-ons, express service and pickup and delivery, with sections for services, process, gallery, reviews and contact.",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "Resend", "Cloudinary", "Tailwind CSS"],
    repo_url: `${GH}/akiro-laundry`,
    live_url: "https://akiro-laundry.vercel.app",
    image_url: "/projects/akiro-laundry.jpg",
    started_on: "2026-03-10",
    last_activity: "2026-10-22",
    sort_order: 80,
    id: {
      summary: "Situs untuk layanan laundry di Dili, Timor-Leste.",
      description:
        "Situs untuk Akiro Laundry & Perfume di Dili, Timor-Leste: cuci, dry cleaning, setrika, perawatan sprei dan selimut, tambahan pewangi, layanan ekspres, serta antar-jemput, dengan bagian layanan, proses, galeri, ulasan, dan kontak.",
    },
  }),
  p({
    slug: "company-service",
    title: "Company Service",
    summary: "Responsive company profile website.",
    description:
      "A modern, responsive company profile website built with React and Tailwind CSS. Open source, with 12 stars on GitHub.",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    repo_url: `${GH}/company-service`,
    started_on: "2025-06-13",
    last_activity: "2025-12-14",
    sort_order: 90,
    id: {
      summary: "Situs profil perusahaan yang responsif.",
      description:
        "Situs profil perusahaan yang modern dan responsif, dibangun dengan React dan Tailwind CSS. Sumber terbuka, dengan 12 bintang di GitHub.",
    },
  }),

  // Drafts: the repos exist but their purpose could not be verified. Fill in and publish from /admin/projects.
  p({ slug: "knock-website", title: "Knock Website", tags: ["Next.js", "TypeScript", "NextAuth", "Drizzle ORM", "Twilio", "Cloudinary"], repo_url: `${GH}/knock-website`, started_on: "2026-02-03", last_activity: "2026-02-16", sort_order: 100, published: false }),
  p({ slug: "knock-studio-stg", title: "Knock Studio (staging)", tags: ["Next.js", "TypeScript", "NextAuth", "Drizzle ORM"], repo_url: `${GH}/knock-studio-stg`, started_on: "2026-02-06", last_activity: "2026-02-13", sort_order: 110, published: false }),
  p({ slug: "kimi-group", title: "Kimi Group", tags: ["Next.js", "TypeScript", "NextAuth", "Drizzle ORM", "Cloudinary", "EmailJS"], repo_url: `${GH}/kimi-group`, started_on: "2025-12-13", last_activity: "2026-01-20", sort_order: 120, published: false }),
  p({ slug: "bachelor-camp", title: "Bachelor Camp", tags: ["Next.js", "TypeScript", "tRPC", "Drizzle ORM", "Clerk", "UploadThing"], repo_url: `${GH}/bachelor-camp`, started_on: "2025-08-24", last_activity: "2025-12-26", sort_order: 130, published: false }),
  p({ slug: "university-library-ls", title: "University Library", tags: ["Next.js", "TypeScript", "Drizzle ORM", "Tailwind CSS"], repo_url: `${GH}/university-library-ls`, started_on: "2025-08-05", last_activity: "2025-08-05", sort_order: 140, published: false }),
  p({ slug: "valent", title: "Valent", tags: ["React", "Vite", "Tailwind CSS"], repo_url: `${GH}/valent`, started_on: "2025-08-20", last_activity: "2025-08-21", sort_order: 150, published: false }),
  p({ slug: "panatrade-prestasi", title: "Panatrade Prestasi", tags: ["React", "Vite", "Tailwind CSS"], repo_url: `${GH}/panatrade-prestasi`, started_on: "2025-07-28", last_activity: "2025-08-21", sort_order: 160, published: false }),
];

// Rows from the earlier seed (another GitHub account). Untouched ones are deleted, edited ones are unpublished.
export const legacySlugs = [
  "event-pos",
  "medusa-storefront",
  "store-daily-activity",
  "storage-system",
  "document-management-system",
  "product-lifecycle-management",
  "panatrade",
  "pnt-try",
  "lil-seonmul",
];

const t = (o) => ({ kind: "project", ends_on: null, is_current: false, org: "", link_url: "", tags: [], published: true, ...o });

// Newest first. Every entry is dated from real repository activity.
export const timeline = [
  t({
    kind: "work",
    starts_on: null,
    is_current: true,
    title: "PT Panatrade Caraka",
    org: "West Jakarta",
    description: "My company, as listed on my GitHub profile, based in Kebon Jeruk, West Jakarta.",
    link_url: "https://panatrade.id/",
    id: {
      title: "PT Panatrade Caraka",
      org: "Jakarta Barat",
      description: "Perusahaan tempat saya bekerja, sebagaimana tertulis di profil GitHub saya, berlokasi di Kebon Jeruk, Jakarta Barat.",
    },
  }),
  t({
    starts_on: "2026-10-01",
    title: "Software for small businesses",
    org: "LaundryFlow · Kerjalin",
    description: "LaundryFlow, a phone-first cashier for laundries, and Kerjalin, a platform where agents sell business apps for commission.",
    tags: ["Next.js", "Drizzle ORM", "Better Auth"],
    link_url: "/portfolio",
    id: {
      title: "Perangkat lunak untuk bisnis kecil",
      description: "LaundryFlow, kasir laundry yang mengutamakan HP, dan Kerjalin, platform tempat agen menjual aplikasi bisnis dengan komisi.",
    },
  }),
  t({
    starts_on: "2026-09-01",
    title: "Football and farming",
    org: "LigaLokal · VIEM",
    description: "LigaLokal, a competition platform for grassroots football with AI-assisted scouting, and VIEM, a site for connected solar-powered farms in Timor-Leste.",
    tags: ["Next.js", "NextAuth", "Gemini AI", "Recharts"],
    link_url: "/portfolio",
    id: {
      title: "Sepak bola dan pertanian",
      description: "LigaLokal, platform kompetisi sepak bola akar rumput dengan scouting berbantuan AI, dan VIEM, situs untuk pertanian terhubung bertenaga surya di Timor-Leste.",
    },
  }),
  t({
    starts_on: "2026-06-01",
    ends_on: "2026-08-31",
    title: "Courses and point of sale",
    org: "Inggris Go · Selu POS",
    description: "A site for an English course in Kampung Inggris Pare, and a multi-tenant point of sale for supermarkets, workshops and cafes.",
    tags: ["Next.js", "tRPC", "Drizzle ORM", "shadcn/ui"],
    link_url: "/portfolio",
    id: {
      title: "Kursus dan point of sale",
      description: "Situs untuk kursus bahasa Inggris di Kampung Inggris Pare, dan point of sale multi-tenant untuk supermarket, bengkel, dan kafe.",
    },
  }),
  t({
    starts_on: "2026-03-01",
    ends_on: "2026-04-30",
    title: "Laundry and personal finance",
    org: "Akiro Laundry · LoFi Finance",
    description: "A website for a laundry in Dili, Timor-Leste, and LoFi Finance, a money and work tracker with a pixel-art interface.",
    tags: ["Next.js", "Drizzle ORM", "Auth.js", "Recharts"],
    link_url: "/portfolio",
    id: {
      title: "Laundry dan keuangan pribadi",
      description: "Situs untuk laundry di Dili, Timor-Leste, dan LoFi Finance, pencatat uang dan pekerjaan dengan tampilan pixel-art.",
    },
  }),
  t({
    starts_on: "2026-02-01",
    title: "Knock",
    org: "Website and staging site",
    description: "The Knock website and its staging site, built with Next.js, NextAuth, Drizzle ORM and Twilio.",
    tags: ["Next.js", "NextAuth", "Drizzle ORM", "Twilio"],
    id: {
      title: "Knock",
      org: "Situs dan situs staging",
      description: "Situs Knock beserta situs stagingnya, dibangun dengan Next.js, NextAuth, Drizzle ORM, dan Twilio.",
    },
  }),
  t({
    starts_on: "2025-08-01",
    ends_on: "2025-12-31",
    title: "Moving to full-stack Next.js",
    org: "Bachelor Camp · Kimi Group",
    description: "My first large full-stack products, with databases, authentication, uploads and tRPC. Bachelor Camp grew past 100 commits.",
    tags: ["Next.js", "tRPC", "Drizzle ORM", "Clerk"],
    id: {
      title: "Beralih ke Next.js full-stack",
      description: "Produk full-stack besar pertama saya, dengan database, autentikasi, unggah file, dan tRPC. Bachelor Camp berkembang lebih dari 100 commit.",
    },
  }),
  t({
    starts_on: "2025-06-01",
    ends_on: "2025-08-31",
    title: "React and Vite",
    org: "Company Service · Panatrade Prestasi",
    description: "A responsive company profile site with React and Tailwind CSS (12 stars on GitHub), plus React and Vite apps.",
    tags: ["React", "Vite", "Tailwind CSS"],
    link_url: "https://github.com/LuisFerdinand/company-service",
    id: {
      title: "React dan Vite",
      description: "Situs profil perusahaan yang responsif dengan React dan Tailwind CSS (12 bintang di GitHub), serta aplikasi React dan Vite.",
    },
  }),
  t({
    starts_on: "2024-06-01",
    ends_on: "2024-12-31",
    title: "PHP and Laravel",
    org: "International Office · EduAll · WinieYong",
    description: "Laravel 11 sites and assignments: an International Office site, EduAll, the WinieYong and Bepi websites, and an online-shop specification.",
    tags: ["Laravel", "PHP", "Blade"],
    id: {
      title: "PHP dan Laravel",
      description: "Situs dan tugas Laravel 11: situs International Office, EduAll, situs WinieYong dan Bepi, serta spesifikasi toko online.",
    },
  }),
  t({
    starts_on: "2024-04-01",
    ends_on: "2024-06-30",
    title: "Learning the front end",
    org: "Vue · React · Tailwind CSS",
    description: "Ten small Vue components, five small React apps and Tailwind CSS portfolio sites, built to learn by doing.",
    tags: ["Vue", "React", "Tailwind CSS", "HTML"],
    id: {
      title: "Belajar front end",
      description: "Sepuluh komponen Vue kecil, lima aplikasi React sederhana, dan situs portofolio Tailwind CSS, dibuat untuk belajar sambil praktik.",
    },
  }),
  t({
    kind: "milestone",
    starts_on: "2023-06-27",
    title: "Joined GitHub",
    org: "github.com/LuisFerdinand",
    description: "Opened the account where all of this work lives.",
    id: {
      title: "Bergabung di GitHub",
      description: "Membuka akun tempat semua karya ini disimpan.",
    },
  }),
];
