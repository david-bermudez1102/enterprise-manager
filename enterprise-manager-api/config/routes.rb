Rails.application.routes.draw do
  resources :minimized_conversations
  resources :integration_records
  resources :integrations
  scope 'api/v1' do
    resources :conversations
    resources :open_conversations
    resources :activations
    resources :account_unlock, only: :update
    resources :options
    resources :stories
    resources :organizations do
      resources :page_permissions
      resources :fields, only: %i[index]
      resources :record_fields, only: %i[index]
      resources :roots
      resources :accounts
      resources :roles
      resources :forms do
        patch :sort
        resources :statistics
        resources :fields, except: %i[index]
        resources :record_fields, except: %i[index]
        resources :records
        resources :values
        resources :key_values
        resources :connections
        namespace :zoho_books do
          match 'items/update_all', to: "items#update_all", via: [:post]
          match 'items/sync', to: "items#sync", via: [:post]

          resources :items
          match 'contacts/update_all', to: "contacts#update_all", via: [:post]
          match 'contacts/sync', to: "contacts#sync", via: [:post]

          resources :contacts

          match 'invoices/update_all', to: "invoices#update_all", via: [:post]
          match 'invoices/sync', to: "invoices#sync", via: [:post]
          resources :invoices
        end
      end
      namespace :zoho_books do
        resources :zoho_token
      end
    end
    
    resources :sessions, only: %i[create]
    get '/current_user', to: 'sessions#show'
    delete '/delete_session', to: 'sessions#destroy'
  end

  mount ActionCable.server => '/cable'
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
