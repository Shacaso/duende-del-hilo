import { Page, Text, View, Document } from '@react-pdf/renderer';

import {
  stylesNavbar,
  stylesSection,
  stylesDetail,
  stylesPrice,
  stylesSignature,
  stylesTyC,
} from './styles';

import Logo from './logo.svg?react';

export const PDFile = () => (
  <Document>
    <Page size='A4'>
      <View style={{margin:30}}>
      <View style={stylesNavbar.headerStructure}>
        <View>
          {/* <Logo style={stylesNavbar.logo} /> */}
          <Text>EL DUENDE</Text>
        </View>
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
            <Text style={{ fontSize: 12 }}>17/11/2023</Text>
            <Text style={{ fontSize: 18, marginTop: 7 }}>N 27135</Text>
          </View>
        </View>
      </View>
      <View style={stylesSection.sectionStructure}>
        <Text>Nombre y Apellido: Alejo Araya</Text>
        <Text>DNI: 42749595</Text>
      </View>
      <View style={stylesDetail.detailStructure}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            border: '1px solid #000',
          }}
        >
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                // paddingLeft: 20,
                gap: 10,
              }}
            >
              <View style={stylesDetail.detailItem}>
                <Text>Cantidad:</Text>
                <Text>1</Text>
                <Text>2</Text>
                <Text>3</Text>
              </View>
              <View style={stylesDetail.detailItem}>
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
              </View>
            </View>
          </View>
          <View style={stylesDetail.detailItem}>
            <Text>Precio Unitario</Text>
            <Text>$1000</Text>
            <Text>$200</Text>
            <Text>$950</Text>
          </View>
        </View>
        <View style={stylesDetail.date}>
          <View>
            <Text>Fecha de retiro _ _ / _ _ / _ _ _ _</Text>
          </View>
          <View>
            <Text>Fecha de devolucion _ _ / _ _ / _ _ _ _</Text>
          </View>
        </View>
      </View>
      <View style={stylesTyC.tycStructure}>
        <Text style={{ fontWeight: 'bold', fontSize:14 }}>Terminos y condiciones</Text>
        <Text style={stylesTyC.tyc}>
          Me comprometo a devolver en prefectas condiciones de uso el disfraz en
          la fecha pactada de devolucion.
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
          <View style={{ display: 'flex', flexDirection:'column', alignItems: 'flex-start' }}>
            <Text style={{ fontWeight: 'bold', width:170 }}>
              Deposito en garantia
            </Text>
            <Text style={{ fontSize: 10 }}>
              ( Seguro que se reintegra al devolver el disfraz de acuerdo con
              los terminos y condiciones )
            </Text>
          </View>
          <Text>
            Total
            ....$
            5000
          </Text>
          <Text>
            A cuenta
            ....
          </Text>
          <Text>
            Saldo
            .....
          </Text>
        </View>
        <View style={stylesPrice.price}>
          <Text style={{ fontWeight: 'bold' }}>Precio total</Text>
          <Text>
            Total
            .......$
            15000
          </Text>
          <Text>
            Seña
            ......$
            2000
          </Text>
          <Text>
            Saldo
            .....
          </Text>
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
            <Text>
              .......................
            </Text>
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
