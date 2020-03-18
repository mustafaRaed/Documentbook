import styled from 'styled-components';

const Form = styled.div`
  width: 100%;
  max-width: 330px;
  min-width: 100px;
  margin: auto;
  padding: 20px;
  border: 1px solid #dddcdc;
  background-color: WHITE;
`;

const RegisterForm = styled.div`
  width: 100%;
  margin: auto;
`;

const EditForm = styled.div`
  width: 100%;
  margin: auto;
`;

const ResetForm = styled.div`
  width: 40%;
  min-width: 300px;
  padding 30px;
  margin: auto;
  border: 1px solid #dddcdc;
`;

const Label = styled.div`
  color: #afaeae;
  `;

const Input = styled.input`
    padding: 1rem;
    border: 1px solid #999;
    margin-bottom: 1rem;
    font-size: 0.8rem;
`;

const Error = styled.div`
    background-color: red;
`;

const Styles = styled.div`
.navbar {
    background-color: white;
    margin-right: 10px;
}

.navbar-brand, .navbar-nav .nav-link {
    color: #222;
    
    &:hover {
        color: #454545;
    }
    
}
`;

const Div1 = styled.div`
    width: 50%;
    max-width: 550px;
    padding-left: 3rem;
`;
const Div2 = styled.div`
    width: 50%;
    max-width: 250px;
`;
const Div3 = styled.div`
    width: 50%;
    max-width: 250px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 700px;
  margin: auto;
`;

const Buttons = styled.div`
  width: 100%;
`



export { Form, RegisterForm, EditForm, ResetForm, Label, Input, Error, Styles, Div1, Div2, Div3, Wrapper, Buttons };