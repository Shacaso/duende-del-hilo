interface Props {
  children?: JSX.Element;
  className?: string;
  onClick?: Function;
}

export default function Button({
  children = <>Button</>,
  className,
  onClick,
}: Props) {
  return (
    <button
      className={`${className} normal-case btn btn-primary btn-block btn-component`}
    >
      {children}
    </button>
  );
}
