export default function PricingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="border-purple-500">
          {children}
      </section>
    );
  }
  