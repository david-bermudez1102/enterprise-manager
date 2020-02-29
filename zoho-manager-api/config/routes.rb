Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :options
      resources :organizations do
        resources :forms do
          resources :fields
          resources :record_fields
          resources :records
          resources :values
        end
      end
      resources :accounts
      resources :employees
      resources :managers
      resources :admins
      resources :sessions, only: [:create]
      get "/current_user", to: "sessions#show"
      delete "/delete_session", to: "sessions#destroy"
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
