import styles from "@/styles/Link.module.css";

export default function Link({
  secondary = false,
  disabled = false,
  to,
  className,
  children,
}: {
  secondary?: boolean;
  disabled?: boolean;
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  let classNames = [styles.link];

  if (secondary) classNames.push(styles.secondary);
  if (disabled) classNames.push(styles.disabled);
  if (typeof className === "string") classNames.push(className);

  return (
    <a href={to} className={classNames.join(" ")}>
      {children}
    </a>
  );
}
