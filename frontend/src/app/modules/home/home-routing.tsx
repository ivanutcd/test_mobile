import { Route, Routes } from 'react-router-dom';


const HomeRouting = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Hola</>} />
      </Routes>
    </>
  );
};

export default HomeRouting;
