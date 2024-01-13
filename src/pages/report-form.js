import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';

import reportsData from '../assets/reports.json'; // Import the reports data from the JSON file


import * as fs from 'fs';
import path from 'path'


import styles from '@styles/Home.module.scss';
import { useState } from 'react';




export default function Home() {
  const fs = require('fs');
  const path = require('path');
  const [selectedReport, setSelectedReport]= useState(null);
  const [image, setImage]= useState("");

  
  function handleSubmit(e) {
    e.preventDefault();

    // Get current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
    

      // Create new report object
      const newReport = {
        latitude,
        longitude,
        description: 'A new report added from the form',
        imageURL: 'https://example.com/image.jpg',
      };

      // Read existing reports from file
      const reportsData = JSON.parse(fs.readFileSync('../assets/reports.json'));

      // Add new report to the array
      reportsData.reports.push(newReport);

      // Write updated reports back to file
      fs.writeFileSync('./reports.json', JSON.stringify(reportsData));
    });
  }

  return (
    <Layout>
      <Head>
        <title>Report Form</title>
        <meta name="description" content="Segnala rifiuti abbandonati scattando una foto che sarà localizzata
        e verra aggiunta nella mappa." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Section>
        <Container>
          <h1 className={styles.title}>
         <span  style={{color: ' #0070f3'}}> Segnala i rifiuti che trovi</span>
          </h1>

          <div>
            <form onSubmit={handleSubmit}>
              <input type="file" name="file"  /><br />
              <label style={{marginTop:'20px'}}>Descrizione: (facoltativo)</label><br />
              <input style={{backgroundColor: 'black',width:'100%',height:'90px', borderRadius: '12px',marginTop:'8px',marginBottom:'20px'}} type="text" name="details" /><br />
              <Button type="submit" style={{backgroundColor: '#0070f3',width:'20%', borderRadius: '12px'}}>Invia</Button>
            </form>
          </div>      
        </Container>
      </Section>
    </Layout>
  )
}

