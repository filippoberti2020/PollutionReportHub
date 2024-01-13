import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';
import * as ReactLeaflet from 'react-leaflet';
import reportsData from '../assets/reports.json'; // Import the reports data from the JSON file

let MarkerClusterGroup;

if (typeof window !== 'undefined') {
  import('react-leaflet-markercluster').then(module => {
    MarkerClusterGroup = module.default;
    // any other client-side code that depends on MarkerClusterGroup can go here
  });
}
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';




import styles from '@styles/Home.module.scss';
import { useState } from 'react';

const DEFAULT_CENTER = [45.615357, 12.928347]
const DEFAULT_CENTER2 = [45.721715,  13.085844]
const DEFAULT_CENTER3 = [45.490011, 12.483992]
const DEFAULT_CENTER4 = [45.508797, 12.590189]
const DEFAULT_CENTER5 = [45.540673, 12.611359]



export default function Home() {

  const [selectedReport, setSelectedReport]= useState(null);

  return (
    <Layout>
      <Head>
        <title>MappaRifiuti</title>
        <meta name="description" content="Segnala rifiuti abbandonati scattando una foto che sarà localizzata
        e verra aggiunta nella mappa." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <link rel="stylesheet" href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css" />
      </Head>
      
      <Section>
        <Container>
        <div  style={{textAlign:'center', alignItems:'center'}}>
          <h1 className={styles.title}  style={{maxWidth: '700px',marginLeft: 'auto',marginRight: 'auto',marginTop: '30px'}}>
            Segnala i rifiuti abbandonati: Proteggiamo l'ambiente insieme<span  style={{color: ' #0070f3'}}></span>
          </h1>
          <p className={styles.description} style={{maxWidth: '600px',marginLeft: 'auto',marginRight: 'auto',marginTop: '-20px',fontSize: '18px',lineHeight: '28px'}}>
            Uno strumento per segnalare i rifiuti abbandonati e mantenere le nostre comunità pulite e sane
          </p>
          <Button style={{backgroundColor: '#0070f3',textAlign:'center', alignItems:'center',borderRadius: '8px', textTransform: 'none',marginTop: '20px',fontWeight: '400'}} href="/">Segnala i rifiuti adesso</Button>
        </div>
        <section style={{display: 'flex',width: '100%',alignItems:'center',marginTop:'100px'}}>
      <img  style={{width: '180px',padding:' 1rem'}} src="https://logopond.com/logos/dc5cc8314658dcbce4536affc4772f78.png" />
      <img  style={{width: '180px',padding:' 1rem'}} src="https://logopond.com/logos/dc5cc8314658dcbce4536affc4772f78.png" />
      <img  style={{width: '180px',padding:' 1rem'}} src="https://logopond.com/logos/dc5cc8314658dcbce4536affc4772f78.png" />
      <img  style={{width: '180px',padding:' 1rem'}} src="https://logopond.com/logos/dc5cc8314658dcbce4536affc4772f78.png" />
      <img  style={{width: '180px',padding:' 1rem'}} src="https://logopond.com/logos/dc5cc8314658dcbce4536affc4772f78.png" />
          </section>
        <div  style={{textAlign:'center', alignItems:'center',marginTop: '300px'}}>
          <h1 className={styles.title}  style={{maxWidth: '700px',marginLeft: 'auto',marginRight: 'auto',marginTop: '30px'}}>
            Perchè creare una mappa pubblica?<span  style={{color: ' #0070f3'}}></span>
          </h1>
          <p className={styles.description} style={{maxWidth: '500px',marginLeft: 'auto',marginRight: 'auto',marginBottom: '60px'}}>
            MappaRifiuti è uno strumento che permette di segnalare i rifiuti abbandonati semplicemente scattando una foto che verrà localizzata e aggiunta alla mappa. 
            In questo modo, gli utenti possono aiutare a monitorare e segnalare le aree in cui la pulizia è necessaria, contribuendo alla salvaguardia 
            dell'ambiente e alla tutela della salute pubblica.
          </p> 
        </div>

        <MapContainer className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={8}>
       
        
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            {/* Map over the reports and render a marker for each one */}
            {reportsData.reports.map(report => (
              
                  <Marker
                    key={report.latitude + report.longitude}
                    position={[report.latitude, report.longitude]}
  
                  >   
                    <Popup>
                      Cordinate:  <br /> {report.latitude}, {report.longitude} <br /> 
                      Dettagli:   <br />{report.description} <br /> <br />   
                      <img src={report.imageURL} alt={report.description} />                
                    </Popup> 
                  </Marker>                 
                ))}           
              </>
            )}
            </MapContainer>
          <p className={styles.view}>
            <Button style={{backgroundColor: '#0070f3',width:'100%', borderRadius: '12px'}} href="/">Segnala Rifiuto</Button>
          </p>

          <h2 style={{marginTop: '150px'}}>Come è nata l'idea?</h2>
        <p className={styles.description} style={{maxWidth: '1000px', marginTop: '0px'}}>
        Ho creato questa app perché, durante uno dei miei giri in bicicletta lungo la laguna che porta a Lignano, ho notato la 
        presenza di una quantità enorme di rifiuti abbandonati, tra cui plastica, polistirolo e addirittura scafi di piccole barchette. 
        Ho capito che era necessario fare qualcosa per sensibilizzare la gente sul tema dell'abbandono dei rifiuti e renderli più facilmente segnalabili,
        così ho deciso di creare questa web app che permette a chiunque di contribuire alla mappatura dei rifiuti abbandonati, aiutando a 
        mantenere l'ambiente pulito e sicuro. Aiutando le amministrazioni a monitorare e intervenire nella rimozione e schedulazione dei rifiuti.
        </p>


        <h2>Contatti</h2>
        <p className={styles.description} style={{maxWidth: '1000px', marginTop: '0px'}}>
        Se sei intressato a scoprire di più sul progetto o a contattarmi segui il link al mio portfolio.
        </p>
          <p className={styles.view}>
            <Button href="https://github.com/colbyfayock/next-leaflet-starter">Vew on GitHub</Button>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}
