import React from "react";

import { render, cleanup, prettyDom, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form Component", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  xit("renders without crashing", () => {
    render(<Form interviewers={interviewers} />);
  });

  xit("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  xit("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Sylvia Palmer" />
    );
    expect(getByTestId("student")).toHaveValue("Sylvia Palmer");
  });
  
  xit("validates that the student name is not blank", () => {
   
    //1 create the mock save
    const onSave = jest.fn();
    //2 Render the form
    const { getByText } = render(
      < Form interviewers={interviewers} onSave={onSave} />
    )
    //3 'Click' save button
    fireEvent.click(getByText("Save"));

    expect(getByText(/Please enter a name./i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  xit("validates that the interviewer cannot be null", () => {
    
    const onSave = jest.fn();
    const { getByText } = render(
      < Form student="Bob" interviewers={interviewers} interviewer={null} onSave={onSave} />
    )
    fireEvent.click(getByText("Save"));
    expect(getByText(/Please select an interviewer./i)).toBeInTheDocument();
  
    
    expect(onSave).not.toHaveBeenCalled();
  });
  
  // it("calls onSave function when the name is defined", () => {
  //   const onSave = jest.fn();
  //   const { queryByText, getByText } = render(
  //     < Form student="Lydia Miller-Jones" interviewers={interviewers} interviewer={1} onSave={onSave} />
  //   )
  //   fireEvent.click(getByText("Save"));
  //   expect(queryByText(/Please enter a name./i)).toBeNull();
  //   expect(queryByText(/Please select an interviewer./i)).toBeNull();
  
  //   /* 6. onSave is called once*/
  //   expect(onSave).toHaveBeenCalledTimes(1);
  
  //   /* 7. onSave is called with the correct arguments */
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  // });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} interviewer={1} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/Please enter a name./i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));

    expect(queryByText(/Please enter a name./i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  // it("submits the name entered by the user", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} />
  //   );
  
  //   const input = getByPlaceholderText("Enter Student Name");
  
  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByText("Save"));
  
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});