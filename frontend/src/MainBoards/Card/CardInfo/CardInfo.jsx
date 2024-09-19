import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import { colorsList } from "../../../Helper/Util";
import Modal from "../../Modal/Modal";
import CustomInput from "../../CustomInput/CustomInput";
import "./cardInfo.css";
import Chip from "../../Common/Chip";

function CardInfo(props) {
  const { onClose, card, boardId, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState({ ...card });

  const updateTitle = (value) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const addLabel = (label) => {
    const index = cardValues.labels.findIndex(
      (item) => item.text === label.text
    );
    if (index > -1) return;

    setSelectedColor("");
    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.text !== label.text
    );
    setCardValues({
      ...cardValues,
      labels: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks, task],
    });
  };

  const removeTask = (id) => {
    const tempTasks = cardValues.tasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    const tasks = [...cardValues.tasks];
    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({
      ...cardValues,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!cardValues.tasks?.length) return 0;
    const completed = cardValues.tasks.filter((item) => item.completed).length;
    return (completed / cardValues.tasks.length) * 100;
  };

  const updateDate = (date) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
  }, [cardValues, boardId, updateCard]);

  const calculatedPercent = calculatePercent();

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc}
            placeholder="Enter Description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo-box-colors">
            {colorsList.map((color, index) => (
              <div
                key={index}
                className="cardinfo-box-color"
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && <span>✔</span>}
              </div>
            ))}
          </div>
          <div className="cardinfo-box-labels">
            {cardValues.labels.map((label, index) => (
              <Chip
                key={index}
                item={label}
                onRemove={() => removeLabel(label)}
              />
            ))}
          </div>
          {selectedColor && (
            <button
              className="cardinfo-add-label"
              onClick={() =>
                addLabel({ text: `Label ${Date.now()}`, color: selectedColor })
              }
            >
              Add Label
            </button>
          )}
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            value={cardValues.date || ""}
            onChange={(e) => updateDate(e.target.value)}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <ul>
            {cardValues.tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => updateTask(task.id, e.target.checked)}
                />
                <span>{task.text}</span>
                <button onClick={() => removeTask(task.id)}>
                  <Trash />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => addTask(`Task ${Date.now()}`)}>
            Add Task
          </button>
        </div>

        <div className="cardinfo-progress">
          <div className="cardinfo-progress-bar">
            <div
              className="cardinfo-progress-bar-fill"
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor:
                  calculatedPercent === 100 ? "limegreen" : "lightblue",
              }}
            />
          </div>
          <p>{calculatedPercent.toFixed(0)}% Completed</p>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
