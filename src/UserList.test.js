import {render, screen, within} from '@testing-library/react'
import UserList from './UserList'

test('render one row per user', () => {
//render the component 
const users = [
   { name : 'max' , email :'max@max.com'},
   { name : 'sam' , email :'sam@sam.com'}

]
render(<UserList users={users} />)
//find all the rows in the table
const rows = within(screen.getByTestId('users')).getAllByRole('row');


//Assertion:correct number of rows in the table
expect(rows).toHaveLength(2)
});


test('render the email and name of each user', () => {

})