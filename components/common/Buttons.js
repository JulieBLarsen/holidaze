export function PrimaryButton({ type, children }) {
  return (
    <button
      type={type}
      className="text-white shadow transition  bg-primary hover:bg-primary-light focus:outline-none active:shadow-none active:bg-primary rounded-md py-2 px-4 m-0 flex items-center">
      {children}
    </button>
  );
}
