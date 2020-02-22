Rails.application.routes.draw do
  root 'welcome#index'
  
  resources :user_trackers
  resources :intel_companies
  resources :companies
  resources :suggestedintels
  resources :intels
  resources :contacts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  resources :users, only: [:create, :show, :index]
  # Routes for authentification
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  
  get '/meta', to: 'meta#about'
  get '/keywords', to: 'suggestedintels#keywords'

end
