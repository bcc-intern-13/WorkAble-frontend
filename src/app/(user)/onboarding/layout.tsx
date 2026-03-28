import Footer from "@/shared/components/Footer";
import NavOnboarding from "@/shared/components/NavbarOnboarding";

export default function LamaranLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavOnboarding />
      {children}
    </>
  );
}
