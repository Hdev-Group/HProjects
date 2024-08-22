import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div className='bg-neutral-700 '>
    <h1>Hello, {firstName}!</h1>
    <p>You have been invited by USERNAME to join PROJECT!</p>
  </div>
);