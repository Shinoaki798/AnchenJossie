export async function onRequestPost(context) {
  try {
    // Hardcoded minimal test case. This ignores all input from the form.
    const name = "Test";
    const email = "test@example.com";
    const company = "Test Inc.";
    const message = "This is a test message to see if the API works at all.";

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
      // Try to get more specific error from MailChannels response
      let errorBody = "Could not read error response body.";
      try {
        const errorData = await response.json();
        errorBody = `MailChannels API Error: ${JSON.stringify(errorData.errors || errorData)}`;
      } catch (e) {
        try {
          errorBody = `API Error: ${await response.text()}`;
        } catch (e2) {
          // Ignore e2, keep the original message
        }
      }
      console.error(errorBody);
      return new Response(JSON.stringify({ error: errorBody }), {
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
