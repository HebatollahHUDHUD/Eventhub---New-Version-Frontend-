"use client";

import { useState } from "react";
import TalentRegisterForm from "./Form";
import ResumeForm from "../resume/Form";

const TalentRegisterPage = () => {
  const [step, setStep] = useState("1");
  const [extractData, setExtractData] = useState<any>(null);

  return (
    <div className="container">
      {step === "1" && <ResumeForm
        onSuccess={(data) => {
          setExtractData(data);
          setStep("2")
        }}
      />}

      {step === "2" && <TalentRegisterForm extractData={extractData} />}
    </div>
  );
};

export default TalentRegisterPage;