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
            SendGridMessage sgMsg = new SendGridMessage() {
                
                Subject = subject,
                From = new EmailAddress("Admin", "admin@coreuistarterapp.com"),
                PlainTextContent = message,
            };
            sgMsg.AddTo(email);            
            await sgClient.SendEmailAsync(sgMsg);
        }
    }
}
