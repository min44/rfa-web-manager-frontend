import React from "react";

export const Board = (props: any) => {
  const drop = (e: any) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);

    if (card) {
      card.style.display = "block";
      e.target.appendChild(card);
    }
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div id={props.id} className={props.className} onDrop={drop} onDragOver={dragOver}>
      {props.children}
    </div>
  );
};
