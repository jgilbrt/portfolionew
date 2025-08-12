Rails.application.routes.draw do
  root 'pages#home'

  get 'home', to: 'pages#home'
  get 'about', to: 'pages#about'
  get 'projects', to: 'pages#projects'
  get 'contact', to: 'pages#contact'

  get 'projects/bandcamp', to: 'pages#bandcamp', as: :bandcamp_project
  get 'projects/british-fencing', to: 'pages#british_fencing', as: :british_fencing_project
  get 'projects/plan-and-go', to: 'pages#plan_and_go', as: :plan_and_go_project
  get 'projects/knowit', to: 'pages#knowit', as: :knowit_project

  get 'up' => 'rails/health#show', as: :rails_health_check
end
