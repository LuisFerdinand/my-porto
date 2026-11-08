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
    "I’m a full-stack web developer based in Indonesia. I started building for the web in 2024 with HTML, Vue and React, moved on to Laravel, and now build full-stack products with Next.js, TypeScript and PostgreSQL.\n\nMost of what I make is software for small businesses: a phone-first cashier for laundries, a multi-tenant point of sale, a platform for selling business apps, and sites for companies and courses in Indonesia and Timor-Leste.",
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
  location: "Indonesia",
  address: "",
  phone: "+62 852 4820 9388",
  whatsapp: "+62 852 4820 9388",
  github_url: GH,
  linkedin_url: "https://www.linkedin.com/in/luis-ferdinand-11bab824a/",
  instagram_url: "https://www.instagram.com/8_fer_11/",
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
    "Saya full-stack web developer yang berbasis di Indonesia. Saya mulai membuat web pada 2024 dengan HTML, Vue, dan React, lalu beralih ke Laravel, dan kini membangun produk full-stack dengan Next.js, TypeScript, dan PostgreSQL.\n\nSebagian besar karya saya adalah perangkat lunak untuk bisnis kecil: kasir laundry yang berjalan di HP, point of sale multi-tenant, platform untuk menjual aplikasi bisnis, serta situs untuk perusahaan dan kursus di Indonesia dan Timor-Leste.",
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

const p = (o) => ({ kind: "personal", role: "", repo_url: "", live_url: "", image_url: null, featured: false, published: true, ...o });

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

  // PNT work. No repo links on purpose: the code lives in the company account. Facts come from the live sites and the repos' structure.
  p({
    slug: "prism-daily-store",
    title: "PRISM Daily Store",
    summary: "Daily operations platform for PNT's retail stores.",
    description:
      "PRISM (Prestasi Retail Integrated Store Management) is the daily store application for PNT's retail stores. Staff sign in with their employee ID (NIK) to check in and out, track breaks and complete daily tasks such as opening and grooming checks. Managers handle petty cash, daily reports, issues and monthly schedules across stores.",
    role: "Developer",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "NextAuth", "Tailwind CSS"],
    live_url: "https://prism.panatradeprestasi.com/",
    image_url: "/projects/prism.jpg",
    started_on: "2026-02-09",
    last_activity: "2026-10-28",
    sort_order: 1,
    id: {
      summary: "Platform operasional harian untuk toko ritel PNT.",
      description:
        "PRISM (Prestasi Retail Integrated Store Management) adalah aplikasi harian toko untuk toko ritel PNT. Karyawan masuk dengan NIK untuk absen masuk dan pulang, mencatat istirahat, dan menyelesaikan tugas harian seperti pengecekan pembukaan toko dan kerapian. Manajer mengelola kas kecil, laporan harian, isu, dan jadwal bulanan antartoko.",
      role: "Developer",
    },
  }),
  p({
    slug: "medusa-commerce",
    title: "PNT Commerce on Medusa",
    summary: "Medusa e-commerce with a consumer store and a B2B storefront.",
    description:
      "An e-commerce platform built on Medusa JS as a monorepo: a customised backend, a consumer storefront with cart, checkout and customer accounts, and a separate B2B storefront. The backend adds custom modules for banners, content and multiple storefronts, payment gateways for Midtrans and DOKU, workflows for pricing and stock locations, and seed scripts for catalogue, B2B and omnichannel data.",
    role: "Developer",
    tags: ["Medusa", "Next.js", "TypeScript", "React"],
    started_on: "2026-09-24",
    last_activity: "2026-10-12",
    sort_order: 2,
    id: {
      summary: "E-commerce Medusa dengan toko konsumen dan storefront B2B.",
      description:
        "Platform e-commerce di atas Medusa JS dalam bentuk monorepo: backend yang disesuaikan, storefront konsumen dengan keranjang, checkout, dan akun pelanggan, serta storefront B2B tersendiri. Backend menambahkan modul khusus untuk banner, konten, dan banyak storefront, payment gateway Midtrans dan DOKU, workflow untuk harga dan lokasi stok, serta skrip seed untuk katalog, B2B, dan data omnichannel.",
      role: "Developer",
    },
  }),
  p({
    slug: "panatrade-b2b",
    title: "Panatrade B2B Portal",
    summary: "Wholesale ordering portal for an official sports-equipment distributor.",
    description:
      "The B2B portal for a distributor of premium sports equipment. Selected partners browse the footwear, apparel, accessories and equipment catalogue and the brands Specs, Piero and Mizuno, use search, an account and a cart, and can reach the sales team directly. It installs as a web app and is in Indonesian.",
    role: "Developer",
    tags: ["React", "PWA"],
    live_url: "https://b2b.panatrade.id/",
    image_url: "/projects/panatrade-b2b.jpg",
    sort_order: 3,
    id: {
      summary: "Portal pemesanan grosir untuk distributor resmi peralatan olahraga.",
      description:
        "Portal B2B untuk distributor peralatan olahraga premium. Mitra terpilih menelusuri katalog sepatu, apparel, aksesori, dan peralatan serta brand Specs, Piero, dan Mizuno, memakai pencarian, akun, dan keranjang, dan dapat langsung menghubungi tim sales. Dapat dipasang sebagai aplikasi web dan berbahasa Indonesia.",
      role: "Developer",
    },
  }),
  p({
    slug: "pdm",
    title: "PDM",
    summary: "Product data management for footwear and sports gear.",
    description:
      "A product data manager for footwear, apparel, accessories and equipment. Products are organised into silos (families), models and colour articles with SKUs, and each model breaks down into parts and components that point to materials with unit costs and suppliers. Models export to Excel.",
    role: "Developer",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Tailwind CSS"],
    started_on: "2025-12-04",
    last_activity: "2025-12-04",
    sort_order: 85,
    id: {
      summary: "Manajemen data produk untuk sepatu dan perlengkapan olahraga.",
      description:
        "Pengelola data produk untuk sepatu, apparel, aksesori, dan peralatan. Produk disusun dalam silo (keluarga), model, dan artikel warna dengan SKU, lalu setiap model diurai menjadi bagian dan komponen yang merujuk ke material beserta biaya satuan dan pemasoknya. Model dapat diekspor ke Excel.",
      role: "Developer",
    },
  }),
  p({
    slug: "sample-storage",
    title: "Sample Storage",
    summary: "Inventory and borrowing system for a product sample room.",
    description:
      "An inventory app for a product sample room. Items are tracked by box and location, staff request or borrow samples through an approval flow, every movement is logged, and clearance forms are generated as PDF. It imports and exports Excel and CSV, and has dashboards for each role: item master, storage master, manager and superadmin.",
    role: "Developer",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "Neon", "NextAuth", "Recharts"],
    started_on: "2025-10-01",
    last_activity: "2025-11-25",
    sort_order: 87,
    id: {
      summary: "Sistem inventaris dan peminjaman untuk ruang sampel produk.",
      description:
        "Aplikasi inventaris untuk ruang sampel produk. Barang dilacak per kotak dan lokasi, staf mengajukan atau meminjam sampel lewat alur persetujuan, setiap perpindahan dicatat, dan formulir clearance dibuat sebagai PDF. Mendukung impor dan ekspor Excel dan CSV, dengan dasbor untuk tiap peran: item master, storage master, manajer, dan superadmin.",
      role: "Developer",
    },
  }),

  // Drafts: the repos exist but their purpose could not be verified. Fill in and publish from /admin/projects.
  p({
    slug: "knock-website",
    title: "Knock",
    summary: "Website for a home and space improvement studio.",
    description:
      "A marketing site for Knock, an Indonesian studio for home and space improvement in South Tangerang. It shows the services and project portfolio, books free consultations through a schedule page and offers round-the-clock support. In Indonesian.",
    tags: ["Next.js", "TypeScript", "NextAuth", "Drizzle ORM", "Twilio", "Cloudinary"],
    repo_url: `${GH}/knock-website`,
    live_url: "https://knockstudio.id",
    image_url: "/projects/knock-studio.jpg",
    started_on: "2026-02-03",
    last_activity: "2026-02-16",
    sort_order: 5,
    featured: true,
    id: {
      summary: "Situs untuk studio perbaikan rumah dan ruang.",
      description:
        "Situs pemasaran Knock, studio perbaikan rumah dan ruang di Tangerang Selatan. Menampilkan layanan dan portofolio proyek, menerima jadwal konsultasi gratis lewat halaman jadwal, serta dukungan sepanjang waktu. Berbahasa Indonesia.",
    },
  }),
  p({ slug: "knock-studio-stg", title: "Knock Studio (staging)", tags: ["Next.js", "TypeScript", "NextAuth", "Drizzle ORM"], repo_url: `${GH}/knock-studio-stg`, started_on: "2026-02-06", last_activity: "2026-02-13", sort_order: 110, published: false }),
  p({
    slug: "kimi-group",
    title: "KINY GROUP",
    summary: "Corporate website for a holding company with 15+ brands.",
    description:
      "The website of KINY GROUP, a South Jakarta group that runs more than 15 brands. It has a brand directory, an about page, a blog, a contact form and a sign-in area, with image uploads through Cloudinary. In English.",
    tags: ["Next.js", "TypeScript", "NextAuth", "Drizzle ORM", "Cloudinary", "EmailJS"],
    repo_url: `${GH}/kimi-group`,
    live_url: "https://www.kinygroup.org",
    image_url: "/projects/kiny-group.jpg",
    started_on: "2025-12-13",
    last_activity: "2026-01-20",
    sort_order: 6,
    featured: true,
    id: {
      summary: "Situs korporat untuk holding dengan 15+ brand.",
      description:
        "Situs KINY GROUP, grup usaha di Jakarta Selatan yang menaungi lebih dari 15 brand. Ada direktori brand, halaman tentang, blog, formulir kontak, dan area masuk, dengan unggah gambar lewat Cloudinary. Berbahasa Inggris.",
    },
  }),
  p({ slug: "bachelor-camp", title: "Bachelor Camp", tags: ["Next.js", "TypeScript", "tRPC", "Drizzle ORM", "Clerk", "UploadThing"], repo_url: `${GH}/bachelor-camp`, started_on: "2025-08-24", last_activity: "2025-12-26", sort_order: 130, published: false }),
  p({ slug: "university-library-ls", title: "University Library", tags: ["Next.js", "TypeScript", "Drizzle ORM", "Tailwind CSS"], repo_url: `${GH}/university-library-ls`, started_on: "2025-08-05", last_activity: "2025-08-05", sort_order: 140, published: false }),
  p({ slug: "valent", title: "Valent", tags: ["React", "Vite", "Tailwind CSS"], repo_url: `${GH}/valent`, started_on: "2025-08-20", last_activity: "2025-08-21", sort_order: 150, published: false }),
];

// Rows from the earlier seed (another GitHub account). Untouched ones are deleted, edited ones are unpublished.
export const legacySlugs = [
  "event-pos",
  "medusa-storefront",
  "store-daily-activity",
  "storage-system",
  "document-management-system",
  "product-lifecycle-management",
  "pnt-try",
  "lil-seonmul",
];

const t = (o) => ({ kind: "project", ends_on: null, is_current: false, org: "", link_url: "", tags: [], published: true, ...o });

// Newest first. The career timeline follows the CV (public/cv/CV-Luis-Ferdinand.pdf).
// A description with several lines is shown as a bulleted list on the About page.
export const timeline = [
  t({
    kind: "work",
    starts_on: "2025-02-01",
    is_current: true,
    title: "Full-Stack Web Developer",
    org: "Panatrade Prestasi",
    description: [
      "B2B wholesale ordering platform for 20+ business customers: orders placed up to 40% faster, with products and stock visible to every customer.",
      "PRISM: monitoring of sales, staff tasks and operations for 40+ stores, with reporting 300% more efficient for Operations, Finance & Accounting, IT and Audit.",
      "Sample Storage System: 75% fewer inventory recording errors.",
      "Document Management System: 5,000+ internal documents, full-content search that finds files up to 120% faster, and automatic foldering on upload.",
      "IT Activity Management: a task app used by 10+ IT staff, with 50% more accurate and efficient task completion.",
      "PNT Point of Sale: handles 1,000+ transactions per bazaar and cuts processing time by 200%.",
      "E-commerce full update: contributing to a new e-commerce platform to modernise the system and improve performance (in development).",
    ].join("\n"),
    tags: ["Next.js", "TypeScript", "React", "Laravel", "PostgreSQL"],
    id: {
      title: "Full-Stack Web Developer",
      description: [
        "Platform pemesanan grosir B2B untuk 20+ pelanggan bisnis: pemesanan hingga 40% lebih cepat, dengan produk dan stok yang mudah dilihat pelanggan.",
        "PRISM: pemantauan penjualan, tugas karyawan, dan operasional untuk 40+ toko, dengan efisiensi pelaporan naik 300% untuk Operasional, Finance Accounting, IT, dan Audit.",
        "Sample Storage System: kesalahan pencatatan inventaris turun 75%.",
        "Document Management System: 5.000+ dokumen internal, pencarian isi dokumen hingga 120% lebih cepat, dan foldering otomatis saat unggah.",
        "IT Activity Management: aplikasi tugas untuk 10+ staf IT, dengan ketepatan dan efisiensi penyelesaian tugas naik 50%.",
        "PNT Point of Sale: mendukung 1.000+ transaksi setiap bazaar dan memangkas waktu pemrosesan 200%.",
        "E-Commerce Full Update: berkontribusi pada platform e-commerce baru untuk modernisasi sistem dan peningkatan performa (tahap pengembangan).",
      ].join("\n"),
    },
  }),
  t({
    kind: "work",
    starts_on: "2023-01-01",
    is_current: true,
    title: "Freelance Full-Stack Web Developer",
    org: "Independent",
    description: [
      "Akiro Laundry: a laundry management app that speeds up transaction recording and order tracking by up to 500%, plus a marketing website that lifted orders by 100%.",
      "Inggris Go: a responsive education website that grew online registrations by 35%.",
      "LigaLokal: a football competition platform managing 500+ players and 50+ matches.",
      "Company and business websites: 15+ websites and business apps for different clients, covering responsive design, backend integration and deployment.",
    ].join("\n"),
    tags: ["Next.js", "React", "Laravel", "PostgreSQL"],
    link_url: "/portfolio",
    id: {
      title: "Freelance Full-Stack Web Developer",
      org: "Mandiri",
      description: [
        "Akiro Laundry: aplikasi manajemen laundry yang mempercepat pencatatan transaksi dan pemantauan pesanan hingga 500%, ditambah website pemasaran yang meningkatkan pemesanan 100%.",
        "Inggris Go: website pendidikan responsif yang meningkatkan jumlah pendaftaran online sebesar 35%.",
        "LigaLokal: platform kompetisi sepak bola dengan pengelolaan 500+ pemain dan 50+ pertandingan.",
        "Website perusahaan dan bisnis: 15+ website dan aplikasi bisnis untuk berbagai klien, mencakup desain responsif, integrasi backend, dan deployment.",
      ].join("\n"),
    },
  }),
  t({
    kind: "work",
    starts_on: "2022-02-01",
    ends_on: "2023-12-31",
    title: "Intern",
    org: "International Office, Universitas Mercu Buana",
    description: [
      "Supported the coordination of 10+ international programmes, including student exchanges and short courses.",
      "Managed digital publications, built website mockups and assisted 100+ international participants.",
    ].join("\n"),
    id: {
      title: "Magang",
      org: "International Office, Universitas Mercu Buana",
      description: [
        "Mendukung koordinasi 10+ program internasional, termasuk pertukaran mahasiswa dan short course.",
        "Mengelola publikasi digital, membuat mockup website, serta mendampingi 100+ peserta internasional.",
      ].join("\n"),
    },
  }),
  t({
    kind: "education",
    starts_on: "2020-07-01",
    ends_on: "2024-10-31",
    title: "Bachelor of Computer Science",
    org: "Universitas Mercu Buana",
    description: [
      "Graduated in 2024 with a GPA of 3.90 / 4.00.",
      "Full scholarship.",
      "Student exchange at ZBTI in Ningbo, China.",
      "GEMASTIK finalist, with an Internet of Things project for Taman Safari.",
    ].join("\n"),
    id: {
      title: "Sarjana Komputer",
      description: [
        "Lulus tahun 2024 dengan IPK 3,90 / 4,00.",
        "Beasiswa penuh.",
        "Student exchange di ZBTI, Ningbo, Tiongkok.",
        "Finalis GEMASTIK, dengan proyek Internet of Things untuk Taman Safari.",
      ].join("\n"),
    },
  }),
];
