import { notFound } from 'next/navigation';

export default function CatchAll() {
  notFound(); // This will render the custom 404 page
  return null; // Ensures nothing else is rendered
}
