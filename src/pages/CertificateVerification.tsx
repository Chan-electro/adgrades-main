import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Award, 
  Calendar, 
  User, 
  Briefcase,
  AlertTriangle,
  Home,
  QrCode
} from 'lucide-react';
import { getCertificateById, isCertificateValid } from '../utils/database';
import { Certificate } from '../types/certificate';
import GlareCard from '../components/GlareCard';

const CertificateVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [certificateId, setCertificateId] = useState(searchParams.get('id') || '');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setCertificateId(id);
      handleVerification(id);
    }
  }, [searchParams]);

  const handleVerification = async (id: string) => {
    if (!id.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const cert = await getCertificateById(id.trim());
      setCertificate(cert);
      
      if (!cert) {
        setError('Certificate not found. Please check the ID and try again.');
      }
    } catch (error) {
      setError('An error occurred while verifying the certificate.');
      console.error('Verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerification(certificateId);
  };

  const isValid = certificate ? isCertificateValid(certificate) : false;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-xl border-b border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-professional-gradient rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-card-foreground">Certificate Verification</h1>
                  <p className="text-muted-foreground">Verify AdGrades employee certificates</p>
                </div>
              </div>
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Form */}
          <GlareCard className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 mb-8">
            <div className="text-center mb-8">
              <QrCode className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-card-foreground mb-4">
                Verify Certificate Authenticity
              </h2>
              <p className="text-muted-foreground text-lg">
                Enter the certificate ID or scan the QR code to verify an AdGrades employee certificate
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate ID (e.g., AGD-ABC123)"
                  className="w-full pl-12 pr-4 py-4 bg-muted/60 backdrop-blur-sm border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground text-center font-mono"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-4 bg-professional-gradient text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="mr-3 h-5 w-5" />
                    Verify Certificate
                  </>
                )}
              </button>
            </form>
          </GlareCard>

          {/* Results */}
          {hasSearched && (
            <GlareCard className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 overflow-hidden">
              {error ? (
                // Error State
                <div className="p-8 text-center">
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-card-foreground mb-4">
                    Certificate Not Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {error}
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                          Verification Failed
                        </h4>
                        <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                          <li>• Double-check the certificate ID for typos</li>
                          <li>• Ensure you have the complete ID</li>
                          <li>• Contact AdGrades if you believe this is an error</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : certificate ? (
                // Success State
                <div>
                  {/* Status Header */}
                  <div className={`p-6 text-center ${
                    isValid 
                      ? 'bg-success/10 border-b border-success/20' 
                      : 'bg-warning/10 border-b border-warning/20'
                  }`}>
                    {isValid ? (
                      <>
                        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-success mb-2">
                          ✓ Certificate Verified
                        </h3>
                        <p className="text-success/80">
                          This is a valid AdGrades employee certificate
                        </p>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-16 w-16 text-warning mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-warning mb-2">
                          ⚠ Certificate Invalid
                        </h3>
                        <p className="text-warning/80">
                          This certificate is expired or has been deactivated
                        </p>
                      </>
                    )}
                  </div>

                  {/* Certificate Details */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <User className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-1">Employee Name</h4>
                            <p className="text-lg text-muted-foreground">{certificate.employeeName}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Briefcase className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-1">Role/Position</h4>
                            <p className="text-lg text-muted-foreground">{certificate.role}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Award className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-1">Achievement</h4>
                            <p className="text-lg text-muted-foreground">{certificate.achievement}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-start">
                          <Calendar className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-1">Issue Date</h4>
                            <p className="text-lg text-muted-foreground">
                              {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {certificate.expiryDate && (
                          <div className="flex items-start">
                            <Calendar className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-card-foreground mb-1">Expiry Date</h4>
                              <p className="text-lg text-muted-foreground">
                                {new Date(certificate.expiryDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="bg-muted/30 rounded-xl p-4">
                          <h4 className="font-semibold text-card-foreground mb-2">Certificate ID</h4>
                          <code className="bg-muted/50 px-3 py-2 rounded-lg text-sm font-mono block">
                            {certificate.id}
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Verification Footer */}
                    <div className="mt-8 pt-6 border-t border-border/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Award className="h-4 w-4 mr-2" />
                          Verified by AdGrades Certificate System
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Verified on {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </GlareCard>
          )}

          {/* Info Section */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              About Certificate Verification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">Secure Database</h4>
                <p className="text-sm text-muted-foreground">
                  All certificates are stored in a secure SQLite database with encryption
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">QR Code Support</h4>
                <p className="text-sm text-muted-foreground">
                  Scan QR codes for instant verification without manual entry
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-success" />
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">Real-time Status</h4>
                <p className="text-sm text-muted-foreground">
                  Get instant verification of certificate validity and status
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;