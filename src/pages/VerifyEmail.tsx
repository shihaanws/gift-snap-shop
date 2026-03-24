import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const errorMessage = params.get("error_description") ?? params.get("error") ?? undefined;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (errorMessage) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      navigate("/", { replace: true });
    }, 6000);

    const countdownInterval = window.setInterval(() => {
      setCountdown((previous) => (previous > 0 ? previous - 1 : 0));
    }, 1000);

    return () => {
      window.clearTimeout(redirectTimer);
      window.clearInterval(countdownInterval);
    };
  }, [errorMessage, navigate]);

  const title = errorMessage ? "We couldn't verify your email" : "Email verified!";
  const description = errorMessage
    ? `Supabase reported: ${errorMessage}`
    : `Great! You're confirmed. Redirecting to the gift shop in ${countdown} second${countdown === 1 ? "" : "s"}.`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 md:p-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Email Verification</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your email status is shown below. You can let the timer finish to return to the homepage or jump straight in.
          </p>
          <Alert className="mt-6" variant={errorMessage ? "destructive" : "default"}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link to="/" className="block w-full">
                Continue to Shop Now
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/login" className="block w-full">
                Go to Login
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
