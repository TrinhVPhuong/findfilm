import styled from 'styled-components'
import Slider from "react-slick"

function HeaderSlide(props) {
    return (
        <SliderWarraper>
            <Slider>
                
            </Slider>
        </SliderWarraper>
    )
}
export default HeaderSlide

const SliderWarraper = styled.div`
    height: 200px;
    background-color: #bbb;
`;