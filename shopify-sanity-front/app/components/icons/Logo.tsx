import clsx from 'clsx';

export default function LogoIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <img
      src="/img/LOGO_FILORGA_BLANC.svg"
      alt="Filorga Logo"
      className={className}
      loading="lazy"
    />
  );
}