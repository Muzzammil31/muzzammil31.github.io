import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import {
  About,
  Experience,
  Skills,
  Education,
  Achievements,
  Contact,
  Footer,
} from "@/components/Sections";
import { Toaster } from "@/components/ui/sonner";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";
import { CVViewer } from "@/components/CVViewer";
import { MotionExperience } from "@/components/MotionExperience";
import { DeliveredWork, Journey, FieldNotes, Reputation } from "@/components/Stories";
import "@/styles.css";

export function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <MotionExperience />
      <Hero />
      <About />
      <Experience />
      <Journey />
      <Projects />
      <DeliveredWork />
      <Skills />
      <Certificates />
      <CVViewer />
      <Education />
      <Achievements />
      <FieldNotes />
      <Reputation />
      <Contact />
      <Footer />
      <PortfolioChatbot />
      <Toaster position="bottom-center" />
    </main>
  );
}

const element = document.getElementById("root");
if (!element) throw new Error("Portfolio root element missing");
createRoot(element).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);
