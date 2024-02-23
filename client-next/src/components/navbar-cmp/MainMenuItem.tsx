import Link from "next/link";

interface subMenu {
  label: string;
  href: string;
}

interface Props {
  label?: string;
  href?: string;
  Icon?: Element;
  subMenu?: subMenu[];
  onClick?: () => void;
}

MainMenuItem.propTypes = {};

export default function MainMenuItem({
  label,
  href,
  Icon,
  subMenu,
  onClick,
}: Props) {
  return (
    <li onClick={onClick}>
      {!subMenu ? (
        <Link
          href={href ?? ""}
          className={`text-secondary ${
            label === "Notificacion" &&
            "text-gray-300 [&>svg>path]:fill-gray-300"
          }`}
        >
          <Icon />
          {label}
        </Link>
      ) : (
        <>
          <Link href={href ?? ""} className='text-secondary'>
            <Icon />
            {label}
          </Link>
          <ul>
            {subMenu.map((smenu) => (
              <li className='[&>a]:text-gray-300' key={`sm-${smenu.label}`}>
                <Link href={smenu.href} className='text-secondary'>
                  {smenu.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
}
