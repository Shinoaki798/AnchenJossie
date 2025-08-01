export async function onRequestPost(context) {
  try {
    const { request } = context;
    const { name, email, company, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let emailBody = `You have a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\n`;
    if (company) {
      emailBody += `Company: ${company}\n`;
    }
    emailBody += `Message:\n${message}`;

    const emailData = {
      personalizations: [
        {
          to: [{ email: "info@anchenjossie.com", name: "Anchen Jossie Info" }],
        },
      ],
      from: {
        email: "no-reply@anchenjossie.com",
        name: "Anchen Jossie Contact Form",
      },
      reply_to: { email: email, name: name },
      subject: `New Contact Form Submission from ${name}`,
      content: [
        {
          type: "text/plain",
          value: emailBody,
        },
      ],
    };

    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.status >= 200 && response.status < 300) {
      return new Response(JSON.stringify({ message: "Message sent successfully!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Log the error and return the specific error message from MailChannels
      const errorData = await response.json();
      console.error("MailChannels error:", errorData);
      return new Response(JSON.stringify({ error: `MailChannels Error: ${JSON.stringify(errorData.errors)}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
