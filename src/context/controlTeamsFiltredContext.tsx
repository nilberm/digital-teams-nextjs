"use client";

import React, { createContext, useState } from "react";

interface TeamProps {
  name: string;
  visible: boolean;
  size: number;
  participants: ParticipantProps[];
}

interface ParticipantProps {
  name: string;
}

interface Props {
  children: React.ReactNode;
}

interface ControlTeamsFiltredContextData {
  teamsFiltred: TeamProps[];
  setTeamsFiltred: (value: any) => void;
}

export const ControlTeamsFiltredContext = createContext(
  {} as ControlTeamsFiltredContextData
);

export function ControlTeamsFiltredProvider({ children }: Props) {
  const [teamsFiltred, setTeamsFiltred] = useState([]);

  return (
    <ControlTeamsFiltredContext.Provider
      value={{
        teamsFiltred,
        setTeamsFiltred,
      }}
    >
      {children}
    </ControlTeamsFiltredContext.Provider>
  );
}
