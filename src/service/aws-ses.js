const AWS = require('aws-sdk');
require('dotenv').config({ path: '.env' });


console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
AWS.config.update({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function sendpageEmail({ to, from, subject, message, pager, sentby, projectid, incidentid, title }) {
  console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
  console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);

  
  const ses = new AWS.SES({ apiVersion: 'latest' });
  const timestampUTC = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].split('-').reverse().join('/') + ' ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1] + ' (UTC)';
  const params = {
    Source: from,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: { Data: message },
        Html: { Data: `
          <table align="center" style="width:580px;max-width:580px;margin:0 auto;padding:0;margin-top:16px" width="580">
            <tbody>
              <tr>
                <td>
                  <table style="min-width:100%;max-width:100%;padding:0;border:1px solid #e1e6eb;border-radius:8px">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" style="margin-top:16px;text-align:left;width:500px;max-width:580px;padding:0;margin:0 auto 0" width="500">
                                  <tbody><tr>
                                      <td style="text-align:center">
                                          <div>
                                              <img style="width: 40px; height: 40px;border-radius: 50%;" src="${pager.imageUrl}">
                                              <p style="padding: 0px; margin: 0px; color: rgb(30, 37, 47); font-weight: 400; vertical-align: middle;">${pager.firstName} ${pager.lastName}, You have been paged.</p>
                                          </div>
                                      </td>
                                  </tr>
                              </tbody></table>

                          <table align="center" style="text-align:left;margin-top:16px;border-radius:10px;border:1px solid red;background-color: rgba(230, 22, 22, 0.466);width:500px;padding:32px" width="500">
                            <tbody>
                              <tr>
                                <td style="text-align:center">
                                  <p style="color: #fff;">Manual pager from James Blackhurst</p>
                                </td>
                              </tr>
                              <tr style="height:24px" height="24"></tr>
                              <tr>
                                <td style="text-align:center">
                                  <h2 style="margin-top:0.5em;margin-bottom:1.5em;font-weight:600;margin:0">Incident: ${title}</h2>
                                </td>
                              </tr>
                              <tr style="height:24px" height="24"></tr>
                            </tbody>
                          </table>

                          <table align="center" style="text-align:left;margin-top:16px;border-radius:16px;background:#e4e4e4;width:500px;padding:16px" width="500">
                            <tbody>
                              <tr>
                                <td style="padding-top:4px;padding-bottom:4px">
                                  <p style="padding:0;margin:0;font-weight:300;color:#6b798a">Paged at:</p>
                                </td>
                                <td>
                                  <p style="padding:0;margin:0;font-weight:300;text-align:right;color:#1e252f">${timestampUTC}</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <a href="https://hprojects.hdev.uk/projects/${projectid}/incident/${incidentid}">
                            <table align="center" style="text-align:left;width:500px;border-radius:16px;background:#1a1a1b;margin-top:24px;padding:16px 25px" width="500">
                              <tbody>
                                <tr>
                                  <td>
                                    <p style="padding:0;margin:0;text-align:center;color:white;font-weight:400;text-decoration: none;">View in HProjects</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </a>

                          <table align="center" style="margin-top:16px;text-align:left;width:500px;max-width:580px;padding:0;margin:0 auto 0;padding-top:16px" width="500">
                            <tbody>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ` }
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    return result.MessageId;
  } catch (error) {
    console.error('Error sending email:', JSON.stringify(error, null, 2));
    throw error;
  }
}
