import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured. Email will be logged to console.');

      // Log the contact form submission
      console.log('===== NEW CONTACT FORM SUBMISSION =====');
      console.log('From:', data.name, `<${data.email}>`);
      console.log('Phone:', data.phone || 'Not provided');
      console.log('Subject:', data.subject);
      console.log('Message:', data.message);
      console.log('Timestamp:', new Date().toISOString());
      console.log('=======================================');

      return NextResponse.json({
        success: true,
        message: 'Message received (logged to console - configure RESEND_API_KEY for email delivery)'
      });
    }

    // Send email using Resend
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>', // This will be the sender
          to: ['dwilson@sno911.org'],
          subject: `Portfolio Contact: ${data.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #00D4FF; border-bottom: 2px solid #00D4FF; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>

              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>From:</strong> ${data.name}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
                <p style="margin: 10px 0;"><strong>Subject:</strong> ${data.subject}</p>
              </div>

              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #333;">Message:</h3>
                <p style="white-space: pre-wrap; color: #555; line-height: 1.6;">${data.message}</p>
              </div>

              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px; font-size: 12px; color: #666;">
                <p style="margin: 5px 0;">Submitted: ${new Date().toLocaleString()}</p>
                <p style="margin: 5px 0;">Via: Portfolio Contact Form</p>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API error:', errorData);
        throw new Error(errorData.message || 'Failed to send email');
      }

      const result = await response.json();
      console.log('Email sent successfully via Resend:', result.id);

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!'
      });

    } catch (emailError) {
      console.error('Error sending email:', emailError);

      // Log to console as fallback
      console.log('===== NEW CONTACT FORM SUBMISSION (Email Send Failed) =====');
      console.log('From:', data.name, `<${data.email}>`);
      console.log('Phone:', data.phone || 'Not provided');
      console.log('Subject:', data.subject);
      console.log('Message:', data.message);
      console.log('Timestamp:', new Date().toISOString());
      console.log('===========================================================');

      return NextResponse.json(
        { error: 'Failed to send email notification. Please try contacting directly.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
