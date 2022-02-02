const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateMeetup from '../components/CreateMeetup';
import FrontCard from '../components/FrontCard';

describe('renders edit meetup button for the newly created event', () => {
  it('renders without crashing', () => {
    render(<CreateMeetup />);
    render(<FrontCard searchText="" />);
  });

  // it('Edit button is displayed after clicking the postevent button', () => {
  //   render(<CreateMeetup />);
  //   const postButton = screen.getByTestId('post-button');
  //   const inputTitle = screen.getByPlaceholderText('Name for your event');
  //   userEvent.type(inputTitle as HTMLElement,'Jogging');
  //   const inputDetails = screen.getByPlaceholderText('Describe your event');
  //   userEvent.type(inputDetails as HTMLElement,'Jogging in the neighbourhood')
  //   const inputDate = screen.getByPlaceholderText('Event date and time')
  //   userEvent.type(inputDate as HTMLElement, 'feb 25 @ 9 am CET')
  //   const inputLocation = screen.getByPlaceholderText('Event location')
  //   userEvent.type(inputLocation as HTMLElement,'Gothenburg')
  //   userEvent.click(postButton);
  //   render (<FrontCard searchText=''/>)
  //   const editButton = screen.getAllByTestId('edit-button')
  //   expect(editButton).toBeDefined()

  // });
});
