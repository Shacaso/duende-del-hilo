import { ItemLiCreate } from "./navComponents/ItemLiCreate";
import { ItemLiRead } from "./navComponents/ItemLiRead";
import { ItemLiUpdate } from "./navComponents/ItemLiUpdate";
import { ItemLiDelete } from "./navComponents/ItemLiDelete";
import { ItemLiFolder } from "./navComponents/ItemLiFolder";
import { usePathname } from "next/navigation";

export const NavDocs = () => {
	const router = usePathname();

	return (
		<nav className="bg-slate-500 h-max w-full basis-1/5 grid justify-start content-center">
			<ul className="menu menu-xs bg-base-200 rounded-lg w-full max-w-xs">
				<li>
					<a href="/docs">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-4 w-4"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M14 3v4a1 1 0 0 0 1 1h4" />
							<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
							<path d="M11 14h1v4h1" />
							<path d="M12 11h.01" />
						</svg>
						Introducción
					</a>
				</li>
				<ItemLiFolder content="Autenticación" open={true}>
					<ItemLiCreate content="Login" />
					<ItemLiUpdate content="Change Password" />
				</ItemLiFolder>
				<ItemLiFolder content="CRUD de entidades" open={true}>
					<ItemLiFolder content="Bills" open={router.includes("bills")}>
						<ItemLiCreate />
						<ItemLiRead />
						<ItemLiUpdate />
						<ItemLiDelete />
					</ItemLiFolder>
					<ItemLiFolder
						content="Categories"
						open={router.includes("categories")}
					>
						<ItemLiCreate url="/docs/categories/create" />
						<ItemLiRead url="/docs/categories/read" />
						<ItemLiUpdate />
						<ItemLiDelete />
					</ItemLiFolder>
					<ItemLiFolder content="Clients" open={router.includes("clients")}>
						<ItemLiCreate />
						<ItemLiRead />
						<ItemLiUpdate />
						<ItemLiDelete />
					</ItemLiFolder>
					<ItemLiFolder content="Costumes" open={router.includes("costumes")}>
						<ItemLiCreate />
						<ItemLiRead />
						<ItemLiUpdate />
						<ItemLiDelete />
					</ItemLiFolder>
					<ItemLiFolder
						content="Departaments"
						open={router.includes("departaments")}
					>
						<ItemLiCreate />
						<ItemLiRead />
						<ItemLiUpdate />
						<ItemLiDelete />
					</ItemLiFolder>
				</ItemLiFolder>
			</ul>
		</nav>
	);
};
