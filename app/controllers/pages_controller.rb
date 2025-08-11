class PagesController < ApplicationController
  # Skip the navbar project-loading logic for our API action
  skip_before_action :set_projects, only: [:summarize]

  def home
  end

  def about
  end

  def projects
  end

  def bandcamp
    render 'pages/projects/bandcamp'
  end

  def british_fencing
    render 'pages/projects/british_fencing'
  end

  def plan_and_go
    render 'pages/projects/plan_and_go'
  end

  def knowit
    render 'pages/projects/knowit'
  end

  def contact
  end

  # Add this new action for the AI summarizer
  def summarize
    text_to_summarize = params[:text]

    # Return an error if no text is provided
    if text_to_summarize.blank?
      render json: { error: 'No text provided for summarization.' }, status: :bad_request
      return
    end

    begin
      client = OpenAI::Client.new(access_token: Rails.application.credentials.openai[:api_key])

      prompt = "You are a helpful assistant for a UX portfolio. Summarize the following case study. Focus on the key problems, methods, and outcomes. The summary should be concise, professional, and no more than two short paragraphs."

      response = client.chat(
        parameters: {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: text_to_summarize }
          ],
          temperature: 0.5,
        }
      )

      summary = response.dig("choices", 0, "message", "content")
      render json: { summary: summary }

    rescue => e
      # Basic error handling
      render json: { error: "Failed to generate summary: #{e.message}" }, status: :internal_server_error
    end
  end
end
