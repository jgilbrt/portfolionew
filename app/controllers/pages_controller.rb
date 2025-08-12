class PagesController < ApplicationController
  def home
  end

  def about
  end

  def projects
  end

  def bandcamp
    @project = { name: "Bandcamp Redesign" }
    render 'pages/projects/bandcamp'
  end

  def british_fencing
    @project = { name: "British Fencing" }
    render 'pages/projects/british_fencing'
  end

  def plan_and_go
    @project = { name: "Plan & Go" }
    render 'pages/projects/plan_and_go'
  end

  def knowit
    @project = { name: "KnowIt" }
    render 'pages/projects/knowit'
  end

  def contact
  end
end
