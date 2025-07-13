export default function useInitials(name: string) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const firstName = name.split(" ")[0];
  return { initials, firstName };
}
