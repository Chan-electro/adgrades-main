import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Download, 
  QrCode, 
  LogOut,
  Award,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Copy,
  ExternalLink,
  Upload,
  Database
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { logoutAdmin } from '../utils/auth';
import { 
  getAllCertificates,
  deleteCertificate, 
  updateCertificate,
  isCertificateValid,
  searchCertificates,
  getCertificateStats,
  addCertificate,
  exportDatabase,
  importDatabase
} from '../utils/database';
import { Certificate } from '../types/certificate';
import GlareCard from '../components/GlareCard';

const AdminDashboard: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    thisMonth: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [certificatesData, statsData] = await Promise.all([
        getAllCertificates(),
        getCertificateStats()
      ]);
      setCertificates(certificatesData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const results = await searchCertificates(searchTerm);
      setCertificates(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const handleDeleteCertificate = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const success = await deleteCertificate(id);
      if (success) {
        await loadData();
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const updated = await updateCertificate(id, { isActive: !currentStatus });
    if (updated) {
      await loadData();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getVerificationUrl = (id: string) => {
    return `${window.location.origin}/verify?id=${id}`;
  };

  const handleExportDatabase = async () => {
    try {
      const data = await exportDatabase();
      if (data) {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `adgrades-certificates-${new Date().toISOString().split('T')[0]}.db`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImportDatabase = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const success = await importDatabase(uint8Array);
      
      if (success) {
        await loadData();
        alert('Database imported successfully!');
      } else {
        alert('Failed to import database. Please check the file format.');
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import database.');
    }
    
    // Reset the input
    event.target.value = '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading certificate data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-professional-gradient rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-card-foreground">Certificate Manager</h1>
                  <p className="text-muted-foreground">AdGrades Admin Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Database Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleExportDatabase}
                    className="flex items-center px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                    title="Export Database"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Export
                  </button>
                  <label className="flex items-center px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300 cursor-pointer">
                    <Upload className="h-5 w-5 mr-2" />
                    Import
                    <input
                      type="file"
                      accept=".db"
                      onChange={handleImportDatabase}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlareCard className="bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-border/50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Certificates</p>
                  <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
                </div>
              </div>
            </GlareCard>

            <GlareCard className="bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-border/50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Active Certificates</p>
                  <p className="text-2xl font-bold text-card-foreground">{stats.active}</p>
                </div>
              </div>
            </GlareCard>

            <GlareCard className="bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-border/50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center mr-4">
                  <XCircle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Expired/Inactive</p>
                  <p className="text-2xl font-bold text-card-foreground">{stats.expired}</p>
                </div>
              </div>
            </GlareCard>

            <GlareCard className="bg-card/60 backdrop-blur-xl p-6 rounded-2xl border border-border/50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">This Month</p>
                  <p className="text-2xl font-bold text-card-foreground">{stats.thisMonth}</p>
                </div>
              </div>
            </GlareCard>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card/60 backdrop-blur-xl border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground"
                />
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-6 py-3 bg-professional-gradient text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Certificate
            </button>
          </div>

          {/* Certificates Table */}
          <GlareCard className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border/30">
                  <tr>
                    <th className="text-left p-4 font-semibold text-card-foreground">Certificate ID</th>
                    <th className="text-left p-4 font-semibold text-card-foreground">Employee</th>
                    <th className="text-left p-4 font-semibold text-card-foreground">Role</th>
                    <th className="text-left p-4 font-semibold text-card-foreground">Achievement</th>
                    <th className="text-left p-4 font-semibold text-card-foreground">Issue Date</th>
                    <th className="text-left p-4 font-semibold text-card-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-card-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((certificate) => (
                    <tr key={certificate.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <code className="bg-muted/50 px-2 py-1 rounded text-sm font-mono">
                          {certificate.id}
                        </code>
                      </td>
                      <td className="p-4 font-medium text-card-foreground">{certificate.employeeName}</td>
                      <td className="p-4 text-muted-foreground">{certificate.role}</td>
                      <td className="p-4 text-muted-foreground max-w-xs truncate">{certificate.achievement}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          isCertificateValid(certificate)
                            ? 'bg-success/20 text-success'
                            : 'bg-warning/20 text-warning'
                        }`}>
                          {isCertificateValid(certificate) ? 'Valid' : 'Invalid/Expired'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedCertificate(certificate);
                              setShowQRModal(true);
                            }}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="View QR Code"
                          >
                            <QrCode className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(getVerificationUrl(certificate.id))}
                            className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                            title="Copy Verification URL"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(certificate.id, certificate.isActive)}
                            className={`p-2 rounded-lg transition-colors ${
                              certificate.isActive
                                ? 'text-warning hover:bg-warning/10'
                                : 'text-success hover:bg-success/10'
                            }`}
                            title={certificate.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {certificate.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(certificate.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Certificate"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {certificates.length === 0 && (
                <div className="text-center py-12">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No certificates found matching your search.' : 'No certificates created yet.'}
                  </p>
                </div>
              )}
            </div>
          </GlareCard>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-border/50 shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Certificate QR Code</h3>
              
              <div className="bg-white p-6 rounded-2xl mb-6 inline-block">
                <QRCodeSVG
                  value={getVerificationUrl(selectedCertificate.id)}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Certificate ID</p>
                  <code className="bg-muted/50 px-3 py-2 rounded-lg text-sm font-mono">
                    {selectedCertificate.id}
                  </code>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee</p>
                  <p className="font-medium text-card-foreground">{selectedCertificate.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Verification URL</p>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted/50 px-3 py-2 rounded-lg text-xs font-mono flex-1 truncate">
                      {getVerificationUrl(selectedCertificate.id)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(getVerificationUrl(selectedCertificate.id))}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => window.open(getVerificationUrl(selectedCertificate.id), '_blank')}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Test Verification
                </button>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 px-4 py-3 bg-muted text-card-foreground rounded-xl hover:bg-muted/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Certificate Modal */}
      {showCreateModal && (
        <CreateCertificateModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadData();
          }}
        />
      )}
    </div>
  );
};

// Create Certificate Modal Component
const CreateCertificateModal: React.FC<{
  onClose: () => void;
  onSuccess: () => void;
}> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    role: '',
    achievement: '',
    expiryDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addCertificate({
        employeeName: formData.employeeName,
        role: formData.role,
        achievement: formData.achievement,
        issueDate: new Date().toISOString(),
        expiryDate: formData.expiryDate || undefined,
        isActive: true
      });

      onSuccess();
    } catch (error) {
      console.error('Failed to create certificate:', error);
      alert('Failed to create certificate. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full border border-border/50 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-card-foreground mb-6">Create New Certificate</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="employeeName" className="block text-sm font-semibold text-card-foreground mb-3">
              Employee Name *
            </label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              required
              value={formData.employeeName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-muted/60 backdrop-blur-sm border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground"
              placeholder="Enter employee name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-card-foreground mb-3">
              Role/Position *
            </label>
            <input
              type="text"
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-muted/60 backdrop-blur-sm border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground"
              placeholder="Enter role or position"
            />
          </div>

          <div>
            <label htmlFor="achievement" className="block text-sm font-semibold text-card-foreground mb-3">
              Achievement/Certification *
            </label>
            <textarea
              id="achievement"
              name="achievement"
              required
              rows={3}
              value={formData.achievement}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-muted/60 backdrop-blur-sm border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground resize-none"
              placeholder="Describe the achievement or certification"
            />
          </div>

          <div>
            <label htmlFor="expiryDate" className="block text-sm font-semibold text-card-foreground mb-3">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-muted/60 backdrop-blur-sm border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-professional-gradient text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" />
                  Create Certificate
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-muted text-card-foreground rounded-2xl hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;