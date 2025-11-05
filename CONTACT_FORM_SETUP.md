# Contact Form Setup Guide

The portfolio now includes a fully functional contact form with email notifications!

## 📧 Features

- **Professional Contact Modal** - Opens when clicking "Contact" in navigation
- **Your Contact Information Displayed**:
  - Name: Derek Wilson
  - Phone: 425-407-3941
  - Email: DWilson@sno911.org
- **Form Submission** - Visitors can send messages via the form
- **Email Notifications** - You'll receive an email at dwilson@sno911.org when someone submits the form
- **Graceful Fallback** - Works even without email configured (logs to console)

## 🚀 Quick Start

The contact form **works immediately** without any setup! However, to receive email notifications, you'll need to configure Resend.

### Without Email Setup (Default)
- Contact button opens modal ✅
- Form validates and accepts submissions ✅
- Submissions are logged to server console ✅
- Users see success message ✅

### With Email Setup (Recommended)
All of the above, PLUS:
- Email notifications sent to dwilson@sno911.org ✅
- Professional HTML-formatted emails ✅
- Delivery tracking via Resend dashboard ✅

## 📝 Setting Up Email Notifications

### Step 1: Get a Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (includes 3,000 emails/month)
3. Verify your email address
4. Navigate to **API Keys** section
5. Click **Create API Key**
6. Copy your API key (starts with `re_`)

### Step 2: Add API Key to Vercel

If deploying to Vercel (recommended):

1. Go to your project in [Vercel Dashboard](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your API key from Step 1 (e.g., `re_abc123...`)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**
5. Redeploy your application

### Step 3: Domain Setup (Optional - For Production)

For production use, you should verify your domain with Resend:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain registrar
5. Wait for verification (usually 5-15 minutes)

Once verified, update the API endpoint to use your domain:

```typescript
// app/api/contact/route.ts
from: 'Portfolio Contact <noreply@yourdomain.com>', // Change this line
to: ['dwilson@sno911.org'],
```

### Step 4: Test the Form

1. Open your portfolio website
2. Click **Contact** in the navigation
3. Fill out the form with test data
4. Submit the form
5. Check dwilson@sno911.org for the email notification!

## 🧪 Local Development

To test email functionality locally:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Resend API key to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3001 and test the contact form

## 📧 Email Format

When someone submits the form, you'll receive an email with:

- **Subject**: Portfolio Contact: [Their Subject]
- **Content**:
  - Sender's name
  - Sender's email (clickable mailto: link)
  - Sender's phone (if provided, clickable tel: link)
  - Subject line
  - Full message
  - Timestamp of submission

## 🔍 Monitoring Submissions

### With Email Setup
- Check your email inbox at dwilson@sno911.org
- View delivery logs in Resend Dashboard

### Without Email Setup
- Check server logs (Vercel Dashboard → Functions → Logs)
- Submissions are logged with full details

## 🛠️ Troubleshooting

### Form submits but no email received?

1. **Check spam folder** - First-time emails might go to spam
2. **Verify API key** - Ensure RESEND_API_KEY is set in Vercel environment variables
3. **Check Resend dashboard** - View delivery status and error logs
4. **Check server logs** - Look for error messages in Vercel function logs

### Common Errors

**"Failed to send email"**
- API key is missing or invalid
- Check that RESEND_API_KEY is correctly set
- Verify your Resend account is active

**"Invalid email address"**
- User entered malformed email
- Form validation should prevent this

**"Missing required fields"**
- JavaScript validation failed
- Check browser console for errors

## 📊 API Details

### Endpoint
```
POST /api/contact
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-555-5555",
  "subject": "Question about your projects",
  "message": "Your message here..."
}
```

### Response
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

## 💰 Costs

**Resend Pricing:**
- Free tier: 3,000 emails/month
- More than enough for a portfolio contact form
- Paid plans available if needed

## 🔐 Security

- Form validation on client and server
- Email sanitization to prevent injection
- Rate limiting recommended for production (not implemented yet)
- No sensitive data stored (submissions not saved to database)

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Next.js Guide](https://resend.com/docs/send-with-nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

## 🎉 You're All Set!

The contact form is ready to use! Test it out and start receiving messages from visitors.

Need help? Check the troubleshooting section above or review server logs for detailed error messages.
