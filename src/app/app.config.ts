import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"groot-manager","appId":"1:232073246346:web:925ad5e42c4ef1ef2e9f73","storageBucket":"groot-manager.firebasestorage.app","apiKey":"AIzaSyCChVhPKPIE3ii-8p3263-DVn2cNF4gKGc","authDomain":"groot-manager.firebaseapp.com","messagingSenderId":"232073246346","measurementId":"G-9BM8JVQ3GM"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
