import {render, screen, within} from '@testing-library/react'
import UserList from './UserList'

function renderComponent() {
    const users = [
        { name : 'max' , email :'max@max.com'},
        { name : 'sam' , email :'sam@sam.com'}
     
     ];
      render(<UserList users={users}/>);
      return{
        users,
      }
}


test('render one row per user', () => {
//render the component 
renderComponent();

//find all the rows in the table
//eslint-disable-next-line
const rows = within(screen.getByTestId('users')).getAllByRole('row');



//Assertion:correct number of rows in the table
expect(rows).toHaveLength(2)
});


test('render the email and name of each user', () => {
  const{users} = renderComponent();
      for (let user of users) {
        const name =screen.getByRole('cell', { name : user.name})
        const email =screen.getByRole('cell', { name : user.email})

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
      }

});