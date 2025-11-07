import initSqlJs, { Database } from 'sql.js';
import { Certificate } from '../types/certificate';

let db: Database | null = null;
let isInitialized = false;

// Initialize SQLite database
export const initializeDatabase = async (): Promise<void> => {
  if (isInitialized) return;

  try {
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    });

    // Try to load existing database from localStorage
    const savedDb = localStorage.getItem('adgrades_sqlite_db');
    if (savedDb) {
      const uint8Array = new Uint8Array(JSON.parse(savedDb));
      db = new SQL.Database(uint8Array);
    } else {
      db = new SQL.Database();
      createTables();
    }

    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw new Error('Database initialization failed');
  }
};

// Create database tables
const createTables = (): void => {
  if (!db) throw new Error('Database not initialized');

  const createCertificatesTable = `
    CREATE TABLE IF NOT EXISTS certificates (
      id TEXT PRIMARY KEY,
      employee_name TEXT NOT NULL,
      role TEXT NOT NULL,
      achievement TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      expiry_date TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `;

  const createIndexes = `
    CREATE INDEX IF NOT EXISTS idx_certificates_employee_name ON certificates(employee_name);
    CREATE INDEX IF NOT EXISTS idx_certificates_is_active ON certificates(is_active);
    CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at);
  `;

  db.exec(createCertificatesTable);
  db.exec(createIndexes);
  saveDatabase();
};

// Save database to localStorage
const saveDatabase = (): void => {
  if (!db) return;
  
  try {
    const data = db.export();
    const buffer = Array.from(data);
    localStorage.setItem('adgrades_sqlite_db', JSON.stringify(buffer));
  } catch (error) {
    console.error('Failed to save database:', error);
  }
};

// Generate unique certificate ID
export const generateCertificateId = (): string => {
  const prefix = 'AGD';
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
};

// Convert database row to Certificate object
const rowToCertificate = (row: any): Certificate => ({
  id: row.id,
  employeeName: row.employee_name,
  role: row.role,
  achievement: row.achievement,
  issueDate: row.issue_date,
  expiryDate: row.expiry_date || undefined,
  isActive: Boolean(row.is_active),
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

// Get all certificates
export const getAllCertificates = async (): Promise<Certificate[]> => {
  await initializeDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare('SELECT * FROM certificates ORDER BY created_at DESC');
    const certificates: Certificate[] = [];
    
    while (stmt.step()) {
      const row = stmt.getAsObject();
      certificates.push(rowToCertificate(row));
    }
    
    stmt.free();
    return certificates;
  } catch (error) {
    console.error('Failed to get certificates:', error);
    return [];
  }
};

// Get certificate by ID
export const getCertificateById = async (id: string): Promise<Certificate | null> => {
  await initializeDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare('SELECT * FROM certificates WHERE id = ?');
    stmt.bind([id]);
    
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return rowToCertificate(row);
    }
    
    stmt.free();
    return null;
  } catch (error) {
    console.error('Failed to get certificate:', error);
    return null;
  }
};

// Add new certificate
export const addCertificate = async (certificateData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certificate> => {
  await initializeDatabase();
  if (!db) throw new Error('Database not initialized');

  const newCertificate: Certificate = {
    ...certificateData,
    id: generateCertificateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const stmt = db.prepare(`
      INSERT INTO certificates (
        id, employee_name, role, achievement, issue_date, 
        expiry_date, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run([
      newCertificate.id,
      newCertificate.employeeName,
      newCertificate.role,
      newCertificate.achievement,
      newCertificate.issueDate,
      newCertificate.expiryDate || null,
      newCertificate.isActive ? 1 : 0,
      newCertificate.createdAt,
      newCertificate.updatedAt
    ]);

    stmt.free();
    saveDatabase();
    return newCertificate;
  } catch (error) {
    console.error('Failed to add certificate:', error);
    throw new Error('Failed to create certificate');
  }
};

// Update certificate
export const updateCertificate = async (id: string, updates: Partial<Certificate>): Promise<Certificate | null> => {
  await initializeDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    // First, get the existing certificate
    const existing = await getCertificateById(id);
    if (!existing) return null;

    const updatedCertificate = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const stmt = db.prepare(`
      UPDATE certificates SET 
        employee_name = ?, role = ?, achievement = ?, issue_date = ?,
        expiry_date = ?, is_active = ?, updated_at = ?
      WHERE id = ?
    `);

    stmt.run([
      updatedCertificate.employeeName,
      updatedCertificate.role,
      updatedCertificate.achievement,
      updatedCertificate.issueDate,
      updatedCertificate.expiryDate || null,
      updatedCertificate.isActive ? 1 : 0,
      updatedCertificate.updatedAt,
      id
    ]);

    stmt.free();
    saveDatabase();
    return updatedCertificate;
  } catch (error) {
    console.error('Failed to update certificate:', error);
    return null;
  }
};

// Delete certificate
export const deleteCertificate = async (id: string): Promise<boolean> => {
  await initializeDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare('DELETE FROM certificates WHERE id = ?');
    const result = stmt.run([id]);
    stmt.free();
    
    if (result.changes > 0) {
      saveDatabase();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to delete certificate:', error);
    return false;
  }
};

// Search certificates
export const searchCertificates = async (searchTerm: string): Promise<Certificate[]> => {
  await initializeDatabase();
  if (!db) throw new Error('Database not initialized');

  if (!searchTerm.trim()) {
    return getAllCertificates();
  }

  try {
    const stmt = db.prepare(`
      SELECT * FROM certificates 
      WHERE employee_name LIKE ? OR role LIKE ? OR achievement LIKE ? OR id LIKE ?
      ORDER BY created_at DESC
    `);

    const searchPattern = `%${searchTerm}%`;
    stmt.bind([searchPattern, searchPattern, searchPattern, searchPattern]);

    const certificates: Certificate[] = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      certificates.push(rowToCertificate(row));
    }

    stmt.free();
    return certificates;
  } catch (error) {
    console.error('Failed to search certificates:', error);
    return [];
  }
};

// Get certificate statistics
export const getCertificateStats = async () => {
  await initializeDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM certificates');
    totalStmt.step();
    const total = totalStmt.getAsObject().count as number;
    totalStmt.free();

    const activeStmt = db.prepare('SELECT COUNT(*) as count FROM certificates WHERE is_active = 1');
    activeStmt.step();
    const active = activeStmt.getAsObject().count as number;
    activeStmt.free();

    const currentDate = new Date().toISOString();
    const expiredStmt = db.prepare(`
      SELECT COUNT(*) as count FROM certificates 
      WHERE is_active = 0 OR (expiry_date IS NOT NULL AND expiry_date < ?)
    `);
    expiredStmt.bind([currentDate]);
    expiredStmt.step();
    const expired = expiredStmt.getAsObject().count as number;
    expiredStmt.free();

    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);
    
    const thisMonthStmt = db.prepare('SELECT COUNT(*) as count FROM certificates WHERE created_at >= ?');
    thisMonthStmt.bind([thisMonthStart.toISOString()]);
    thisMonthStmt.step();
    const thisMonth = thisMonthStmt.getAsObject().count as number;
    thisMonthStmt.free();

    return {
      total,
      active,
      expired,
      thisMonth
    };
  } catch (error) {
    console.error('Failed to get certificate stats:', error);
    return {
      total: 0,
      active: 0,
      expired: 0,
      thisMonth: 0
    };
  }
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

// Export database for backup
export const exportDatabase = async (): Promise<Uint8Array | null> => {
  await initializeDatabase();
  if (!db) return null;
  
  try {
    return db.export();
  } catch (error) {
    console.error('Failed to export database:', error);
    return null;
  }
};

// Import database from backup
export const importDatabase = async (data: Uint8Array): Promise<boolean> => {
  try {
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    });

    db = new SQL.Database(data);
    isInitialized = true;
    saveDatabase();
    return true;
  } catch (error) {
    console.error('Failed to import database:', error);
    return false;
  }
};