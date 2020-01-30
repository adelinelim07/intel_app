Rails.application.routes.draw do
  resources :suggestedintels
  resources :intels
  resources :contacts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  # Routes for authentification
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  resources :users, only: [:create, :show, :index]

  get '/meta', to: 'meta#about'

end
