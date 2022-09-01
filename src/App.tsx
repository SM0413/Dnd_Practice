import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import { Board } from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 15%;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    console.log(info);
    if (destination.droppableId === source.droppableId) {
      // 같은 보드안에서 움직임
      setToDos((oldTodos) => {
        const boardCopy = [...oldTodos[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...oldTodos,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      //다른 보드로 옮김
      setToDos((oldTodos) => {
        const boardCopy = [...oldTodos[destination.droppableId]];
        const deleteBoard = [...oldTodos[source.droppableId]];
        deleteBoard.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...oldTodos,
          [destination.droppableId]: boardCopy,
          [source.droppableId]: deleteBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board toDos={toDos[boardId]} key={boardId} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
