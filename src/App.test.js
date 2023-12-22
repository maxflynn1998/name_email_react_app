import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import App from './App';

test('can recieve new user and show it on a list' , ()=> {
  render(<App />); 

  const nameInput= screen.getByRole('textbox', {
    name : /name/i ,// /i ensures that the upper or lower case is irrelevant
});
const emailInput = screen.getByRole('textbox', {
    name : /email/i // /i ensures that the upper or lower case is irrelevant
});


const button = screen.getByRole('button')
//user clicks on nameInput and writes in a name
user.click(nameInput)
user.keyboard('max')
//user clicks on emailInput and writes an email into that
user.click(emailInput)
user.keyboard('joel@max.com')

//user clicks submit button 
user.click(button)

// go into table and find correct
const name =screen.getByRole('cell', { name : 'max'});
const email =screen.getByRole('cell', { name : 'joel@max.com'});

expect(name).toBeInTheDocument();
expect(email).toBeInTheDocument();


});

