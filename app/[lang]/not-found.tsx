import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <section className="surface text-center">
        <p className="chip">404</p>
        <h1 className="h1 mt-5 !text-[clamp(2.25rem,1.2rem+3.6vw,4rem)]">Page not found · Halaman tidak ditemukan</h1>
        <p className="mt-8">
          <Link href="/" className="btn btn-ink">
            Home · Beranda
          </Link>
        </p>
      </section>
    </main>
  );
}
