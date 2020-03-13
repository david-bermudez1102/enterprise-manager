Rails.application.routes.draw do
  resources :connections
  resources :integrations
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
      namespace :zoho_books do
        resources :items
        resources :contacts
        resources :invoices
        resources :zoho_token
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
