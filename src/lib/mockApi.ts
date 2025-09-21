import { LoginCredentials, User } from '@/types/auth';

// Mock user data
const mockUsers: Record<string, User & { password: string }> = {
  'patient@trisvara.com': {
    id: '1',
    name: 'Priya Sharma',
    email: 'patient@trisvara.com',
    role: 'patient',
    password: 'password123',
    avatar: undefined
  },
  'doctor@trisvara.com': {
    id: '2', 
    name: 'Dr. Rajesh Kumar',
    email: 'doctor@trisvara.com',
    role: 'doctor',
    password: 'password123',
    avatar: undefined
  },
  'insurance@trisvara.com': {
    id: '3',
    name: 'Anil Gupta',
    email: 'insurance@trisvara.com', 
    role: 'insurance',
    password: 'password123',
    avatar: undefined
  }
};

// Mock login function
export const mockLogin = async (credentials: LoginCredentials): Promise<{
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers[credentials.email];
  
  if (!user) {
    return {
      success: false,
      error: 'User not found'
    };
  }
  
  if (user.password !== credentials.password) {
    return {
      success: false,
      error: 'Invalid password'
    };
  }
  
  if (user.role !== credentials.role) {
    return {
      success: false,
      error: 'Role mismatch'
    };
  }
  
  // Remove password from returned user
  const { password, ...userWithoutPassword } = user;
  
  return {
    success: true,
    user: userWithoutPassword,
    token: `mock-token-${user.id}-${Date.now()}`
  };
};

// Mock medical records
export const mockMedicalRecords = [
  {
    id: '1',
    patientId: '1',
    date: '2024-01-15',
    diagnosis: 'Hypertension',
    icdCode: 'I10',
    namasteCode: 'NAM001',
    doctor: 'Dr. Rajesh Kumar',
    notes: 'Blood pressure monitoring required'
  },
  {
    id: '2', 
    patientId: '1',
    date: '2024-02-20',
    diagnosis: 'Type 2 Diabetes',
    icdCode: 'E11',
    namasteCode: 'NAM002',
    doctor: 'Dr. Rajesh Kumar',
    notes: 'Dietary modifications recommended'
  },
  {
    id: '3',
    patientId: '1', 
    date: '2024-01-10',
    diagnosis: 'Chronic Kidney Disease',
    icdCode: 'N18.6',
    namasteCode: 'NAM003',
    doctor: 'Dr. Rajesh Kumar',
    notes: 'Regular monitoring of kidney function required'
  },
  {
    id: '4',
    patientId: '1',
    date: '2024-01-05',
    diagnosis: 'Bronchial Asthma',
    icdCode: 'J45.9',
    namasteCode: 'NAM006',
    doctor: 'Dr. Rajesh Kumar',
    notes: 'Inhaler prescribed, avoid allergens'
  },
  {
    id: '5',
    patientId: '1',
    date: '2023-12-28',
    diagnosis: 'Gastroesophageal Reflux Disease',
    icdCode: 'K21.9',
    namasteCode: 'NAM008',
    doctor: 'Dr. Rajesh Kumar',
    notes: 'Lifestyle modifications and medication prescribed'
  },
  {
    id: '6',
    patientId: '1',
    date: '2023-12-15',
    diagnosis: 'Migraine Headache',
    icdCode: 'G43.9',
    namasteCode: 'NAM010',
    doctor: 'Dr. Rajesh Kumar',
    notes: 'Trigger identification and preventive medication'
  },
  {
    id: '7',
    patientId: '1',
    date: '2023-12-01',
    diagnosis: 'Rheumatoid Arthritis',
    icdCode: 'M06.9',
    namasteCode: 'NAM007',
    doctor: 'Dr. Rajesh Kumar',
    notes: 'Joint care and anti-inflammatory treatment'
  }
];

// Mock insurance applications
export const mockInsuranceApplications = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Priya Sharma',
    diagnosis: 'Hypertension',
    icdCode: 'I10',
    status: 'pending',
    submittedDate: '2024-01-20',
    claimReadiness: 85
  }
];