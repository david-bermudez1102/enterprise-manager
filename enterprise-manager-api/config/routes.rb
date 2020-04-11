Rails.application.routes.draw do
  resources :integration_records
  resources :integrations
  scope 'api/v1' do
    resources :activations
    resources :account_unlock, only: :update
    resources :options
    resources :organizations do
      resources :forms do
        resources :fields
        resources :record_fields
        resources :records
        resources :values
        resources :key_values
        resources :connections
        namespace :zoho_books do
          resources :items
          match 'contacts/update_all', to: "contacts#update_all", via: [:post]
          resources :contacts
          resources :invoices
        end
      end
      namespace :zoho_books do
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
