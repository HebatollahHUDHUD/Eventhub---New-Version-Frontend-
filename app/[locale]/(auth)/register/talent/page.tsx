"use client";

import { useState } from "react";
import TalentRegisterForm from "./Form";
import ResumeForm from "../resume/Form";

const TalentRegisterPage = () => {
  const [step, setStep] = useState("1");

  return (
    <div className="container">
      {step === "1" && <ResumeForm />}
      {step === "2" && <TalentRegisterForm />}
    </div>
  );
};

export default TalentRegisterPage;