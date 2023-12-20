import{render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import UserForm from './UserForm'

test('user form shows two inputs and a button', () => {
    // render the component
    render(<UserForm />);


    //manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button =screen.getByRole('button');


    //Assertion- is our component doing what we expect it to do (eg. successfully calls the callback )
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();

});
test('it calls onUserAdd when the form is submitted', () => {
    //not the best implementation
    //the below three lines is an example of a mock function as it records 
    const argList = [];
    const callback = (...args) => {
        argList.push(args);
    }
    //step1- try to render my component
    render(<UserForm onUserAdd={callback} />)
    
    //step 2- find the 2 inputs
    const [nameInput, emailInput] = screen.getAllByRole('textbox')

    //step 3 - simulate typing in a name 
     user.click(nameInput);
     user.keyboard('jane');

    //step 4 - simulate in an email
    user.click(emailInput);
    user.keyboard('jane@jane.com');

    //step 5 - find button 
    const button = screen.getByRole('button');

    //step 6 - simulate clicking the button 
    user.click(button);

    //step 7 - Assertion to make sure 'onUserAdd' gets called with email/name
    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({name:'jane', email:'jane@jane.com'})


});