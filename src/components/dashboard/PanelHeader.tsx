export default function PanelHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.FC;
}) {
  const Icon = icon;
  return (
    <div
      style={{
        padding: "0.5rem 1.5rem",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          fontSize: "0.875rem",
        }}
      >
        <Icon />
        <span>{title}</span>
      </div>
    </div>
  );
}
