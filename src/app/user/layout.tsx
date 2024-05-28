import Footer from "@/components/footer";
import Header from "@/components/header/header";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ margin: 0 }}>
      <Header />

      <main>{children}</main>
      <Footer />
    </div>
  );
}
