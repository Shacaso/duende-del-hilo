import {
  ProductIcon,
  ProviderIcon,
  UserIcon,
  HistoricalIcon,
  BellSVG,
  IconEntrada,
  CostumeIcon,
  BillsIcon,
  CategoryIcon,
  BrandIcon,
} from "@/assets/svg";
import Link from "next/link";
import MainMenuItem from "./MainMenuItem";
import Logo from "../Logo";

const menuItems = [
  {
    label: "Nueva factura",
    Icon: IconEntrada,
    href: "/client",
  },
  {
    label: "Notificacion",
    Icon: BellSVG,
    href: "/notification",
  },
  {
    label: "Clientes",
    Icon: UserIcon,
    href: "/client",
    subMenu: [{ label: "Black list", href: "/client" }],
  },
  {
    label: "Facturas",
    Icon: BillsIcon,
    href: "/bill",
  },
  {
    label: "Disfraz",
    Icon: CostumeIcon,
    href: "/costume",
    subMenu: [
      { label: "Cabezones", href: "/costume" },
      { label: "Mascaras", href: "/costume" },
      { label: "Adultos", href: "/costume" },
      { label: "Nignos", href: "/costume" },
      { label: "Accesorios", href: "/costume" },
    ],
  },
  {
    label: "PDF",
    Icon: BillsIcon,
    href: "/pdf",
  },
];

export default function Navbar() {
  return (
    <nav className=' min-h-full pt-5 menu bg-base-200 text-base-content w-60 mr-5 rounded-e-3xl'>
      <Link href={"/home"} className='px-2 mb-[2rem] mx-auto'>
        <Logo />
      </Link>
      <ul>
        {menuItems.map((item, index) => {
          return <MainMenuItem key={index} {...item} />;
        })}
      </ul>
    </nav>
  );
}
