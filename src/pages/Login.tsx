// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/enhanced-button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Loader2, Heart, Shield, Stethoscope } from 'lucide-react';
// import trisvaraLogo from '@/assets/trisvara-logo.png';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'patient' | 'doctor' | 'insurance'>('patient');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     const success = await login({ email, password, role });
    
//     if (success) {
//       // Redirect based on role
//       switch (role) {
//         case 'patient':
//           navigate('/patient/dashboard');
//           break;
//         case 'doctor':
//           navigate('/doctor/dashboard');
//           break;
//         case 'insurance':
//           navigate('/insurance/dashboard');
//           break;
//       }
//     } else {
//       setError('Invalid credentials or role mismatch');
//     }
    
//     setIsLoading(false);
//   };

//   const roleIcons = {
//     patient: Heart,
//     doctor: Stethoscope,
//     insurance: Shield
//   };

//   const RoleIcon = roleIcons[role];

//   return (
//     <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 font-source">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23014D4D' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//         }} />
//       </div>

//       <div className="w-full max-w-md relative animate-fade-in">
//         {/* Logo and Branding */}
//         <div className="text-center mb-8">
//           {/* <div className="inline-block p-4 rounded-2xl shadow-neumorphic bg-card mb-4"> */}
//             <img 
//               src={trisvaraLogo} 
//               alt="TRISVARA" 
//               className="w-16 h-16 mx-auto"
//             />
//          {/* </div> */}
//           <h1 className="text-3xl font-inter font-bold text-teal-deep mb-2">
//             TRISVARA
//           </h1>
//           <p className="text-muted-foreground font-medium">
//             Harmonizing Tradition with Global Health Code
//           </p>
//         </div>

//         {/* Login Card */}
//         <Card className="shadow-elevated border-0 bg-card/80 backdrop-blur-sm">
//           <CardHeader className="text-center pb-4">
//             <div className="flex items-center justify-center mb-3">
//               <RoleIcon className="w-6 h-6 text-primary mr-2" />
//               <CardTitle className="font-inter text-xl text-teal-deep">
//                 Welcome Back
//               </CardTitle>
//             </div>
//             <CardDescription className="text-muted-foreground">
//               Sign in to your TRISVARA account
//             </CardDescription>
//           </CardHeader>

//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-6">
//               {/* Role Selection */}
//               <div className="space-y-2">
//                 <Label htmlFor="role" className="text-sm font-medium text-foreground">
//                   Select Your Role
//                 </Label>
//                 <Select value={role} onValueChange={(value: 'patient' | 'doctor' | 'insurance') => setRole(value)}>
//                   <SelectTrigger className="shadow-neumorphic border-border/50 bg-background/50">
//                     <SelectValue placeholder="Choose your role" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-popover border border-border shadow-elevated">
//                     <SelectItem value="patient" className="cursor-pointer">
//                       <div className="flex items-center">
//                         <Heart className="w-4 h-4 mr-2 text-saffron" />
//                         Patient
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="doctor" className="cursor-pointer">
//                       <div className="flex items-center">
//                         <Stethoscope className="w-4 h-4 mr-2 text-green-herbal" />
//                         Doctor
//                       </div>
//                     </SelectItem>
//                     <SelectItem value="insurance" className="cursor-pointer">
//                       <div className="flex items-center">
//                         <Shield className="w-4 h-4 mr-2 text-teal-deep" />
//                         Insurance Administrator
//                       </div>
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium text-foreground">
//                   Email Address
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder={`${role}@trisvara.com`}
//                   required
//                   className="shadow-neumorphic border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium text-foreground">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   className="shadow-neumorphic border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Demo Credentials Info */}
//               <div className="bg-muted/50 p-3 rounded-lg border border-border/30">
//                 <p className="text-xs text-muted-foreground mb-2">
//                   <strong>Demo Credentials:</strong>
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   Email: {role}@trisvara.com<br />
//                   Password: password123
//                 </p>
//               </div>

//               {/* Error Alert */}
//               {error && (
//                 <Alert className="border-destructive/20 bg-destructive/5">
//                   <AlertDescription className="text-destructive text-sm">
//                     {error}
//                   </AlertDescription>
//                 </Alert>
//               )}
//             </CardContent>

//             <CardFooter>
//               <Button
//                 type="submit"
//                 variant="hero"
//                 size="lg"
//                 className="w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Signing In...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>

//         {/* Footer */}
//         <p className="text-center text-xs text-muted-foreground mt-8">
//           © 2024 TRISVARA. Bridging Traditional and Modern Healthcare.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from 'react';
// import { Heart, Shield, Stethoscope, Loader2, ChevronDown } from 'lucide-react';
// import trisvaraLogo from '@/assets/trisvara-logo.png';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('patient');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [animationStep, setAnimationStep] = useState(0);

//   // Animation sequence
//   useEffect(() => {
//     const timeouts = [
//       setTimeout(() => setAnimationStep(1), 500),
//       setTimeout(() => setAnimationStep(2), 1000),
//       setTimeout(() => setAnimationStep(3), 1500),
//     ];
//     return () => timeouts.forEach(clearTimeout);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     // Simulate login process
//     setTimeout(() => {
//       if (email && password) {
//         console.log('Login successful', { email, password, role });
//         // Handle successful login - redirect based on role
//         switch (role) {
//           case 'patient':
//             console.log('Redirecting to patient dashboard');
//             break;
//           case 'doctor':
//             console.log('Redirecting to doctor dashboard');
//             break;
//           case 'insurance':
//             console.log('Redirecting to insurance dashboard');
//             break;
//         }
//       } else {
//         setError('Invalid credentials or role mismatch');
//       }
//       setIsLoading(false);
//     }, 2000);
//   };

//   const roles = [
//     { value: 'patient', label: 'Patient', icon: Heart, color: 'text-orange-500' },
//     { value: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'text-green-600' },
//     { value: 'insurance', label: 'Insurance Administrator', icon: Shield, color: 'text-teal-600' }
//   ];

//   const currentRole = roles.find(r => r.value === role);
//   const RoleIcon = currentRole.icon;

//   // Animated background particles
//   const Particles = () => (
//     <div className="absolute inset-0 overflow-hidden">
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-pulse"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 3}s`,
//             animationDuration: `${3 + Math.random() * 2}s`
//           }}
//         />
//       ))}
//     </div>
//   );

//   // Animated waves
//   const AnimatedWaves = () => (
//     <div className="absolute bottom-0 left-0 w-full overflow-hidden">
//       <svg
//         className="relative block w-full h-20"
//         viewBox="0 0 1200 120"
//         preserveAspectRatio="none"
//       >
//         <path
//           d="M0,60L48,65C96,70,192,80,288,85C384,90,480,90,576,80C672,70,768,50,864,45C960,40,1056,50,1152,55L1200,60V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
//           fill="rgba(255,255,255,0.05)"
//           className="animate-pulse"
//         />
//         <path
//           d="M0,80L48,75C96,70,192,60,288,65C384,70,480,90,576,95C672,100,768,90,864,85C960,80,1056,70,1152,65L1200,60V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
//           fill="rgba(255,255,255,0.03)"
//           style={{ animationDelay: '1s' }}
//           className="animate-pulse"
//         />
//       </svg>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Left Side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
//         {/* Logo Watermark Background */}
//         {/* <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
//           <div className="w-96 h-96 flex items-center justify-center">
//             <div className="w-40 h-40 bg-teal-600 rounded-full flex items-center justify-center">
//               <div className="text-white text-6xl font-bold">T</div> */}
//               {/* Logo Watermark Background */}
// <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
//   <img 
//     src={trisvaraLogo} 
//     alt="Trisvara Logo" 
//     className="w-80 h-80 object-contain"
//   />
// </div>

//             {/* </div>
//           </div>
//         </div> */}

//         <div className={`w-full max-w-md z-10 transition-all duration-1000 ${animationStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           {/* Header */}
//           <div className="text-center mb-8">
//             {/* <div className="inline-block p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
//               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
//                 <div className="text-teal-600 text-2xl font-bold">T</div>
//               </div>
//               <img 
//     src={trisvaraLogo} 
//     alt="Trisvara Logo" 
//     className="w-80 h-80 object-contain"
//   />
//             </div> */}
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//             <p className="text-gray-600">Sign in to your TRISVARA account</p>
//           </div>

//           {/* Login Form */}
//           <div className="space-y-6">
//             {/* Role Selection */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 block">
//                 Select Your Role
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setShowRoleDropdown(!showRoleDropdown)}
//                   className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-teal-400 focus:outline-none focus:border-teal-500 transition-all duration-300 shadow-sm"
//                 >
//                   <div className="flex items-center">
//                     <RoleIcon className={`w-5 h-5 mr-3 ${currentRole.color}`} />
//                     <span className="text-gray-700 font-medium">{currentRole.label}</span>
//                   </div>
//                   <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} />
//                 </button>
                
//                 {showRoleDropdown && (
//                   <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
//                     {roles.map((roleOption) => (
//                       <button
//                         key={roleOption.value}
//                         type="button"
//                         onClick={() => {
//                           setRole(roleOption.value);
//                           setShowRoleDropdown(false);
//                           setEmail(`${roleOption.value}@trisvara.com`);
//                         }}
//                         className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors duration-200 text-left"
//                       >
//                         <roleOption.icon className={`w-5 h-5 mr-3 ${roleOption.color}`} />
//                         <span className="text-gray-700">{roleOption.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 block">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder={`${role}@trisvara.com`}
//                 className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-all duration-300 shadow-sm"
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 block">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-all duration-300 shadow-sm"
//               />
//             </div>

//             {/* Demo Credentials */}
//             <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-xl border border-teal-100">
//               <p className="text-sm font-semibold text-teal-800 mb-2">Demo Credentials:</p>
//               <p className="text-xs text-teal-700">
//                 Email: {role}@trisvara.com<br />
//                 Password: password123
//               </p>
//             </div>

//             {/* Error Alert */}
//             {error && (
//               <div className="bg-red-50 p-4 rounded-xl border border-red-200 animate-pulse">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 transform hover:scale-105 active:scale-95"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                   Signing In...
//                 </div>
//               ) : (
//                 'Sign In'
//               )}
//             </button>

//             {/* Quick Login Buttons */}
//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={() => {
//                   setEmail('patient@trisvara.com');
//                   setPassword('password123');
//                   setRole('patient');
//                 }}
//                 className="flex-1 p-2 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors duration-200"
//               >
//                 Quick Patient Login
//               </button>
//               <button
//                 onClick={() => {
//                   setEmail('doctor@trisvara.com');
//                   setPassword('password123');
//                   setRole('doctor');
//                 }}
//                 className="flex-1 p-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors duration-200"
//               >
//                 Quick Doctor Login
//               </button>
//             </div>
//           </div>

//           {/* Footer */}
//           <p className="text-center text-xs text-gray-500 mt-8">
//             © 2024 TRISVARA. Bridging Traditional and Modern Healthcare.
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Branding */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-300 via-teal-400 to-green-300 relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <Particles />
//         <AnimatedWaves />
        
//         {/* Geometric Patterns */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 right-20 w-40 h-40 border-4 border-white rounded-full animate-pulse"></div>
//           <div className="absolute bottom-32 left-20 w-24 h-24 border-4 border-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute top-1/2 right-1/3 w-32 h-32 border-4 border-white rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
//         </div>

//         {/* Main Content */}
//         <div className="flex items-center justify-center w-full p-12 relative z-10">
//           <div className="text-center text-white">
//             {/* Logo/Icon */}
//             <div className={`mb-8 transition-all duration-1000 ${animationStep >= 2 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
//               {/* <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-3xl mb-6 border border-white/20 shadow-2xl">
//                 <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
//                   <div className="text-teal-600 text-4xl font-bold">T</div>
//                 </div>
//               </div> */}
//               <img 
//     src={trisvaraLogo} 
//     alt="Trisvara Logo" 
//     className="w-80 h-80 object-contain"
//   />
//             </div>

//             {/* Animated Text */}
//             <div className={`transition-all duration-1000 delay-500 ${animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//               <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
//                 TRISVARA
//               </h1>
//               <div className="text-xl font-light mb-8 max-w-md mx-auto leading-relaxed">
//                 <span className="inline-block animate-pulse">Harmonizing</span>{' '}
//                 <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>Tradition</span>{' '}
//                 <span className="inline-block animate-pulse" style={{ animationDelay: '1s' }}>with</span>{' '}
//                 <span className="inline-block animate-pulse" style={{ animationDelay: '1.5s' }}>Global</span>{' '}
//                 <span className="inline-block animate-pulse" style={{ animationDelay: '2s' }}>Health</span>
//               </div>
              
//               {/* Feature Pills */}
//               {/* <div className="flex flex-wrap justify-center gap-3 mt-8">
//                 {['Traditional Medicine', 'Modern Healthcare', 'Global Standards'].map((feature, index) => (
//                   <div
//                     key={feature}
//                     className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 animate-fade-in"
//                     style={{ animationDelay: `${2.5 + index * 0.3}s` }}
//                   >
//                     {feature}
//                   </div>
//                 ))}
//               </div> */}
//             </div>

//             {/* Floating Elements */}
//             <div className="absolute top-1/4 left-12 w-3 h-3 bg-white rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></div>
//             <div className="absolute top-1/3 right-16 w-2 h-2 bg-white rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
//             <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-white rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Shield, Stethoscope, Loader2, ChevronDown } from 'lucide-react';
import trisvaraLogo from '@/assets/trisvara-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Re-introducing hooks for authentication and navigation
  const { login } = useAuth();
  const navigate = useNavigate();

  // Animation sequence
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setAnimationStep(1), 500),
      setTimeout(() => setAnimationStep(2), 1000),
      setTimeout(() => setAnimationStep(3), 1500),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Re-introducing the full login logic from the previous code
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login({ email, password, role });
    
    if (success) {
      // Redirect based on role
      switch (role) {
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'insurance':
          navigate('/insurance/dashboard');
          break;
        default:
          navigate('/'); // Fallback
          break;
      }
    } else {
      setError('Invalid credentials or role mismatch');
    }
    
    setIsLoading(false);
  };

  const roles = [
    { value: 'patient', label: 'Patient', icon: Heart, color: 'text-orange-500' },
    { value: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'text-green-600' },
    { value: 'insurance', label: 'Insurance Administrator', icon: Shield, color: 'text-teal-600' }
  ];

  const currentRole = roles.find(r => r.value === role);
  const RoleIcon = currentRole.icon;

  // Animated background particles
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  // Animated waves
  const AnimatedWaves = () => (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg
        className="relative block w-full h-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60L48,65C96,70,192,80,288,85C384,90,480,90,576,80C672,70,768,50,864,45C960,40,1056,50,1152,55L1200,60V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="rgba(255,255,255,0.05)"
          className="animate-pulse"
        />
        <path
          d="M0,80L48,75C96,70,192,60,288,65C384,70,480,90,576,95C672,100,768,90,864,85C960,80,1056,70,1152,65L1200,60V120H1152C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="rgba(255,255,255,0.03)"
          style={{ animationDelay: '1s' }}
          className="animate-pulse"
        />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Logo Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <img 
            src={trisvaraLogo} 
            alt="Trisvara Logo" 
            className="w-80 h-80 object-contain"
          />
        </div>

        <div className={`w-full max-w-md z-10 transition-all duration-1000 ${animationStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your TRISVARA account</p>
          </div>

          {/* Login Form */}
          {/* Restoring the form element and onSubmit handler */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Select Your Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-teal-400 focus:outline-none focus:border-teal-500 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center">
                    <RoleIcon className={`w-5 h-5 mr-3 ${currentRole.color}`} />
                    <span className="text-gray-700 font-medium">{currentRole.label}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showRoleDropdown && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {roles.map((roleOption) => (
                      <button
                        key={roleOption.value}
                        type="button"
                        onClick={() => {
                          setRole(roleOption.value);
                          setShowRoleDropdown(false);
                          setEmail(`${roleOption.value}@trisvara.com`);
                        }}
                        className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors duration-200 text-left"
                      >
                        <roleOption.icon className={`w-5 h-5 mr-3 ${roleOption.color}`} />
                        <span className="text-gray-700">{roleOption.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`${role}@trisvara.com`}
                className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Demo Credentials */}
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-xl border border-teal-100">
              <p className="text-sm font-semibold text-teal-800 mb-2">Demo Credentials:</p>
              <p className="text-xs text-teal-700">
                Email: {role}@trisvara.com<br />
                Password: password123
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 animate-pulse">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit" // Corrected to type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Quick Login Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setEmail('patient@trisvara.com');
                  setPassword('password123');
                  setRole('patient');
                }}
                className="flex-1 p-2 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors duration-200"
              >
                Quick Patient Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('doctor@trisvara.com');
                  setPassword('password123');
                  setRole('doctor');
                }}
                className="flex-1 p-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors duration-200"
              >
                Quick Doctor Login
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8">
            © 2024 TRISVARA. Bridging Traditional and Modern Healthcare.
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-300 via-teal-400 to-green-300 relative overflow-hidden">
        {/* Animated Background Elements */}
        <Particles />
        <AnimatedWaves />
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 border-4 border-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 border-4 border-white rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center w-full p-12 relative z-10">
          <div className="text-center text-white">
            {/* Logo/Icon */}
            <div className={`mb-8 transition-all duration-1000 ${animationStep >= 2 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
              <img 
                src={trisvaraLogo} 
                alt="Trisvara Logo" 
                className="w-80 h-80 object-contain"
              />
            </div>

            {/* Animated Text */}
            <div className={`transition-all duration-1000 delay-500 ${animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                TRISVARA
              </h1>
              <div className="text-xl font-light mb-8 max-w-md mx-auto leading-relaxed">
                <span className="inline-block animate-pulse">Harmonizing</span>{' '}
                <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>Tradition</span>{' '}
                <span className="inline-block animate-pulse" style={{ animationDelay: '1s' }}>with</span>{' '}
                <span className="inline-block animate-pulse" style={{ animationDelay: '1.5s' }}>Global</span>{' '}
                <span className="inline-block animate-pulse" style={{ animationDelay: '2s' }}>Health</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-12 w-3 h-3 bg-white rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/3 right-16 w-2 h-2 bg-white rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-white rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;