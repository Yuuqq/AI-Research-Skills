import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { UserPrefsProvider } from "@/contexts/UserPrefsContext";
import { TopNav } from "@/components/TopNav";
import { BackToTop } from "@/components/BackToTop";

const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const SkillPage = lazy(() => import("@/pages/SkillPage"));
const LearningPathPage = lazy(() => import("@/pages/LearningPathPage"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 border-t-foreground animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/skill/:category/:slug" component={SkillPage} />
        <Route path="/path/:id" component={LearningPathPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <UserPrefsProvider>
                <SearchProvider>
                  <TopNav />
                  <Router />
                  <BackToTop />
                </SearchProvider>
              </UserPrefsProvider>
            </WouterRouter>
            <Toaster />
            <SonnerToaster />
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
