import Link from "next/link";

interface subMenu {
  label: string;
  href: string;
}

interface Props {
  label?: string;
  href: string;
  Icon?: Element;
  subMenu?: subMenu[];
}

MainMenuItem.propTypes = {};

export default function MainMenuItem({ label, href, Icon, subMenu }: Props) {
  return (
    <li>
      {!subMenu ? (
        <Link href={href} className='text-secondary'>
          <Icon />
          {label}
        </Link>
      ) : (
        <>
          <Link href={href} className='text-secondary'>
            <Icon />
            {label}
          </Link>
          <ul>
            {subMenu.map((smenu) => (
              <li key={`sm-${smenu.label}`}>
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
