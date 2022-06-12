import styled from "styled-components";
import MoviesRow from "../contents/MoviesRow.js";

const Similar = (props) => {
  const { category, id} = { ...props };
  return (
    (
      <SimilarRow>
        <MoviesRow category={category} similar={'Similar'} id = {id} />
      </SimilarRow>
    )
  );
};
export default Similar;
const SimilarRow = styled.div``;
