Rails.application.routes.draw do
  scope 'api/v1' do
    resources :options
    resources :organizations do
      resources :forms do
        resources :fields
        resources :record_fields
        resources :records
        resources :values
        resources :key_values
      end
    end
    resources :accounts
    resources :admins do
      resources :employees
      resources :managers
    end
    resources :sessions, only: %i[create]
    get '/current_user', to: 'sessions#show'
    delete '/delete_session', to: 'sessions#destroy'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
