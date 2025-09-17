interface PreguntasCardProps {
  preguntas: string;
  options: string[];
  category: string;
}

export default function PreguntasCard({ preguntas, options, category }: PreguntasCardProps) {
  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "16px",
        background: "#f9f9f9",
      }}
    >
      <h3>{preguntas}</h3>
      <ul>
        {options.map((opt, i) => (
          <li key={i}>{opt}</li>
        ))}
      </ul>
      <em>Categoría: {category}</em>
    </div>
  );
}
