import Link from "next/link";

type Props = {
  categories: string[];
};

export default function Sidebar({ categories }: Props) {
  return (
    <ul>
      <li key="all">
        <Link href="/notes/filter/all">All</Link>
      </li>

      {categories.map((category) => (
        <li key={category}>
          <Link href={`/notes/filter/${category}`}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}