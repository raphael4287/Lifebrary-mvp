import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import StoryReader from "./pages/StoryReader";
import Submit from "./pages/Submit";
import Profile from "./pages/Profile";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/explore"} component={Explore} />
      <Route path={"/story/:id"} component={StoryReader} />
      <Route path={"/submit"} component={Submit} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - Lifebrary uses warm retro literary style with light theme
// - Colors: warm beige background, deep brown text, warm gold accents
// - Fonts: Syne (headings) + Noto Sans TC (body)

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
