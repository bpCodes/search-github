import React, { Component } from "react";
import styled from 'styled-components'
import {Formik, Field} from 'formik';
 
import { connect } from "react-redux";

class App extends Component {
  render() {
    const { fetching, data, onRequestData, error } = this.props;
    console.log('data',data)
    return (
      <Container className="App">
        <Header className="App-header">
          <h1 className="App-title">Search Github</h1>
          <Formik
            initialValues={{ name: "", url: "" }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("values", values);
              onRequestData(values);
              setSubmitting(false);
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset
              } = props;
              return (
                <Form onSubmit={handleSubmit}>
                  <Input
                    id="name"
                    placeholder="Enter your username"
                    type="search"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name ? "error" : ""
                    }
                  />
                  <Select
                    id="url"
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" label="Select an option">
                      Select
                    </option>
                    <option value="users" label="Users">
                      Users
                    </option>
                    <option
                      value="repositories"
                      label="Repositories"
                    >
                      Repositories
                    </option>
                  </Select>

                  {errors.name && errors.touched && (
                    <div className="input-feedback">
                      {errors.name}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    btnColor="#66f494"
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    className="outline"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                    btnColor="#f05d4d"
                  >
                    Reset
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Header>

        {!data ? (
          <div></div>
        ) : data[0].login ? (
          <List className="App-intro">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <Image src={item.avatar_url} />
                <Item>{item.login}</Item>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <List className="App-intro">
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <Description>{item.full_name}</Description>
                <Item>{item.description}</Item>
              </React.Fragment>
            ))}
          </List>
        )}        
      </Container>
    );
  }
}

const Header = styled.header`
  margin: 0 auto;
  margin-top: 10%

`;
const Container = styled.main`
  width: 80%;
  margin: 0 auto;
  display:flex;
  flex-direction: column;

`;
const Form = styled.form`
  color: #707070;
  flex: 1;
`;
const Button = styled.button`
  background-color: ${props => props.btnColor};
  padding: 1em 3vw;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.25);
  color: #0b0b0b;
  transition: 0.6s all ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const Input = styled.input`
  color: black;
  padding: 1em 10vw;
  border: none;
  box-shadow: 1px 5px 15px 0px rgba(0,0,0,0.5);
  border-right: 1px solid gray;
`;
const Select = styled.select`
  color: #707070;
  padding: 1em;
  border: none;
  box-shadow: 1px 5px 15px 0px rgba(0, 0, 0, 0.5);
  margin: 0 5vw;
`;
const List = styled.ul`
  list-style: none;
  width: 50%;
  margin: 0 auto;
  margin-top: 10%;
  box-shadow: 0 5px 5px 0 rgba(0,0,0,0.5)
`;
const Item = styled.li`
  padding: 1em;
  border: none;
  display: inline-block;
  width: 60%;
  margin-left: 2em;
`;
const Description = styled.p`
  color: #707070;
  
`;
const Image = styled.img`
  border-radius: 50%;
  display: inline-block;
  width: 20%;
  vertical-align: middle;
  margin: 2em 0;
`;

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    data: state.data,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestData: (name) => dispatch({ type: "API_CALL_REQUEST" , name})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
