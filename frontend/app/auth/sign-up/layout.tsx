export default function SignUpPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" border-white flex w-full">
      <div className="">
        {children}
      </div>
    </section>
  );
}
