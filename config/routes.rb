Rails.application.routes.draw do
  devise_for :users
  resources :veterinarians
  resources :lizards
  resources :home


  root  'lizards#index'

end
