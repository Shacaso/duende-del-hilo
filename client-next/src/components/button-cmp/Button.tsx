interface Props {
  children?: JSX.Element;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children = <>Button</>,
  className,
  onClick,
}: Props) {
  return (
    <button
      className={`${className} normal-case btn btn-primary btn-block btn-component`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
