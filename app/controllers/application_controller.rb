class ApplicationController < ActionController::Base
  before_action :set_projects

  private

  def set_projects
    @projects = [
      { name: "Bandcamp Redesign", path: bandcamp_project_path },
      { name: "British Fencing", path: british_fencing_project_path },
      { name: "Plan & Go", path: plan_and_go_project_path },
      { name: "KnowIt", path: knowit_project_path }
    ]
  end
end
