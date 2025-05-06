/*eslint-disable */
'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { signIn } from 'next-auth/react';
import { ShineBorder } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  User,
  Calendar as CalendarIcon,
  Users
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
    }),
  rememberMe: Joi.boolean().default(false),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(2)
    .messages({
      'string.empty': 'Full name is required',
      'string.min': 'Name must be at least 2 characters',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password',
    }),
  birthDate: Joi.date()
    .required()
    .max('now')
    .messages({
      'date.base': 'Please select a valid date',
      'date.max': 'Birth date cannot be in the future',
      'any.required': 'Birth date is required',
    }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': 'Please select a valid gender option',
      'any.required': 'Gender is required',
    }),
});

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("signin");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    register: signInRegister,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
    setValue: setSignInValue,
    watch: watchSignIn
  } = useForm({
    resolver: joiResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    setValue: setRegisterValue,
    watch: watchRegister,
    reset: resetRegister
  } = useForm({
    resolver: joiResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: undefined,
      gender: undefined
    }
  });

  useEffect(() => {
    setSuccess("");
  }, [activeTab]);

  const onSignIn = async (data) => {
    setIsLoading(true);
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw new Error('Invalid email or password');
      }

      setSuccess("Successfully signed in!");

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      setSuccess("");
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data) => {
    setIsLoading(true);
    setSuccess("");

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          birthDate: data.birthDate,
          gender: data.gender
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      setSuccess("Account created successfully!");
      resetRegister();

      setTimeout(() => {
        setActiveTab("signin");
      }, 2000);
    } catch (error) {
      setSuccess("");
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const rememberMe = watchSignIn('rememberMe');
  const birthDate = watchRegister('birthDate');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f1c] via-[#1a1a2e] to-[#0f0f1c] flex items-center justify-center p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 w-full max-w-6xl mt-[20vh] mb-[20vh]">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="show"
          className="text-white max-w-md text-center md:text-left space-y-6 mb-6 md:mb-0"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] mt-[9.5vh]">
              {activeTab === "signin" ? "Welcome Back" : "Join Us Today"}
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              {activeTab === "signin"
                ? "Sign in to continue your personalized experience"
                : "Create an account to get started with our platform"}
            </p>
          </div>

          <div className="hidden md:block">
            <motion.ul
              className="space-y-4 text-md text-white/80"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {[
                "Access your personalized dashboard",
                "Sync across all your devices",
                "Advanced security features",
                "24/7 customer support"
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  variants={fadeIn}
                  className="flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          <Card className="relative bg-[#1e1e2f]/70 backdrop-blur-md border border-white/10 shadow-2xl">
            <ShineBorder shineColor={["#8B5CF6", "#EC4899", "#F59E0B"]} />

            <CardHeader className="pb-3">
              <Tabs
                defaultValue="signin"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full bg-[#14141f]">
                  <TabsTrigger
                    value="signin"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B5CF6]/40 data-[state=active]:to-[#EC4899]/40 text-white"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B5CF6]/40 data-[state=active]:to-[#EC4899]/40 text-white"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-2 text-center text-sm rounded-md bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30"
                    >
                      {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                <TabsContent value="signin" className="mt-4">
                  <form className="space-y-4" onSubmit={handleSignInSubmit(onSignIn)}>
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-white flex items-center gap-2">
                        <Mail size={16} />
                        <span>Email</span>
                      </Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        className="text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20"
                        {...signInRegister('email')}
                      />
                      {signInErrors.email && (
                        <p className="text-red-400 text-sm">{signInErrors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 relative">
                      <Label htmlFor="signin-password" className="text-white flex items-center gap-2">
                        <Lock size={16} />
                        <span>Password</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showSignInPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20 pr-10"
                          {...signInRegister('password')}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          aria-label="Toggle password visibility"
                        >
                          {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {signInErrors.password && (
                        <p className="text-red-400 text-sm">{signInErrors.password.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(val) => setSignInValue('rememberMe', !!val)}
                          className="data-[state=checked]:bg-[#8B5CF6] data-[state=checked]:border-[#8B5CF6]"
                        />
                        <Label htmlFor="remember" className="text-white text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-[#EC4899] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] text-white hover:opacity-90 transition group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Sign In</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-[#1e1e2f] px-2 text-white/60">or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-white text-gray-800 hover:bg-gray-100 transition group flex items-center justify-center gap-2"
                    >
                      <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span>Sign in with Google</span>
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="mt-4">
                  <form className="space-y-4" onSubmit={handleRegisterSubmit(onRegister)}>
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-white flex items-center gap-2">
                        <User size={16} />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Enter your name"
                        className="text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20"
                        {...registerRegister('name')}
                      />
                      {registerErrors.name && (
                        <p className="text-red-400 text-sm">{registerErrors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-white flex items-center gap-2">
                        <Mail size={16} />
                        <span>Email Address</span>
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        className="text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20"
                        {...registerRegister('email')}
                      />
                      {registerErrors.email && (
                        <p className="text-red-400 text-sm">{registerErrors.email.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-birthdate" className="text-white flex items-center gap-2">
                          <CalendarIcon size={16} />
                          <span>Birth Date</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="register-birthdate"
                              variant="outline"
                              className={`w-full justify-start text-left font-normal text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20 ${!birthDate && "text-white/50"}`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {birthDate ? format(birthDate, 'PPP') : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-[#14141f]">
                            <Calendar
                              mode="single"
                              selected={birthDate}
                              onSelect={(date) => setRegisterValue('birthDate', date)}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              className="rounded-md border border-white/10 text-white"
                            />
                          </PopoverContent>
                        </Popover>
                        {registerErrors.birthDate && (
                          <p className="text-red-400 text-sm">{registerErrors.birthDate.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-gender" className="text-white flex items-center gap-2">
                          <Users size={16} />
                          <span>Gender</span>
                        </Label>
                        <Select onValueChange={(value) => setRegisterValue('gender', value)}>
                          <SelectTrigger id="register-gender" className="text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#14141f] border-white/10 text-white">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {registerErrors.gender && (
                          <p className="text-red-400 text-sm">{registerErrors.gender.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 relative">
                      <Label htmlFor="register-password" className="text-white flex items-center gap-2">
                        <Lock size={16} />
                        <span>Password</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showRegisterPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20 pr-10"
                          {...registerRegister('password')}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          aria-label="Toggle password visibility"
                        >
                          {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {registerErrors.password && (
                        <p className="text-red-400 text-sm">{registerErrors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 relative">
                      <Label htmlFor="confirm-password" className="text-white flex items-center gap-2">
                        <Lock size={16} />
                        <span>Confirm Password</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="text-white bg-[#14141f]/70 border-white/10 focus:border-[#8B5CF6]/50 focus-visible:ring-[#8B5CF6]/20 pr-10"
                          {...registerRegister('confirmPassword')}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label="Toggle password visibility"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {registerErrors.confirmPassword && (
                        <p className="text-red-400 text-sm">{registerErrors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] text-white hover:opacity-90 transition group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Create Account</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-[#1e1e2f] px-2 text-white/60">or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-white text-gray-800 hover:bg-gray-100 transition group flex items-center justify-center gap-2"
                    >
                      <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span>Sign up with Google</span>
                    </Button>

                    <p className="text-center text-sm text-white/60 mt-4">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("signin")}
                        className="text-[#EC4899] hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;