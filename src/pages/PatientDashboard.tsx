import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Shield, 
  Search, 
  Plus, 
  CheckCircle, 
  Clock, 
  XCircle,
  Heart,
  Calendar,
  Activity
} from 'lucide-react';
import { mockMedicalRecords, mockInsuranceApplications } from '@/lib/mockApi';
import namasteCodesData from '@/data/namasteCodes.json';
import Modal from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const PatientDashboard = () => {
  const [consentStatus] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(namasteCodesData);
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    diagnosis: '',
    symptoms: '',
    doctorNotes: '',
    urgency: 'normal'
  });
  
  // Mock patient data
  const patientData = {
    name: 'Priya Sharma',
    id: 'PAT-001',
    age: 32,
    bloodType: 'O+',
    lastVisit: '2024-01-20'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults(namasteCodesData);
    } else {
      const filtered = namasteCodesData.filter(
        (code) =>
          code.code.toLowerCase().includes(query.toLowerCase()) ||
          code.description.toLowerCase().includes(query.toLowerCase()) ||
          code.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleNewApplication = () => {
    // Mock submission
    console.log('New application submitted:', applicationForm);
    setShowNewApplication(false);
    setApplicationForm({
      diagnosis: '',
      symptoms: '',
      doctorNotes: '',
      urgency: 'normal'
    });
  };

  return (
    <DashboardLayout 
      title="Patient Portal" 
      subtitle="Manage your health records and insurance applications"
    >
      <div className="space-y-6">
        {/* Patient Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Heart className="w-8 h-8 text-saffron" />
                <div>
                  <p className="text-sm text-muted-foreground">Patient ID</p>
                  <p className="font-semibold text-foreground">{patientData.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-8 h-8 text-green-herbal" />
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-semibold text-foreground">{patientData.bloodType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-teal-deep" />
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-semibold text-foreground">{patientData.age} years</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Shield className={`w-8 h-8 ${consentStatus ? 'text-green-600' : 'text-red-600'}`} />
                <div>
                  <p className="text-sm text-muted-foreground">Consent</p>
                  <p className="font-semibold text-foreground">
                    {consentStatus ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 shadow-neumorphic">
            <TabsTrigger value="records" className="font-medium">
              <FileText className="w-4 h-4 mr-2" />
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="search" className="font-medium">
              <Search className="w-4 h-4 mr-2" />
              Code Search
            </TabsTrigger>
            <TabsTrigger value="insurance" className="font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Insurance
            </TabsTrigger>
          </TabsList>

          {/* Medical Records Tab */}
          <TabsContent value="records" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">Your Medical Records</CardTitle>
                <CardDescription>
                  View your complete medical history and diagnoses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMedicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-neumorphic transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{record.diagnosis}</h4>
                      <span className="text-sm text-muted-foreground">{record.date}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">ICD Code:</span>
                        <Badge variant="outline" className="ml-2">{record.icdCode}</Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">NAMASTE Code:</span>
                        <Badge variant="outline" className="ml-2">{record.namasteCode}</Badge>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-muted-foreground text-sm">Doctor:</span>
                      <span className="ml-2 text-sm font-medium">{record.doctor}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{record.notes}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Search Tab */}
          <TabsContent value="search" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">Search Medical Codes</CardTitle>
                <CardDescription>
                  Search for ICD and NAMASTE codes with confidence ratings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by code, description, or category..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {searchResults.map((code) => (
                    <div
                      key={code.code}
                      className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:shadow-neumorphic transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{code.description}</h4>
                          <p className="text-sm text-muted-foreground">{code.category}</p>
                        </div>
                        <Badge 
                          className={`${code.confidence >= 90 ? 'bg-green-100 text-green-800' : 
                            code.confidence >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'} border-0`}
                        >
                          {code.confidence}% Confidence
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">NAMASTE Code:</span>
                          <Badge variant="outline" className="ml-2">{code.code}</Badge>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">ICD Mapping:</span>
                          <Badge variant="outline" className="ml-2">{code.icdMapping}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-teal-deep">Insurance Applications</h3>
                <p className="text-muted-foreground">Manage your insurance claims and applications</p>
              </div>
              <Button 
                variant="accent" 
                className="shadow-elevated"
                onClick={() => setShowNewApplication(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </div>

            <div className="grid gap-4">
              {mockInsuranceApplications.map((application) => (
                <Card key={application.id} className="shadow-neumorphic border-0 bg-card/80">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {application.diagnosis}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Submitted: {application.submittedDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(application.status)}
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(application.status)}
                        >
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">ICD Code:</span>
                        <Badge variant="outline" className="ml-2">{application.icdCode}</Badge>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Claim Readiness:</span>
                          <span className="text-sm font-medium">{application.claimReadiness}%</span>
                        </div>
                        <Progress value={application.claimReadiness} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {mockInsuranceApplications.length === 0 && (
                <Card className="shadow-neumorphic border-0 bg-card/80">
                  <CardContent className="py-12 text-center">
                    <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start your first insurance application to get coverage for your medical treatments.
                    </p>
                    <Button variant="accent">
                      <Plus className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Application Modal */}
      <Modal
        isOpen={showNewApplication}
        onClose={() => setShowNewApplication(false)}
        title="New Insurance Application"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              value={applicationForm.diagnosis}
              onChange={(e) => setApplicationForm(prev => ({ ...prev, diagnosis: e.target.value }))}
              placeholder="Enter diagnosis"
            />
          </div>
          
          <div>
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea
              id="symptoms"
              value={applicationForm.symptoms}
              onChange={(e) => setApplicationForm(prev => ({ ...prev, symptoms: e.target.value }))}
              placeholder="Describe symptoms..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="doctorNotes">Doctor's Notes</Label>
            <Textarea
              id="doctorNotes"
              value={applicationForm.doctorNotes}
              onChange={(e) => setApplicationForm(prev => ({ ...prev, doctorNotes: e.target.value }))}
              placeholder="Doctor's recommendations..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select 
              value={applicationForm.urgency}
              onValueChange={(value) => setApplicationForm(prev => ({ ...prev, urgency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              variant="wellness" 
              onClick={handleNewApplication}
              className="flex-1"
            >
              Submit Application
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowNewApplication(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default PatientDashboard;