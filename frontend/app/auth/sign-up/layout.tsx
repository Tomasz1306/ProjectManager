export default function SignUpPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" border-1 border-white flex w-full">
      <div className="">
        {children}
      </div>
    </section>
  );
}
