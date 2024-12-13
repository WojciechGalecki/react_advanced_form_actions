import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus(); // must be used in nested component

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
