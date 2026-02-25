export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-3xl px-6 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} fastcoder.kr
      </div>
    </footer>
  );
}
