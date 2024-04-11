// import { Container } from "@/components";
import { Welcome, Stat, DashboardPanel } from "./components";
import {
  // ProductIcon,
  ProviderIcon,
  BellSVG,
  IconEntrada,
  UserIcon,
  BillsIcon,
  HistoricalIcon,
  // IconSalida,
} from "@/assets/svg";
import ProductsDashboard from "./components/ProductsDashboard";
import Link from "next/link";
import NotificationDash from "./components/NotificationDash";
// import Link from "next/link";
// import NotificationDash from "@/components/notificacion-dash/NotificationDash";
// import { ProductsDashboard } from "./components/ProductsDashboard";

export default function Dashboard() {
  return (
    <div className=' px-10 mt-5 w-full'>
      <Welcome />
      <div className='flex flex-col justify-center  gap-5 mb-5 md:flex-row md:flex-wrap py-5'>
        <Stat title='Nueva factura' Icon={IconEntrada} url={"/product"} />
        <Stat
          title='Pendinetes de devolucion'
          Icon={HistoricalIcon}
          url={"/history"}
        />
        <Stat title='Facturas' Icon={BillsIcon} url={"/history"} />
      </div>

      <div className=' flex gap-5'>
        <DashboardPanel
          title={"Últimas facturas registradas"}
          Icon={UserIcon}
          isProduct={true}
        >
          <DashboardPanel.Content>
            <ProductsDashboard />
          </DashboardPanel.Content>
          <DashboardPanel.Footer>
            <Link href={"/bill"} className='w-full mt-5 btn btn-primary'>
              Ver más facturas
            </Link>
          </DashboardPanel.Footer>
        </DashboardPanel>

        <DashboardPanel
          title={"Notificaciones"}
          Icon={BellSVG}
          isProduct={false}
        >
          <DashboardPanel.Content>
            <NotificationDash />
          </DashboardPanel.Content>

          <DashboardPanel.Footer>
            <div className='flex flex-col gap-3 mt-5'>
              <Link href={"/notification"} className='w-full btn btn-primary'>
                Ver más notificaciones
              </Link>
            </div>
          </DashboardPanel.Footer>
        </DashboardPanel>
      </div>
    </div>
    // <div className='dashboard-page'>
    //   {/* <Container> */}
    //     <Welcome />
    //     <div className='box-border flex flex-col justify-center w-full gap-5 mb-5 starts-group'>
    //       <Stat
    //         title='Nueva factura'
    //         // stat={products.length}
    //         Icon={IconEntrada}
    //         url={"/product"}
    //       />
    //       {/* <Stat
    //         title='Clientes'
    //         stat={providers.length}
    //         Icon={ProviderIcon}
    //         url={'/provider'}
    //         loading={loadingProviders}
    //       /> */}
    //       <Stat
    //         title='Pendinetes de devolucion'
    //         // stat={movements.filter(m => m.tipo === 'SALIDA').length}
    //         Icon={HistoricalIcon}
    //         url={"/history"}
    //       />
    //       <Stat title='Facturas' Icon={BillsIcon} url={"/history"} />
    //     </div>
    //     <div className='flex flex-col gap-5 mb-5 dashboard-panels md:flex-row '>
    //       {/* <DashboardPanel
    //         title={"Últimas facturas registradas"}
    //         Icon={UserIcon}
    //         isProduct={true}
    //       >
    //         <DashboardPanel.Content>
    //           <ProductsDashboard />
    //         </DashboardPanel.Content>
    //         <DashboardPanel.Footer>
    //           <Link href={"/product"} className='w-full mt-5 btn btn-primary'>
    //             Ver más facturas
    //           </Link>
    //         </DashboardPanel.Footer>
    //       </DashboardPanel>

    //       <DashboardPanel
    //         title={"Notificaciones"}
    //         Icon={BellSVG}
    //         isProduct={false}
    //       >
    //         <DashboardPanel.Content>
    //           <NotificationDash />
    //         </DashboardPanel.Content>

    //         <DashboardPanel.Footer>
    //           <div className='flex flex-col gap-3 mt-5'>
    //             <Link href={"/notification"} className='w-full btn btn-primary'>
    //               Ver más notificaciones
    //             </Link>
    //           </div>
    //         </DashboardPanel.Footer>
    //       </DashboardPanel> */}
    //     </div>
    //   {/* </Container> */}
    // </div>
  );
}
