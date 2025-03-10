export default function KanbanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div >
        {children}
      </div>
    </section>
  );
}
