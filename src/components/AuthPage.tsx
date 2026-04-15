import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Mail, Lock, ArrowLeft } from "lucide-react";

interface AuthPageProps {
  onNavigate: (page: string) => void;
  onAuthSuccess: () => void;
}

const AuthPage = ({ onNavigate, onAuthSuccess }: AuthPageProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Check your email to verify your account." });
        onAuthSuccess();
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!" });
        onAuthSuccess();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pb-20">
      <div className="w-full max-w-sm animate-slide-up">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </button>

        <h1 className="text-2xl font-bold mb-1">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
        <p className="text-muted-foreground text-sm mb-6">
          {mode === "login" ? "Sign in to your StyleBazar account" : "Join StyleBazar for the best shopping experience"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input required type="password" placeholder="Password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                {mode === "login" ? "Sign In" : "Create Account"}
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-semibold text-foreground hover:underline">
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
