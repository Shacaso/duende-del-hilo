import { Logo } from '@/components';
import { MainMenuItem } from './MainMenuItem';
import { OpenMainMenuButton } from './OpenMainMenuButton';

import {
  ProductIcon,
  /* StockIcon, */
  ProviderIcon,
  UserIcon,
  HistoricalIcon,
  BellSVG,
  IconEntrada,
  CostumeIcon,
  BillsIcon,
  CategoryIcon,
  BrandIcon,
} from '@/assets/svg';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    label: 'Nueva factura',
    Icon: IconEntrada,
    href: '/provider',
  },
  {
    label: 'Clientes',
    Icon: UserIcon,
    href: '/provider',
  },
{
  label: 'Facturas',
  Icon: BillsIcon,
  href: '/history',
},
{
  label: 'Disfraz',
  Icon: CostumeIcon,
  href: '/product',
  subMenu: [
    { label: 'Cabezones', href: '/product/addProducts' },
    { label: 'Mascaras', href: '/product/subtractProducts' },
    { label: 'Adultos', href: '/product/subtractProducts' },
      { label: 'Nignos', href: '/product/subtractProducts' },
      { label: 'Accesorios', href: '/product/subtractProducts' },
    ],
  },
  // {
  //   label: 'Estadisticas',
  //   Icon: HistoricalIcon,
  //   href: '/history',
  // },
  // {
  //   label: 'Stock',
  //   Icon: StockIcon,
  //   href: '/stock',
  // },
  // {
    //   label: 'Categorías',
    //   Icon: CategoryIcon,
    //   href: '/category',
  // },
  // {
    //   label: 'Marca',
    //   Icon: BrandIcon,
    //   href: '/brand',
    // },
    
   
];

export function MainMenu() {
  return (
    <div className='z-10 lg:ml-0 lg:my-0 lg:drawer-open'>
      <input id='main-menu' type='checkbox' className='drawer-toggle' />
      <OpenMainMenuButton />
      <div className='z-20 h-full drawer-side'>
        <label
          htmlFor='main-menu'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>

        <nav className='z-20 min-h-full pt-5 menu bg-base-200 text-base-content'>
          <Link to={'/'} className='px-2 mb-[2rem]'>
            <Logo />
          </Link>
          <ul>
            {menuItems.map((item, index) => {
              return <MainMenuItem key={index} {...item} />;
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
