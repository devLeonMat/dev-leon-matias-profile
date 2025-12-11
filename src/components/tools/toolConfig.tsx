import React from "react";
import { PenSquare } from "lucide-react";

export const tools = [
  {
    id: "signature-generator",
    title: "tools.signature-generator.title",
    icon: <PenSquare className="h-5 w-5" />,
    component: React.lazy(() => import("./SignatureGenerator")),
  },
];
