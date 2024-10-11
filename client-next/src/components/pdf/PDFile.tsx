/* eslint-disable jsx-a11y/alt-text */
import {
  ClipPath,
  Document,
  Image,
  Page,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { Bill, CostumeCant, Others } from "@/app/lib/definitions";
import {
  stylesDetail,
  stylesNavbar,
  stylesPrice,
  stylesSection,
  stylesSignature,
  stylesTyC,
} from "./assets/styles";

import {
  duendeLogo,
  facebookLogo,
  instagramLogo,
  phoneLogo,
} from "@/components/pdf/assets/images/png";

interface Props {
  data: Bill;
}

export const PDFile = ({ data }: Props) => {
  const fixDate = (date: string) => {
    return date
      .substring(0, data.date.indexOf(" "))
      .split("-")
      .reverse()
      .join("/");
  };

  return (
    <Document>
      <Page size='A4'>
        <View style={{ margin: 30 }}>
          <View style={stylesNavbar.headerStructure}>
            <View>
              <Image src={duendeLogo.src} style={stylesNavbar.logo} />
            </View>
            <View style={stylesNavbar.header}>
              <View style={stylesNavbar.headerItemCenter}>
                <Text style={{ fontSize: 32 }}>El Duende Del Hilo</Text>
              </View>
              <View style={stylesNavbar.headerItemCenterMedia}>
                <Text>Av. J. Vicente Zapata 217 - Ciudad - Mendoza</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                  <View
                    style={{
                      display: "flex",
                      gap: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 13, height: 13 }}
                      src={facebookLogo.src}
                    ></Image>
                    <Text>ElDuendedelHilo</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      gap: 2,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 13, height: 13 }}
                      src={instagramLogo.src}
                    ></Image>
                    <Text>elduendedelhilo217</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 10, height: 10 }}
                    src={phoneLogo.src}
                  ></Image>
                  <Text>261 6845803</Text>
                </View>
              </View>
            </View>
            <View style={stylesNavbar.header}>
              <View style={stylesNavbar.headerItemData}>
                <Text style={{ fontSize: 12 }}>{fixDate(data.date)}</Text>
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
                    <View style={{ width: 400 }}>
                      <Text>Cantidad:</Text>
                    </View>
                    <View style={{ width: 400 }}>
                      <Text>Categoria:</Text>
                    </View>
                    <View style={{ width: 400 }}>
                      <Text>Nombre:</Text>
                    </View>
                    <View style={{ width: 600 }}>
                      <Text>Detalle:</Text>
                    </View>
                    <View style={{ width: 400 }}>
                      <Text>Precio Unitario</Text>
                    </View>
                  </View>
                  {data.costumes.map(
                    (costumeCant: CostumeCant, index: number) => {
                      return (
                        <View style={stylesDetail.detailItem} key={index}>
                          <View style={{ width: 400 }}>
                            <Text>{costumeCant.cant}</Text>
                          </View>
                          <View style={{ width: 400 }}>
                            <Text>{costumeCant.costume.category.name}</Text>
                          </View>
                          <View style={{ width: 400 }}>
                            <Text>{costumeCant.costume.name}</Text>
                          </View>
                          <View
                            style={{
                              width: 600,

                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                            }}
                          >
                            {costumeCant.costume.details
                              .split(" ")
                              .map((c, index) => (
                                <Text key={index}> {c}</Text>
                              ))}
                          </View>
                          <View
                            style={{
                              width: 400,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Text>{costumeCant.costume.category.price}</Text>
                          </View>
                        </View>
                      );
                    }
                  )}
                  {data.others &&
                    data.others.map((other: Others, index: number) => {
                      return (
                        <View style={stylesDetail.detailItem} key={index}>
                          <View style={{ width: 400 }}>
                            <Text>{other.cant}</Text>
                          </View>
                          <View style={{ width: 400 }}>
                            <Text>Accesorio/Otros</Text>
                          </View>
                          <View style={{ width: 400 }}>
                            <Text>{other.name}</Text>
                          </View>
                          <View style={{ width: 600 }}>
                            <Text>---</Text>
                          </View>
                          <View style={{ width: 400 }}>
                            <Text>{other.price}</Text>
                          </View>
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
            <View>
              <Text>Notas: </Text>
            </View>
            <View style={stylesDetail.date}>
              <View>
                <Text>Fecha de retiro {fixDate(data.retirementDate)}</Text>
              </View>
              <View>
                <Text>Fecha de devolucion {fixDate(data.returnedDate)}</Text>
              </View>
            </View>
          </View>
          <View style={stylesTyC.tycStructure}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              Terminos y condiciones
            </Text>
            <Text style={stylesTyC.tyc}>
              Me comprometo a devolver en prefectas condiciones de uso el
              disfraz en la fecha pactada de devolucion.
            </Text>
            <Text style={stylesTyC.tyc}>
              En caso de roturas o extravio me hago responsable, abonando el
              valor correspondiente segun el caso.
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
                  ( Seguro que se reintegra al devolver el disfraz de acuerdo
                  con los terminos y condiciones )
                </Text>
              </View>
              <Text>Total ......$ {data.depositoTotal}</Text>
              <Text>Seña ......$ {data.depositoACuenta}</Text>
              <Text>Saldo .....$ {data.depositoSaldo}</Text>
              {data.depositoDescuento && (
                <Text>Descuento .....$ {data.depositoDescuento}</Text>
              )}
            </View>
            <View style={stylesPrice.price}>
              <Text style={{ fontWeight: "bold" }}>Precio total</Text>
              <Text>Total ......$ {data.precioTotal}</Text>
              <Text>Seña ......$ {data.precioACuenta}</Text>
              <Text>Saldo .....$ {data.precioSaldo}</Text>
              {data.precioDescuento && (
                <Text>Descuento .....$ {data.precioDescuento}</Text>
              )}
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
};

// export default PDFile;
