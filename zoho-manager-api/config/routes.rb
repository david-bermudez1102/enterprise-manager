Rails.application.routes.draw do
  resources :records
  resources :values
  resources :organizations do
    resources :forms do
      resources :fields
    end
  end
  resources :accounts
  resources :employees
  resources :managers
  resources :admins
  resources :sessions, only: [:create]
  get '/current_user', to: 'sessions#show'
  delete '/delete_session', to: 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
