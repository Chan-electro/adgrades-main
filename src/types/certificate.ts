export interface Certificate {
  id: string;
  employeeName: string;
  role: string;
  achievement: string;
  issueDate: string;
  expiryDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateFormData {
  employeeName: string;
  role: string;
  achievement: string;
  expiryDate?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}