"use client";

import { FaEye, FaTrash, FaXmark } from "react-icons/fa6";
import style from "./style.module.scss";
import Button from "../Button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../Modal";
import Input from "../Input";
interface TeamProps {
  name: string;
  visible: boolean;
  size: number;
  participants: ParticipantProps[];
}

interface ParticipantProps {
  name: string;
}

interface FormInputsProps {
  name: string;
}

interface GroupCardProps {
  index: number;
  team: TeamProps;
  removeTeam: (index: number) => void;
  addParticipant: (teamIndex: number, name: string) => void;
}
export default function GroupCard({
  team,
  index,
  removeTeam,
  addParticipant,
}: GroupCardProps) {
  const [openAddParticipantModal, setOpenAddParticipantModal] = useState(false);
  const [openParticipantsModal, setOpenParticipantsModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputsProps>();

  const onSubmit: SubmitHandler<FormInputsProps> = (data) => {
    addParticipant(index, data.name);

    setOpenAddParticipantModal(false);
    reset();
  };

  return (
    <div className={style.card}>
      <div className={style.headerCard}>
        <span>{team.name}</span>
        <button type="button" onClick={() => setOpenParticipantsModal(true)}>
          <FaEye />
        </button>
      </div>
      <button
        type="button"
        className={style.participantsCount}
        onClick={() => setOpenParticipantsModal(true)}
      >
        <span className={style.currentParticipants}>
          {team.participants.length}
        </span>
        <span className={style.allParticipants}>/ {team.size}</span>
      </button>
      <div className={style.bottomBtns}>
        <Button
          type="button"
          className={style.addBtn}
          onClick={() => setOpenAddParticipantModal(true)}
        >
          ADICIONAR
        </Button>
        <Button onClick={() => setOpenRemoveModal(true)}>
          <FaTrash />
        </Button>
      </div>

      <Modal
        open={openAddParticipantModal}
        onCancel={() => setOpenAddParticipantModal(false)}
      >
        <div className={style.modal}>
          <div className={style.headerModal}>
            <h3>Adicionar participantes</h3>
            <button
              type="button"
              onClick={() => setOpenAddParticipantModal(false)}
            >
              <FaXmark />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.name}>
              <label>NOME DO PARTICIPANTE</label>
              <input type="text" {...register("name", { required: true })} />
              {errors.name && <span>Campo Obrigatório</span>}
            </Input>

            <Button className={style.createBtn} type={"submit"}>
              Adicionar
            </Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openParticipantsModal}
        onCancel={() => setOpenParticipantsModal(false)}
      >
        <div className={style.modal}>
          <div className={style.headerModal}>
            <h3>Team {team.name}</h3>
            <button
              type="button"
              onClick={() => setOpenParticipantsModal(false)}
            >
              <FaXmark />
            </button>
          </div>
          <ul>
            {team.participants.map((participant) => (
              <li key={participant.name}>{participant.name}</li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal open={openRemoveModal} onCancel={() => setOpenRemoveModal(false)}>
        <div className={style.modal}>
          <div className={style.headerModal}>
            <h3>Deseja realmente excluir: &quot;{team.name}&quot;?</h3>
            <button type="button" onClick={() => setOpenRemoveModal(false)}>
              <FaXmark />
            </button>
          </div>
          <span>Essa ação não pode ser desfeita</span>
          <Button onClick={() => removeTeam(index)}>Remover</Button>
        </div>
      </Modal>
    </div>
  );
}
