/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FaPlus, FaXmark } from "react-icons/fa6";
import style from "./style.module.scss";
import GroupCard from "../GroupCard";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import Modal from "../Modal";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import { ControlTeamsContext } from "@/context/controlTeamsContext";
import { ControlTeamsFiltredContext } from "@/context/controlTeamsFiltredContext";
import Image from "next/image";

import emptySvg from "@/assets/undraw_empty_re_opql.svg";
import startSvg from "@/assets/undraw_start_building_re_xani.svg";

interface FormInputsProps {
  name: string;
  size: number;
}

interface GroupsGridProps {}
export default function GroupsGrid(props: GroupsGridProps) {
  const { teams, setTeams } = useContext(ControlTeamsContext);
  const { teamsFiltred } = useContext(ControlTeamsFiltredContext);

  const [openNewTeamModal, setOpenNewTeamModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputsProps>();

  const onSubmit: SubmitHandler<FormInputsProps> = (data) => {
    if (teams) {
      setTeams([
        ...teams,
        {
          name: data.name,
          visible: false,
          size: data.size,
          participants: [],
        },
      ]);
    } else {
      setTeams([
        {
          name: data.name,
          visible: false,
          size: data.size,
          participants: [],
        },
      ]);
    }

    setOpenNewTeamModal(false);
    reset();
  };

  const removeTeam = (teamIndex: number) => {
    setIsDeleting(true);
    setTeams(teams?.filter((_, index) => index !== teamIndex));
  };

  const addParticipant = (teamIndex: number, name: string) => {
    setTeams(
      teams?.map((team, index) => {
        if (index === teamIndex) {
          return {
            ...team,
            participants: [...team.participants, { name }],
          };
        }
        return team;
      })
    );
  };

  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");

    if (savedTeams !== "undefined" && savedTeams !== null) {
      setTeams(JSON.parse(savedTeams));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (teams?.length > 0) {
      localStorage.setItem("teams", JSON.stringify(teams));
    }

    if (isDeleting) {
      localStorage.setItem("teams", JSON.stringify(teams));
      setIsDeleting(false);
    }
  }, [teams]);

  return (
    <section className={style.main}>
      <div className={style.titleAndBtn}>
        <h2>Teams</h2>
        <Button
          onClick={() => {
            setOpenNewTeamModal(true);
          }}
        >
          <FaPlus /> NOVO TEAM
        </Button>
      </div>

      <div className={style.grid}>
        {loading ? (
          <span className={style.loader}>
            <span></span>
          </span>
        ) : (
          <>
            {teams.length > 0 ? (
              teamsFiltred?.map((team, index) => {
                return (
                  <GroupCard
                    key={`${team.name}-${index}`}
                    index={index}
                    team={team}
                    removeTeam={removeTeam}
                    addParticipant={addParticipant}
                  />
                );
              })
            ) : (
              <div className={style.emptyResult}>
                <span>Clique em &quot;+ Novo Team&quot; para começar</span>
                <Image src={startSvg} alt="nenhum team encontrado" />
              </div>
            )}
            {teams.length > 0 && teamsFiltred.length === 0 && (
              <div className={style.emptyResult}>
                <span>Nenhum Team encontrado</span>
                <Image src={emptySvg} alt="nenhum team encontrado" />
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        open={openNewTeamModal}
        onCancel={() => setOpenNewTeamModal(false)}
      >
        <div className={style.modalAddTeam}>
          <div className={style.headerModal}>
            <h3>Criar</h3>
            <button type="button" onClick={() => setOpenNewTeamModal(false)}>
              <FaXmark />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.name}>
              <label>Nome do Time</label>
              <input type="text" {...register("name", { required: true })} />
              {errors.name && <span>Campo Obrigatório</span>}
            </Input>
            <Input error={errors.size}>
              <label>CAPACIDADE DO GRUPO</label>
              <input type="number" {...register("size", { required: true })} />
              {errors.size && <span>Campo Obrigatório</span>}
            </Input>

            <Button className={style.createBtn} type={"submit"}>
              Criar
            </Button>
          </form>
        </div>
      </Modal>
    </section>
  );
}
