import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  FileCheck, 
  Users, 
  BarChart3, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  Stethoscope,
  Database,
  Search,
  X,
  TrendingUp
} from 'lucide-react';
import Modal from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockMedicalRecords } from '@/lib/mockApi';

const DoctorDashboard = () => {
  const [csvUploadStatus, setCsvUploadStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showPatientRecords, setShowPatientRecords] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    bloodType: '',
    phone: '',
    address: ''
  });
  
  // Mock doctor data
  const doctorData = {
    name: 'Dr. Rajesh Kumar',
    specialty: 'Internal Medicine',
    totalPatients: 127,
    pendingMappings: 8,
    syncStatus: 'Up to date'
  };

  // Mock pending mappings
  const pendingMappings = [
    {
      id: '1',
      patientName: 'Priya Sharma',
      condition: 'Hypertension',
      suggestedICD: 'I10',
      namasteCode: 'NAM001',
      confidence: 95,
      status: 'pending'
    },
    {
      id: '2', 
      patientName: 'Arjun Patel',
      condition: 'Type 2 Diabetes',
      suggestedICD: 'E11',
      namasteCode: 'NAM002',
      confidence: 87,
      status: 'pending'
    }
  ];

  // Mock patient list
  const recentPatients = [
    {
      id: '1',
      name: 'Priya Sharma',
      lastVisit: '2024-01-20',
      condition: 'Hypertension',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Arjun Patel', 
      lastVisit: '2024-01-18',
      condition: 'Diabetes',
      status: 'Follow-up'
    }
  ];

  const handleCsvUpload = () => {
    setCsvUploadStatus('processing');
    setTimeout(() => {
      setCsvUploadStatus('completed');
      setShowAnalytics(true);
    }, 3000);
  };

  const handleReview = (mapping: any) => {
    setSelectedMapping(mapping);
    setShowReviewModal(true);
  };

  const handleApprove = (mappingId: string) => {
    console.log(`Approved mapping ${mappingId}`);
  };

  const handleReject = (mappingId: string) => {
    console.log(`Rejected mapping ${mappingId}`);
  };

  const handleAddPatient = () => {
    console.log('New patient added:', newPatient);
    setShowAddPatient(false);
    setNewPatient({ name: '', age: '', bloodType: '', phone: '', address: '' });
  };

  const handleViewRecords = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientRecords(true);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <DashboardLayout 
      title="Doctor Portal" 
      subtitle="Manage patient records and code mappings"
    >
      <div className="space-y-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-green-herbal" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">{doctorData.totalPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-saffron" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending Mappings</p>
                  <p className="text-2xl font-bold text-foreground">{doctorData.pendingMappings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Database className="w-8 h-8 text-teal-deep" />
                <div>
                  <p className="text-sm text-muted-foreground">Sync Status</p>
                  <p className="text-sm font-semibold text-green-600">{doctorData.syncStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Stethoscope className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Specialty</p>
                  <p className="text-sm font-semibold text-foreground">{doctorData.specialty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="mappings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 shadow-neumorphic">
            <TabsTrigger value="mappings" className="font-medium">
              <FileCheck className="w-4 h-4 mr-2" />
              Mappings
            </TabsTrigger>
            <TabsTrigger value="upload" className="font-medium">
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </TabsTrigger>
            <TabsTrigger value="patients" className="font-medium">
              <Users className="w-4 h-4 mr-2" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-medium">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Mappings Tab */}
          <TabsContent value="mappings" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">Pending Code Mappings</CardTitle>
                <CardDescription>
                  Review and approve AI-suggested code mappings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingMappings.map((mapping) => (
                  <div
                    key={mapping.id}
                    className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-neumorphic transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{mapping.patientName}</h4>
                        <p className="text-sm text-muted-foreground">{mapping.condition}</p>
                      </div>
                      <Badge 
                        className={`${getConfidenceColor(mapping.confidence)} border-0 font-medium`}
                      >
                        {mapping.confidence}% Confidence
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Suggested ICD:</span>
                        <Badge variant="outline" className="ml-2">{mapping.suggestedICD}</Badge>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">NAMASTE Code:</span>
                        <Badge variant="outline" className="ml-2">{mapping.namasteCode}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="wellness" 
                        size="sm"
                        onClick={() => handleApprove(mapping.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReview(mapping)}
                      >
                        Review
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReject(mapping.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CSV Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">NAMASTE CSV Upload</CardTitle>
                <CardDescription>
                  Upload patient data files for code mapping validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {csvUploadStatus === 'idle' && (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload NAMASTE CSV File
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Select your CSV file containing patient records for validation
                    </p>
                    <Button variant="hero" onClick={handleCsvUpload}>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
                
                {csvUploadStatus === 'processing' && (
                  <Alert className="border-saffron/20 bg-saffron/5">
                    <AlertCircle className="w-4 h-4 text-saffron" />
                    <AlertDescription className="text-saffron">
                      Processing CSV file and validating code mappings...
                    </AlertDescription>
                  </Alert>
                )}
                
                {csvUploadStatus === 'completed' && (
                  <Alert className="border-green-500/20 bg-green-500/5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      CSV processed successfully! 8 new mappings ready for review.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-teal-deep">Patient Management</h3>
                <p className="text-muted-foreground">View and manage your patient records</p>
              </div>
              <Button 
                variant="accent"
                onClick={() => setShowAddPatient(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>

            <Card className="shadow-elevated border-0 bg-card/80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-neumorphic transition-all"
                    >
                      <div>
                        <h4 className="font-semibold text-foreground">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {patient.condition} • Last visit: {patient.lastVisit}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">
                          {patient.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewRecords(patient)}
                        >
                          View Records
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">Mapping Analytics</CardTitle>
                <CardDescription>
                  Track your code mapping performance and sync status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="shadow-neumorphic border-border/30">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Approved Mappings</p>
                      <p className="text-2xl font-bold text-foreground">147</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-neumorphic border-border/30">
                    <CardContent className="p-4 text-center">
                      <AlertCircle className="w-8 h-8 text-saffron mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Pending Review</p>
                      <p className="text-2xl font-bold text-foreground">23</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-neumorphic border-border/30">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-teal-deep mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                      <p className="text-2xl font-bold text-foreground">94.2%</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm"><span className="font-medium">Hypertension mapping</span> approved - 95% confidence</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm"><span className="font-medium">Diabetes mapping</span> under review - 87% confidence</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm"><span className="font-medium">CSV batch upload</span> completed - 156 records processed</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Review Code Mapping"
        size="lg"
      >
        {selectedMapping && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Patient</Label>
                <p className="font-medium">{selectedMapping.patientName}</p>
              </div>
              <div>
                <Label>Condition</Label>
                <p className="font-medium">{selectedMapping.condition}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Suggested ICD</Label>
                <Badge variant="outline">{selectedMapping.suggestedICD}</Badge>
              </div>
              <div>
                <Label>NAMASTE Code</Label>
                <Badge variant="outline">{selectedMapping.namasteCode}</Badge>
              </div>
            </div>
            
            <div>
              <Label>Confidence</Label>
              <Badge className={`${getConfidenceColor(selectedMapping.confidence)} border-0`}>
                {selectedMapping.confidence}%
              </Badge>
            </div>
            
            <div>
              <Label htmlFor="reviewComment">Review Comments</Label>
              <Textarea
                id="reviewComment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Add your review comments..."
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="wellness" 
                onClick={() => {
                  handleApprove(selectedMapping.id);
                  setShowReviewModal(false);
                  setReviewComment('');
                }}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  handleReject(selectedMapping.id);
                  setShowReviewModal(false);
                  setReviewComment('');
                }}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Patient Modal */}
      <Modal
        isOpen={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        title="Add New Patient"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="patientName">Full Name</Label>
            <Input
              id="patientName"
              value={newPatient.name}
              onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter patient name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={newPatient.age}
                onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Age"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Input
                id="bloodType"
                value={newPatient.bloodType}
                onChange={(e) => setNewPatient(prev => ({ ...prev, bloodType: e.target.value }))}
                placeholder="e.g., O+"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={newPatient.phone}
              onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone number"
            />
          </div>
          
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={newPatient.address}
              onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Patient address..."
              rows={2}
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              variant="wellness" 
              onClick={handleAddPatient}
              className="flex-1"
            >
              Add Patient
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAddPatient(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Patient Records Modal */}
      <Modal
        isOpen={showPatientRecords}
        onClose={() => setShowPatientRecords(false)}
        title={selectedPatient ? `${selectedPatient.name} - Medical Records` : 'Medical Records'}
        size="xl"
      >
        {selectedPatient && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <Label>Patient ID</Label>
                <p className="font-medium">PAT-00{selectedPatient.id}</p>
              </div>
              <div>
                <Label>Last Visit</Label>
                <p className="font-medium">{selectedPatient.lastVisit}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge variant="outline">{selectedPatient.status}</Badge>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {mockMedicalRecords.filter(record => record.patientId === selectedPatient.id).map((record) => (
                <div key={record.id} className="p-4 bg-muted/20 rounded-lg border border-border/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{record.diagnosis}</h4>
                    <span className="text-sm text-muted-foreground">{record.date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div>
                      <span className="text-muted-foreground">ICD:</span>
                      <Badge variant="outline" className="ml-2 text-xs">{record.icdCode}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">NAMASTE:</span>
                      <Badge variant="outline" className="ml-2 text-xs">{record.namasteCode}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{record.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* CSV Upload Analytics Modal */}
      <Modal
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        title="CSV Upload Analytics"
        size="lg"
      >
        <div className="space-y-4">
          <Alert className="border-green-500/20 bg-green-500/5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-700">
              CSV processed successfully! Here are the analytics:
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-neumorphic border-border/30">
              <CardContent className="p-4 text-center">
                <FileCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Records Processed</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-neumorphic border-border/30">
              <CardContent className="p-4 text-center">
                <AlertCircle className="w-8 h-8 text-saffron mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">New Mappings</p>
                <p className="text-2xl font-bold text-foreground">23</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Processing Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>High Confidence (&gt;90%)</span>
                <span className="text-green-600 font-medium">18 mappings</span>
              </div>
              <div className="flex justify-between">
                <span>Medium Confidence (70-90%)</span>
                <span className="text-yellow-600 font-medium">4 mappings</span>
              </div>
              <div className="flex justify-between">
                <span>Low Confidence (&lt;70%)</span>
                <span className="text-red-600 font-medium">1 mapping</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="accent" 
            onClick={() => setShowAnalytics(false)}
            className="w-full"
          >
            View Pending Mappings
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default DoctorDashboard;