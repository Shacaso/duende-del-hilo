/* eslint-disable jsx-a11y/alt-text */
import { Page, Text, Image, View, Document } from "@react-pdf/renderer";

import {
	stylesNavbar,
	stylesSection,
	stylesDetail,
	stylesPrice,
	stylesSignature,
	stylesTyC,
} from "./assets/styles";
import LogoSVG from "./logo.svg";
import LogoPNG from "./logoPNG.png";
import LogoJPG from "./logoJPG.jpg";
import { Bill, Costume } from "@/app/lib/definitions";

const Duende = () => {
	// return <Image src={<LogoSVG />} style={stylesNavbar.logo} />;
};

interface Props {
	data: Bill;
}

export const PDFile = ({ data }: Props) => (
	<Document>
		<Page size="A4">
			<View style={{ margin: 30 }}>
				<View style={stylesNavbar.headerStructure}>
					<View>{/* <Duende /> */}</View>
					<View style={stylesNavbar.header}>
						<View style={stylesNavbar.headerItemCenter}>
							<Text style={{ fontSize: 32 }}>El Duende Del Hilo</Text>
						</View>
						<View style={stylesNavbar.headerItemCenterMedia}>
							<Text>Av. J. Vicente Zapata 217 - Ciudad - Mendoza</Text>
							<Text>[] ElDuendedelHilo [] elduendedelhilo217</Text>
							<Text>T 261 6845803</Text>
						</View>
					</View>
					<View style={stylesNavbar.header}>
						<View style={stylesNavbar.headerItemData}>
							<Text style={{ fontSize: 12 }}>{data.date}</Text>
							<Text style={{ fontSize: 18, marginTop: 7 }}>
								{"N° " + data.billNumber}
							</Text>
						</View>
					</View>
				</View>
				<View style={stylesSection.sectionStructure}>
					<Text>
						{"Nombre y Apellido: " +
							data.client.name +
							" " +
							data.client.surname}
					</Text>
					<Text>{"DNI: " + data.client.dni}</Text>
				</View>
				<View style={stylesDetail.detailStructure}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							border: "1px solid #000",
						}}
					>
						<View>
							<View
								style={{
									display: "flex",
									flexDirection: "column",
									marginRight: 15,
									marginLeft: 15,
								}}
							>
								<View style={stylesDetail.detailItem}>
									<Text>Cantidad:</Text>
									<Text>Categoria:</Text>
									<Text>Disfraz:</Text>
									<Text>Detalle:</Text>
									<Text>Precio Unitario</Text>
								</View>
								{data.costumes.map((costume: Costume) => {
									return (
										<View style={stylesDetail.detailItem} key={costume.id}>
											<Text>1</Text>
											<Text>{costume.category}</Text>
											<Text>{costume.name}</Text>
											<Text>{costume.details}</Text>
											<Text>{costume.price}</Text>
										</View>
									);
								})}

								{/* <View style={stylesDetail.detailItem}>
                  <Text>Categoria:</Text>
                  <Text>Mascara</Text>
                  <Text>Mascara</Text>
                  <Text>Mascara</Text>
                </View>
                <View style={stylesDetail.detailItem}>
                  <Text>Disfraz:</Text>
                  <Text>Mascara</Text>
                  <Text>Mascara</Text>
                  <Text>Mascara</Text>
                </View>
                <View style={stylesDetail.detailItem}>
                  <Text>Detalle:</Text>
                  <Text>Mascara</Text>
                  <Text>Mascara</Text>
                  <Text>Mascara</Text>
                </View> */}
								{/* <View style={stylesDetail.hr}></View> */}
							</View>
						</View>
						{/* <View style={stylesDetail.detailItem}>
              <Text>Precio Unitario</Text>
              <Text>$1000</Text>
              <Text>$200</Text>
              <Text>$950</Text>
            </View> */}
					</View>
					<View style={stylesDetail.date}>
						<View>
							<Text>Fecha de retiro {data.retirementDate}</Text>
						</View>
						<View>
							<Text>Fecha de devolucion {data.returnedDate}</Text>
						</View>
					</View>
				</View>
				<View style={stylesTyC.tycStructure}>
					<Text style={{ fontWeight: "bold", fontSize: 14 }}>
						Terminos y condiciones
					</Text>
					<Text style={stylesTyC.tyc}>
						Me comprometo a devolver en prefectas condiciones de uso el disfraz
						en la fecha pactada de devolucion.
					</Text>
					<Text style={stylesTyC.tyc}>
						En caso de roturas o extravio me hago responsable, abonando el valor
						correspondiente segun el caso.
					</Text>
					<Text style={stylesTyC.tyc}>
						Pasado los cuatro (4) dias sin devolver el/los disfraz/ces, debera
						abonar el valor del alquiler de cada uno.
					</Text>
				</View>
				<View style={stylesPrice.priceStructure}>
					<View style={stylesPrice.price}>
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
						>
							<Text style={{ fontWeight: "bold", width: 170 }}>
								Deposito en garantia
							</Text>
							<Text style={{ fontSize: 10 }}>
								( Seguro que se reintegra al devolver el disfraz de acuerdo con
								los terminos y condiciones )
							</Text>
						</View>
						<Text>Total ....</Text>
						<Text>A cuenta ....</Text>
						<Text>Saldo .....</Text>
					</View>
					<View style={stylesPrice.price}>
						<Text style={{ fontWeight: "bold" }}>Precio total</Text>
						<Text>{"Total .... " + data.amountTotal}</Text>
						<Text>Seña ......$ {data.advancement}</Text>
						<Text>Saldo .....$ {data.remainingBalance}</Text>
					</View>
				</View>
				<View style={stylesSignature.signatureStructure}>
					<View style={stylesSignature.signature}>
						{/* <Text>.</Text> */}
						<Text>............</Text>
						<Text>Firma</Text>
					</View>
					<View style={stylesSignature.signature}>
						{/* <Text>Alejo Matias Araya Federicci</Text> */}
						<Text>.......................</Text>
						<Text>Aclaracion</Text>
					</View>
					<View style={stylesSignature.signature}>
						{/* <Text>42749595</Text> */}
						<Text>..........</Text>
						<Text>N de documento</Text>
					</View>
				</View>
			</View>
		</Page>
	</Document>
);
