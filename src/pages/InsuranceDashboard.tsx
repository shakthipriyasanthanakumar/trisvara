import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  FileText, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  X
} from 'lucide-react';
import { mockInsuranceApplications } from '@/lib/mockApi';
import Modal from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const InsuranceDashboard = () => {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  // Mock insurance admin data
  const insuranceData = {
    totalApplications: 156,
    pendingReviews: 23,
    approvedClaims: 89,
    averageProcessingTime: '2.3 days'
  };

  // Extended mock applications with more details
  const extendedApplications = [
    ...mockInsuranceApplications,
    {
      id: '2',
      patientId: '2',
      patientName: 'Arjun Patel',
      diagnosis: 'Type 2 Diabetes',
      icdCode: 'E11',
      status: 'approved' as const,
      submittedDate: '2024-01-15',
      claimReadiness: 92,
      estimatedCost: 15000
    },
    {
      id: '3', 
      patientId: '3',
      patientName: 'Meera Singh',
      diagnosis: 'Chronic Kidney Disease',
      icdCode: 'N18.6',
      status: 'pending' as const,
      submittedDate: '2024-01-22',
      claimReadiness: 78,
      estimatedCost: 25000
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
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

  const getReadinessColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDownloadClaim = (applicationId: string) => {
    // Create download link for the PDF
    const link = document.createElement('a');
    link.href = '/sample-claim-package.pdf';
    link.download = `claim-package-${applicationId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = (application: any) => {
    setSelectedApplication(application);
    setShowApprovalModal(true);
  };

  const handleRequestInfo = (application: any) => {
    setSelectedApplication(application);
    setShowRequestModal(true);
  };

  const submitApproval = () => {
    console.log('Approved application:', selectedApplication?.id, 'Notes:', approvalNotes);
    setShowApprovalModal(false);
    setApprovalNotes('');
  };

  const submitRequest = () => {
    console.log('Requested info for application:', selectedApplication?.id, 'Message:', requestMessage);
    setShowRequestModal(false);
    setRequestMessage('');
  };

  return (
    <DashboardLayout 
      title="Insurance Portal" 
      subtitle="Manage claims and application eligibility"
    >
      <div className="space-y-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-teal-deep" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-foreground">{insuranceData.totalApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-saffron" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{insuranceData.pendingReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-herbal" />
                <div>
                  <p className="text-sm text-muted-foreground">Approved Claims</p>
                  <p className="text-2xl font-bold text-foreground">{insuranceData.approvedClaims}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-neumorphic border-0 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Processing</p>
                  <p className="text-lg font-bold text-foreground">{insuranceData.averageProcessingTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 shadow-neumorphic">
            <TabsTrigger value="applications" className="font-medium">
              <FileText className="w-4 h-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Eligibility Check
            </TabsTrigger>
            <TabsTrigger value="reports" className="font-medium">
              <TrendingUp className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">Insurance Applications</CardTitle>
                <CardDescription>
                  Review patient applications and claim readiness scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {extendedApplications.map((application) => (
                  <div
                    key={application.id}
                    className="p-6 rounded-lg bg-muted/30 border border-border/30 hover:shadow-neumorphic transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg mb-1">
                          {application.patientName}
                        </h4>
                        <p className="text-muted-foreground">{application.diagnosis}</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted: {application.submittedDate}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(application.status)}
                          >
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </div>
                        {'estimatedCost' in application && (
                          <p className="text-sm font-medium text-foreground">
                            Est. Cost: ₹{application.estimatedCost.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">ICD Code:</span>
                        <Badge variant="outline" className="ml-2">{application.icdCode}</Badge>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">Patient ID:</span>
                        <span className="ml-2 text-sm font-medium">PAT-00{application.patientId}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Claim Readiness:</span>
                          <span className={`text-sm font-bold ${getReadinessColor(application.claimReadiness)}`}>
                            {application.claimReadiness}%
                          </span>
                        </div>
                        <Progress value={application.claimReadiness} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      {application.status === 'pending' && (
                        <>
                          <Button 
                            variant="wellness" 
                            size="sm"
                            onClick={() => handleApprove(application)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRequestInfo(application)}
                          >
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Request Info
                          </Button>
                        </>
                      )}
                      
                      {application.claimReadiness >= 80 && (
                        <Button 
                          variant="accent" 
                          size="sm"
                          onClick={() => handleDownloadClaim(application.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Claim Package
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligibility Check Tab */}
          <TabsContent value="eligibility" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">ICD Code Eligibility</CardTitle>
                <CardDescription>
                  Check coverage and eligibility for specific medical codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Coverage Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-neumorphic border-border/30">
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Covered Conditions</p>
                        <p className="text-xl font-bold text-foreground">245</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-neumorphic border-border/30">
                      <CardContent className="p-4 text-center">
                        <DollarSign className="w-8 h-8 text-saffron mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Coverage Limit</p>
                        <p className="text-xl font-bold text-foreground">₹5L</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-neumorphic border-border/30">
                      <CardContent className="p-4 text-center">
                        <Users className="w-8 h-8 text-teal-deep mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Active Policies</p>
                        <p className="text-xl font-bold text-foreground">1,247</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Eligibility Check */}
                  <div className="p-6 bg-muted/30 rounded-lg border border-border/30">
                    <h4 className="font-semibold text-foreground mb-4">Quick Eligibility Lookup</h4>
                    <div className="text-center py-8">
                      <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Enter ICD codes to check coverage eligibility and policy limits.
                      </p>
                      <Button variant="accent" className="mt-4">
                        Launch Eligibility Tool
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card className="shadow-elevated border-0 bg-card/80">
              <CardHeader>
                <CardTitle className="font-inter text-teal-deep">Analytics & Reports</CardTitle>
                <CardDescription>
                  Generate and view comprehensive insurance analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="shadow-neumorphic border-border/30">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Claims Processed</p>
                      <p className="text-2xl font-bold text-foreground">1,247</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-neumorphic border-border/30">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-8 h-8 text-saffron mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Total Claims Value</p>
                      <p className="text-2xl font-bold text-foreground">₹2.4Cr</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-neumorphic border-border/30">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-teal-deep mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Approval Rate</p>
                      <p className="text-2xl font-bold text-foreground">87.3%</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Monthly Trends</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h5 className="font-medium mb-2">Top Conditions</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Hypertension</span>
                          <span className="font-medium">23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Diabetes</span>
                          <span className="font-medium">18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Heart Disease</span>
                          <span className="font-medium">15%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h5 className="font-medium mb-2">Processing Times</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Average</span>
                          <span className="font-medium">2.3 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fastest</span>
                          <span className="font-medium">4 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Complex Cases</span>
                          <span className="font-medium">5.2 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button variant="accent" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Monthly Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Approve Insurance Application"
        size="lg"
      >
        {selectedApplication && (
          <div className="space-y-4">
            <Alert className="border-green-500/20 bg-green-500/5">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-700">
                You are about to approve the application for {selectedApplication.patientName}
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Patient</Label>
                <p className="font-medium">{selectedApplication.patientName}</p>
              </div>
              <div>
                <Label>Diagnosis</Label>
                <p className="font-medium">{selectedApplication.diagnosis}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>ICD Code</Label>
                <Badge variant="outline">{selectedApplication.icdCode}</Badge>
              </div>
              <div>
                <Label>Claim Readiness</Label>
                <Badge className="bg-green-100 text-green-800 border-0">
                  {selectedApplication.claimReadiness}%
                </Badge>
              </div>
            </div>
            
            <div>
              <Label htmlFor="approvalNotes">Approval Notes</Label>
              <Textarea
                id="approvalNotes"
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder="Add approval notes (optional)..."
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="wellness" 
                onClick={submitApproval}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Approval
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowApprovalModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Request Info Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request Additional Information"
        size="lg"
      >
        {selectedApplication && (
          <div className="space-y-4">
            <Alert className="border-saffron/20 bg-saffron/5">
              <AlertTriangle className="w-4 h-4 text-saffron" />
              <AlertDescription className="text-saffron">
                Request additional information from {selectedApplication.patientName}
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Patient</Label>
                <p className="font-medium">{selectedApplication.patientName}</p>
              </div>
              <div>
                <Label>Application ID</Label>
                <p className="font-medium">APP-{selectedApplication.id}</p>
              </div>
            </div>
            
            <div>
              <Label htmlFor="requestMessage">Information Required</Label>
              <Textarea
                id="requestMessage"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Specify what additional information is needed..."
                rows={4}
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="accent" 
                onClick={submitRequest}
                className="flex-1"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Send Request
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowRequestModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default InsuranceDashboard;