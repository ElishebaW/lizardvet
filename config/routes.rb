Rails.application.routes.draw do
  devise_for :users
  resources :veterinarians
  resources :lizards
  resources :home
  resources :charts
  resources :clients


  root  'lizards#index'




end
