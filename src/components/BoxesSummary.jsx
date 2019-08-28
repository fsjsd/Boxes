import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BoxesSummaryStyled = styled.div`
  position: fixed;
  bottom: 0px;
  padding: 50px;
  font-size: 1.3rem;
`;

export default function BoxesSummary() {
  const boxGroups = useSelector(state => [
    ...state.boxes.present
      .reduce((map, box) => {
        const { boxColor: key } = box;
        const prev = map.get(key);

        if (prev) {
          prev.count++;
        } else {
          map.set(key, { count: 1, boxColor: box.boxColor });
        }

        return map;
      }, new Map())
      .values()
  ]);

  const boxesSummary = boxGroups
    .map(
      (group, i) =>
        `${group.count} ${group.boxColor} box${group.count > 1 ? "es" : ""}${
          i < boxGroups.length - 1
            ? i === boxGroups.length - 2
              ? " and "
              : ", "
            : ""
        }`
    )
    .sort((a, b) => a.count > b.count)
    .join("");

  return (
    <BoxesSummaryStyled>
      There {boxGroups.length > 0 && boxGroups[0].count === 1 ? "is " : "are "}
      {boxGroups.length === 0 ? <>no boxes</> : <>{boxesSummary}</>}
    </BoxesSummaryStyled>
  );
}
