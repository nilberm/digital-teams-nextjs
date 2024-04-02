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

interface ControlTeamsContextData {
  teams: TeamProps[];
  setTeams: (value: any) => void;
}

export const ControlTeamsContext = createContext({} as ControlTeamsContextData);

export function ControlTeamsProvider({ children }: Props) {
  const [teams, setTeams] = useState([]);

  return (
    <ControlTeamsContext.Provider
      value={{
        teams,
        setTeams,
      }}
    >
      {children}
    </ControlTeamsContext.Provider>
  );
}
