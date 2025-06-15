import type { TypographyProps } from '../model/typography-type.ts';

export function Typography({ ref, style, children, ...props }: TypographyProps) {
  return (
    <span
      ref={ref}
      style={{
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
