// using SendGrid's C# Library
// https://github.com/sendgrid/sendgrid-csharp
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Text.RegularExpressions;
using CoreUIStarter.Services;

namespace CoreUIStarter.Services
{
    public class EmailSender: IEmailSender
    {
        private string _sendGridApiKey;

        public EmailSender (IOptions<ExternalServicesKeys> settings)
        {
            _sendGridApiKey = settings.Value.SendGridApiKey;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            SendGridClient sgClient = new SendGridClient(_sendGridApiKey);
            SendGridMessage sgMsg = MailHelper.CreateSingleEmail(
                new EmailAddress("admin@coreuistarterapp.com"),
                new EmailAddress(email),
                subject,
                message,
                message
            );      
            Response sgResponse = await sgClient.SendEmailAsync(sgMsg);
            Regex OkStatusCodeRegex = new Regex(@"2[0-9][0-9]");
            if (!OkStatusCodeRegex.IsMatch(((int)sgResponse.StatusCode).ToString()))
            {
                throw new Exception(String.Format("Sendgrid {0}", sgResponse.ToString()));
            }
        }
    }
}
