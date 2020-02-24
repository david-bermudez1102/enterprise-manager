Rails.application.routes.draw do
  resources :organizations
  resources :accounts
  resources :employees
  resources :managers
  resources :admins
  resources :sessions, only: [:create,:destroy]
  get '/current_user', to: 'sessions#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
