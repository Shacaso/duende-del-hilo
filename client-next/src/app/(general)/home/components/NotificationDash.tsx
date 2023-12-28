import Link from "next/link";

export default function NotificationDash() {
  const notification = {
    index: 0,
    to: "#",
    title: "#",
  };
  return (
    <ul className='flex flex-col w-full gap-3 '>
      {/* {filteredNotifications.length > 0 ? (
        filteredNotifications.slice(-7).map((notification, index) => ( */}
      <li key={notification.index}>
        <div className='flex flex-row justify-between border-b-2 [&>a]:text-primary'>
          <Link href={notification.to}>{notification.title}</Link>
          <Link className='mb-1' href={notification.to}>
            <p>Ver Detalles</p>
          </Link>
        </div>
      </li>
      {/* ))
      ) : (
        <p>No hay notificaciones</p>
      )} */}
    </ul>
  );
}
