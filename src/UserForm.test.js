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
    const mock = jest.fn()
    //step1- try to render my component
    render(<UserForm onUserAdd={mock} />)
    
    //step 2- find the 2 inputs
    const nameInput = screen.getByRole('textbox', {
        name : /name/i ,// /i ensures that the upper or lower case is irrelevant
    });
    const emailInput = screen.getByRole('textbox', {
        name : /email/i // /i ensures that the upper or lower case is irrelevant
    });

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
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name:'jane',email:'jane@jane.com'});


});
test('empties the two inputs when form is submitted', () => {
    render(<UserForm onUserAdd={() => {}}/>);

    const nameInput = screen.getByRole('textbox',{name: /name/i});
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    const button = screen.getByRole('button');

    user.click(nameInput);
    user.keyboard('samuel');
    user.click(emailInput);
    user.keyboard('joel@maximus.com');

    user.click(button);

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')

});