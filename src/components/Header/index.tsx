"use client";

import Image from "next/image";
import style from "./style.module.scss";
import logo from "@/assets/logo.png";
import maginifier from "@/assets/magnifier.png";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ControlTeamsContext } from "@/context/controlTeamsContext";
import { ControlTeamsFiltredContext } from "@/context/controlTeamsFiltredContext";

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const { teams } = useContext(ControlTeamsContext);
  const { setTeamsFiltred } = useContext(ControlTeamsFiltredContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredTeams = teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTeamsFiltred(filteredTeams);
  }, [searchTerm, teams, setTeamsFiltred]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Image src={logo} alt="Logo Digital College" />
      </div>
      <div className={style.inputSearch}>
        <input
          type="text"
          className={style.input}
          placeholder="Qual grupo está procurando?"
          onChange={handleInputChange}
        />
        <Image src={maginifier} alt="search icon" />
      </div>
    </header>
  );
}
