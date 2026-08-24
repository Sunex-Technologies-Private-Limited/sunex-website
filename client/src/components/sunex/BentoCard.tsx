import type { ReactNode } from "react";

export function BentoCard({
  className = "",
  label,
  image,
  children,
}: {
  className?: string;
  label?: string;
  image?: string;
  children: ReactNode;
}) {
  return (
    <article className={`bento-card ${image ? "bento-card--image" : ""} ${className}`}>
      {image && <img src={image} alt="" />}
      {image && <div className="bento-card__shade" />}
      {label && <span className="bento-card__label">{label}</span>}
      <div className="bento-card__content">{children}</div>
    </article>
  );
}
