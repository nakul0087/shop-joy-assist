import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { LogOut, User, Package, MapPin } from "lucide-react";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  session: Session | null;
}

const ProfilePage = ({ onNavigate, session }: ProfilePageProps) => {
  if (!session) {
    onNavigate("auth");
    return null;
  }

  const user = session.user;
  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onNavigate("home");
  };

  return (
    <div className="pb-20 sm:pb-8 px-4 max-w-lg mx-auto animate-fade-in">
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-primary-foreground">{name.charAt(0).toUpperCase()}</span>
        </div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <div className="space-y-3">
        {[
          { icon: Package, label: "My Orders", desc: "Track your orders" },
          { icon: MapPin, label: "Addresses", desc: "Manage delivery addresses" },
          { icon: User, label: "Account Settings", desc: "Edit profile & preferences" },
        ].map(({ icon: Icon, label, desc }) => (
          <button key={label} className="w-full flex items-center gap-4 p-4 bg-card rounded-xl card-shadow hover:card-shadow-hover transition-all text-left">
            <div className="p-2 rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 bg-card rounded-xl card-shadow hover:card-shadow-hover transition-all text-left text-destructive"
        >
          <div className="p-2 rounded-lg bg-destructive/10">
            <LogOut className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-sm">Sign Out</p>
            <p className="text-xs opacity-70">Log out of your account</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
