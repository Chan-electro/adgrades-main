import CryptoJS from 'crypto-js';
import { Certificate } from '../types/certificate';

const STORAGE_KEY = 'adgrades_certificates';
const ENCRYPTION_KEY = 'AdGrades2024SecureKey!@#';

// Encrypt data before storing
const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

// Decrypt data after retrieving
const decryptData = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

// Generate unique certificate ID
export const generateCertificateId = (): string => {
  const prefix = 'AGD';
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
};

// Save certificates to localStorage
export const saveCertificates = (certificates: Certificate[]): void => {
  try {
    const encryptedData = encryptData(certificates);
    localStorage.setItem(STORAGE_KEY, encryptedData);
  } catch (error) {
    console.error('Failed to save certificates:', error);
  }
};

// Load certificates from localStorage
export const loadCertificates = (): Certificate[] => {
  try {
    const encryptedData = localStorage.getItem(STORAGE_KEY);
    if (!encryptedData) return [];
    
    const decryptedData = decryptData(encryptedData);
    return decryptedData || [];
  } catch (error) {
    console.error('Failed to load certificates:', error);
    return [];
  }
};

// Add new certificate
export const addCertificate = (certificateData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Certificate => {
  const certificates = loadCertificates();
  const newCertificate: Certificate = {
    ...certificateData,
    id: generateCertificateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  certificates.push(newCertificate);
  saveCertificates(certificates);
  return newCertificate;
};

// Get certificate by ID
export const getCertificateById = (id: string): Certificate | null => {
  const certificates = loadCertificates();
  return certificates.find(cert => cert.id === id) || null;
};

// Update certificate
export const updateCertificate = (id: string, updates: Partial<Certificate>): Certificate | null => {
  const certificates = loadCertificates();
  const index = certificates.findIndex(cert => cert.id === id);
  
  if (index === -1) return null;
  
  certificates[index] = {
    ...certificates[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveCertificates(certificates);
  return certificates[index];
};

// Delete certificate
export const deleteCertificate = (id: string): boolean => {
  const certificates = loadCertificates();
  const filteredCertificates = certificates.filter(cert => cert.id !== id);
  
  if (filteredCertificates.length === certificates.length) return false;
  
  saveCertificates(filteredCertificates);
  return true;
};

// Check if certificate is valid (not expired and active)
export const isCertificateValid = (certificate: Certificate): boolean => {
  if (!certificate.isActive) return false;
  
  if (certificate.expiryDate) {
    const expiryDate = new Date(certificate.expiryDate);
    const currentDate = new Date();
    return expiryDate > currentDate;
  }
  
  return true;
};